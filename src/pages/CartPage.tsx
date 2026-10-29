import { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { PageContent } from '../components/layout/PageContent';
import { CartItem } from '../components/cart/CartItem';
import { OrderConfirmModal } from '../components/common/OrderConfirmModal';
import { CartDineTypeAlertModal } from '../components/common/CartDineTypeAlertModal';
import { useCart } from '../store/CartContext';
import { useOrder } from '../store/OrderContext';

export function CartPage() {
  const navigate = useNavigate();
  const { items, totalPrice, increment, decrement, remove, clear } = useCart();
  const { placeOrder } = useOrder();
  const [showConfirm, setShowConfirm] = useState(false);
  const [showDineTypeAlert, setShowDineTypeAlert] = useState(false);
  const orderSubmitted = useRef(false);

  const dineTypes = useMemo(() => Array.from(new Set(items.map((item) => item.dineType))), [items]);

  const requestOrder = () => {
    if (items.length === 0) return;
    if (dineTypes.length > 1) {
      setShowDineTypeAlert(true);
      return;
    }
    orderSubmitted.current = false;
    setShowConfirm(true);
  };

  const confirmOrder = () => {
    if (!showConfirm || orderSubmitted.current || items.length === 0 || dineTypes.length !== 1) return;
    // React의 다음 렌더 전에 들어오는 연속 클릭도 즉시 차단한다.
    orderSubmitted.current = true;
    try {
      placeOrder(items, totalPrice);
    } catch (error) {
      orderSubmitted.current = false;
      console.error('[Prebot] 주문 실패', error);
      return;
    }
    clear();
    setShowConfirm(false);
    navigate('/orders');
  };

  return (
    <AppShell>
      <PageContent className="px-5 pb-7 pt-3">
        {items.length === 0 ? (
          <div className="grid min-h-[520px] place-items-center text-center">
            <div>
              <p className="font-serifbrand text-[24px] text-[#2f251f]">장바구니가 비어 있어요.</p>
              <p className="mt-2 text-sm text-[#81766d]">메뉴에서 원하는 음료를 담아주세요.</p>
            </div>
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {items.map((line) => (
                <CartItem
                  key={line.key}
                  line={line}
                  onIncrement={() => increment(line.key)}
                  onDecrement={() => decrement(line.key)}
                  onRemove={() => remove(line.key)}
                />
              ))}
            </div>

            <div className="mt-5 border-t border-[#ddd3ca] pt-5">
              <div className="flex items-center justify-between">
                <span className="text-[19px] font-semibold tracking-[-0.025em]">총 주문금액</span>
                <strong className="font-serifbrand text-[28px] font-normal">{totalPrice.toLocaleString('ko-KR')}</strong>
              </div>
              <button
                type="button"
                onClick={requestOrder}
                className="mt-5 flex min-h-[58px] w-full items-center justify-center gap-4 rounded-full bg-[#30251f] px-6 text-[18px] font-medium text-white shadow-[0_10px_24px_rgba(45,35,29,.14)]"
              >
                주문하기 <span className="text-[23px] font-light">→</span>
              </button>
            </div>
          </>
        )}
      </PageContent>
      <OrderConfirmModal
        open={showConfirm}
        onConfirm={confirmOrder}
        onCancel={() => setShowConfirm(false)}
      />
      <CartDineTypeAlertModal open={showDineTypeAlert} onClose={() => setShowDineTypeAlert(false)} />
    </AppShell>
  );
}
