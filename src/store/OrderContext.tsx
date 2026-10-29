import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { CartLine } from '../types/cart';
import type { Order } from '../types/order';
import { createOrderPayload, printOrderJson, validateOrderItems } from '../services/orderService';

const CURRENT_ORDER_KEY = 'prebot_current_order';
const ORDER_HISTORY_KEY = 'prebot_order_history';
const ORDER_NUMBER_KEY = 'prebot_order_number';
const ORDER_NUMBER_DATE_KEY = 'prebot_order_number_date';
const SESSION_ID_KEY = 'prebot_session_id';
const FINAL_RESET_KEY = 'prebot_final_order_reset_v1';

interface OrderContextValue {
  currentOrder: Order | null;
  orderHistory: Order[];
  placeOrder: (items: CartLine[], totalPrice: number) => Order;
  setCurrentOrder: (order: Order | null) => void;
  deleteOrder: (orderId: string) => void;
}

const OrderContext = createContext<OrderContextValue | null>(null);

function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function clearOrderStorageForToday() {
  localStorage.removeItem(CURRENT_ORDER_KEY);
  localStorage.removeItem(ORDER_HISTORY_KEY);
  localStorage.setItem(ORDER_NUMBER_DATE_KEY, localDateKey());
  localStorage.setItem(ORDER_NUMBER_KEY, '0');
}

/**
 * Final-version migration:
 * - Stage 7까지 남아 있던 테스트 주문목록 / 주문번호를 최초 1회 초기화한다.
 * - 같은 최종 버전에서 새로고침할 때마다 다시 지우지는 않는다.
 */
function applyFinalVersionResetOnce() {
  if (localStorage.getItem(FINAL_RESET_KEY) === 'done') return;
  clearOrderStorageForToday();
  localStorage.setItem(FINAL_RESET_KEY, 'done');
}

/**
 * 로컬 날짜가 바뀌었으면 그 날의 주문번호와 주문목록을 초기화한다.
 * 브라우저를 자정에 켜 두지 않았더라도 다음 접속/주문 시 반드시 적용된다.
 */
function resetDailyOrdersIfDateChanged() {
  const today = localDateKey();
  const storedDate = localStorage.getItem(ORDER_NUMBER_DATE_KEY);
  if (storedDate === today) return false;
  clearOrderStorageForToday();
  return true;
}

function readOrderHistory(): Order[] {
  try {
    applyFinalVersionResetOnce();
    resetDailyOrdersIfDateChanged();

    const raw = localStorage.getItem(ORDER_HISTORY_KEY);
    if (raw) return JSON.parse(raw) as Order[];

    const currentRaw = localStorage.getItem(CURRENT_ORDER_KEY);
    if (currentRaw) {
      const current = JSON.parse(currentRaw) as Order;
      localStorage.setItem(ORDER_HISTORY_KEY, JSON.stringify([current]));
      return [current];
    }
  } catch {
    return [];
  }
  return [];
}

function ensureSessionId() {
  let id = localStorage.getItem(SESSION_ID_KEY);
  if (!id) {
    id = typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `prebot-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    localStorage.setItem(SESSION_ID_KEY, id);
  }
  return id;
}

function nextOrderNumber() {
  // 날짜가 바뀐 상태에서 탭이 오래 열려 있었던 경우까지 방어한다.
  resetDailyOrdersIfDateChanged();
  const current = Number(localStorage.getItem(ORDER_NUMBER_KEY) ?? '0');
  const next = Number.isFinite(current) ? current + 1 : 1;
  localStorage.setItem(ORDER_NUMBER_KEY, String(next));
  return next;
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orderHistory, setOrderHistory] = useState<Order[]>(() => readOrderHistory());
  const currentOrder = orderHistory[0] ?? null;

  useEffect(() => {
    // 앱 시작 시 한 번 더 날짜 경계를 확인한다.
    if (resetDailyOrdersIfDateChanged()) {
      setOrderHistory([]);
    }

    const scheduleMidnightReset = () => {
      const now = new Date();
      const nextMidnight = new Date(now);
      nextMidnight.setHours(24, 0, 0, 0);
      const delay = Math.max(1000, nextMidnight.getTime() - now.getTime());

      return window.setTimeout(() => {
        clearOrderStorageForToday();
        setOrderHistory([]);
        midnightTimer = scheduleMidnightReset();
      }, delay);
    };

    let midnightTimer = scheduleMidnightReset();
    return () => window.clearTimeout(midnightTimer);
  }, []);

  const persistHistory = (orders: Order[]) => {
    setOrderHistory(orders);
    localStorage.setItem(ORDER_HISTORY_KEY, JSON.stringify(orders));
    if (orders[0]) localStorage.setItem(CURRENT_ORDER_KEY, JSON.stringify(orders[0]));
    else localStorage.removeItem(CURRENT_ORDER_KEY);
  };

  const setCurrentOrder = (order: Order | null) => {
    if (!order) {
      persistHistory([]);
      return;
    }
    const rest = orderHistory.filter((item) => item.id !== order.id);
    persistHistory([order, ...rest]);
  };

  const deleteOrder = (orderId: string) => {
    persistHistory(orderHistory.filter((order) => order.id !== orderId));
  };

  const placeOrder = (items: CartLine[], totalPrice: number) => {
    validateOrderItems(items);
    ensureSessionId();

    // 자정을 넘긴 상태에서 첫 주문을 하는 경우, 화면 state까지 같은 시점에 초기화한다.
    const dayChanged = resetDailyOrdersIfDateChanged();
    const previousOrders = dayChanged ? [] : orderHistory;
    if (dayChanged) setOrderHistory([]);

    const order: Order = {
      id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `order-${Date.now()}`,
      orderNumber: nextOrderNumber(),
      // 모든 새 주문의 기본 상태는 반드시 '주문 접수'.
      status: 'RECEIVED',
      items: items.map((item) => ({ ...item })),
      totalPrice,
      createdAt: new Date().toISOString(),
    };

    const payload = createOrderPayload(order);
    persistHistory([order, ...previousOrders]);
    printOrderJson(payload);
    return order;
  };

  const value = useMemo<OrderContextValue>(() => ({
    currentOrder,
    orderHistory,
    placeOrder,
    setCurrentOrder,
    deleteOrder,
  }), [orderHistory]);

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrder() {
  const value = useContext(OrderContext);
  if (!value) throw new Error('useOrder must be used inside OrderProvider');
  return value;
}
