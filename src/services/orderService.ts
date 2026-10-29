import type { CartLine } from '../types/cart';
import type { MenuSize, Temperature } from '../types/menu';
import type { Order } from '../types/order';
import { calculateSupplies, type Supply } from './supplyRules';

/** POST /api/orders에 사용할 주문 본문. 현재는 전송하지 않는다. */
export interface OrderPayload {
  orderId: number;
  orderDate: string;
  orderTime: string;
  orderType: 'for_here' | 'takeout';
  supplies: Supply[];
  items: {
    menu: string;
    temperature: Temperature;
    size: MenuSize;
    quantity: number;
  }[];
}

/** 주문번호 발급 및 저장 전에 검사한다. */
export function validateOrderItems(items: CartLine[]): void {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('주문할 메뉴가 없습니다.');
  }
  const dineType = items[0]?.dineType;
  if (dineType !== 'FOR_HERE' && dineType !== 'TO_GO') {
    throw new Error('유효하지 않은 주문 방식입니다.');
  }
  for (const line of items) {
    if (!line || line.dineType !== dineType) {
      throw new Error('매장 이용과 To Go는 함께 주문할 수 없습니다.');
    }
    if (typeof line.item?.nameEn !== 'string' || !line.item.nameEn.trim()) {
      throw new Error('메뉴 영어 이름이 필요합니다.');
    }
    if (!['ICE', 'HOT'].includes(line.temperature)
      || !['S', 'M', 'L'].includes(line.size)
      || !line.item.temperatures.includes(line.temperature)
      || !line.item.sizes.includes(line.size)) {
      throw new Error('유효하지 않은 메뉴 옵션입니다.');
    }
    if (!Number.isSafeInteger(line.quantity) || line.quantity < 1) {
      throw new Error('주문 수량은 1 이상의 정수여야 합니다.');
    }
  }
}

/** 확정된 주문의 번호와 생성 시각을 재사용하며 저장소를 변경하지 않는다. */
export function createOrderPayload(order: Order): OrderPayload {
  validateOrderItems(order.items);
  if (!Number.isSafeInteger(order.orderNumber) || order.orderNumber < 1) {
    throw new Error('유효하지 않은 주문번호입니다.');
  }
  const date = new Date(order.createdAt);
  if (Number.isNaN(date.getTime())) throw new Error('유효하지 않은 주문 시각입니다.');
  const pad = (value: number) => String(value).padStart(2, '0');

  return {
    orderId: order.orderNumber,
    orderDate: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
    orderTime: `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`,
    orderType: order.items[0].dineType === 'TO_GO' ? 'takeout' : 'for_here',
    supplies: calculateSupplies(order.items),
    items: order.items.map((line) => ({
      menu: line.item.nameEn,
      temperature: line.temperature,
      size: line.size,
      quantity: line.quantity,
    })),
  };
}

export function printOrderJson(payload: OrderPayload): void {
  console.log(`========== PREBOT ORDER JSON ==========\n\n${JSON.stringify(payload, null, 2)}\n\n=======================================`);
}
