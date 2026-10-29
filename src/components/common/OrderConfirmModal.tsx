interface OrderConfirmModalProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function OrderConfirmModal({ open, onConfirm, onCancel }: OrderConfirmModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#17110d]/50 px-5 backdrop-blur-[1px] md:absolute">
      <section className="w-full max-w-[330px] rounded-[24px] bg-[#fffaf4] px-7 py-8 text-center shadow-[0_24px_70px_rgba(34,24,18,.28)]">
        <h2 className="text-[20px] font-semibold leading-[1.5] tracking-[-0.025em] text-[#201914]">
          해당 메뉴들을 주문할까요?
        </h2>
        <p className="mt-2 text-[15px] text-[#756a62]">주문 후 취소가 어려워요.</p>
        <div className="mt-6 flex justify-center gap-3">
          <button
            type="button"
            onClick={onConfirm}
            className="min-w-[112px] rounded-full bg-[#332820] px-5 py-3.5 text-[15px] font-medium text-white"
          >
            예
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="min-w-[112px] rounded-full border border-[#d9cec4] bg-[#fbf6ef] px-5 py-3.5 text-[15px] font-medium text-[#332820]"
          >
            아니오
          </button>
        </div>
      </section>
    </div>
  );
}
