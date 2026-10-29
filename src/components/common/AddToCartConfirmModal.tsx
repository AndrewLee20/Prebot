interface AddToCartConfirmModalProps {
  open: boolean;
  onOrderNow: () => void;
  onKeepShopping: () => void;
}

export function AddToCartConfirmModal({ open, onOrderNow, onKeepShopping }: AddToCartConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-[#17110d]/48 px-5 backdrop-blur-[1px] md:absolute">
      <section className="w-full max-w-[330px] rounded-[24px] bg-[#fffaf4] px-7 py-8 text-center shadow-[0_24px_70px_rgba(34,24,18,.26)]">
        <h2 className="text-[19px] font-semibold leading-[1.55] tracking-[-0.025em] text-[#201914]">
          메뉴가 장바구니에 담겼습니다.
          <br />
          바로 주문할까요?
        </h2>
        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={onOrderNow}
            className="min-w-[112px] rounded-full bg-[#332820] px-5 py-3.5 text-[15px] font-medium text-white"
          >
            바로 주문
          </button>
          <button
            type="button"
            onClick={onKeepShopping}
            className="min-w-[122px] rounded-full border border-[#d9cec4] bg-[#fbf6ef] px-5 py-3.5 text-[15px] font-medium text-[#332820]"
          >
            메뉴 더 담기
          </button>
        </div>
      </section>
    </div>
  );
}
