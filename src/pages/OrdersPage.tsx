import { useState } from 'react';
import { AppShell } from '../components/layout/AppShell';
import { BottomNavigation } from '../components/layout/BottomNavigation';
import { PageHeader } from '../components/layout/PageHeader';
import { OrderProgress } from '../components/order/OrderProgress';
import { OrderDeleteModal } from '../components/common/OrderDeleteModal';
import { useOrder } from '../store/OrderContext';
import type { Order } from '../types/order';

export function OrdersPage() {
  const { orderHistory, deleteOrder } = useOrder();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const closeDeleteModal = () => setSelectedOrder(null);
  const confirmDelete = () => {
    if (!selectedOrder || selectedOrder.status !== 'PICKUP') return;
    deleteOrder(selectedOrder.id);
    closeDeleteModal();
  };

  return (
    <AppShell>
      <div className="prebot-scroll-area bg-prebot-paper">
        <PageHeader />
        <div className="px-5 pb-8">
          {orderHistory.length === 0 ? (
            <div className="mt-3 grid min-h-[520px] place-items-center text-center">
              {/* 두 줄인 보조 문구의 높이 차이를 보정해 장바구니 안내 제목과 정렬한다. */}
              <div className="translate-y-3.5">
                <p className="font-serifbrand text-[24px] text-[#2f251f]">아직 주문내역이 없어요.</p>
                <p className="mt-2 text-sm leading-6 text-[#81766d]">메뉴를 주문하면 이곳에<br />주문 기록이 쌓여요.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4 pt-1">
              {orderHistory.map((order) => {
                const dineType = order.items[0]?.dineType;
                return (
                  <section
                    key={order.id}
                    className="rounded-[24px] border border-[#e8ddd3] bg-[#f3e9df] px-4 py-4 shadow-[0_10px_26px_rgba(58,45,35,.045)]"
                  >
                    <div className="mb-3 flex justify-start">
                      <span className="inline-flex items-center justify-center rounded-full bg-[#332820] px-4 py-2 text-[12px] font-medium text-white">
                        {dineType === 'TO_GO' ? 'To Go' : '매장 이용'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-[12px] text-[#8a817a]">주문번호</span>
                        <strong className="font-serifbrand text-[23px] font-normal">{order.orderNumber}</strong>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="mr-1 text-[11px] text-[#998f87]">
                          {new Date(order.createdAt).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <button
                          type="button"
                          aria-label={`주문번호 ${order.orderNumber} 삭제`}
                          onClick={() => setSelectedOrder(order)}
                          className="grid h-8 w-8 place-items-center rounded-full text-[22px] font-light leading-none text-[#756c64] transition-colors hover:bg-[#e7dbd0] hover:text-[#2f251f]"
                        >
                          ×
                        </button>
                      </div>
                    </div>

                    <div className="mt-4 border-t border-[#ddd0c5] pt-4">
                      <OrderProgress status={order.status} />
                    </div>

                    <div className="mt-4 border-t border-[#ddd0c5]">
                      {order.items.map((line) => (
                        <div
                          key={line.key}
                          className="grid grid-cols-[58px_1fr_auto_auto] items-center gap-3 border-b border-[#ddd0c5] py-3.5 last:border-b-0"
                        >
                          <img src={line.item.image} alt="" className="h-[54px] w-[54px] rounded-[9px] object-cover" />
                          <div className="min-w-0">
                            <p className="truncate text-[15px] font-semibold tracking-[-0.02em]">{line.item.nameKo}</p>
                            <p className="mt-0.5 text-[12px] text-[#81766e]">{line.temperature} · {line.size}</p>
                          </div>
                          <span className="text-[13px] text-[#665e57]">{line.quantity}개</span>
                          <strong className="min-w-[55px] text-right font-serifbrand text-[15px] font-normal">
                            {(line.item.price * line.quantity).toLocaleString('ko-KR')}
                          </strong>
                        </div>
                      ))}
                    </div>

                    <div className="mt-1 flex items-center justify-between border-t border-[#ddd0c5] pt-4">
                      <span className="text-[16px] font-semibold">총 주문금액</span>
                      <strong className="font-serifbrand text-[21px] font-normal">{order.totalPrice.toLocaleString('ko-KR')}</strong>
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <BottomNavigation />
      <OrderDeleteModal
        open={Boolean(selectedOrder)}
        canDelete={selectedOrder?.status === 'PICKUP'}
        onConfirm={confirmDelete}
        onClose={closeDeleteModal}
      />
    </AppShell>
  );
}
