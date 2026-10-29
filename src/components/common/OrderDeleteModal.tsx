interface OrderDeleteModalProps {
  open: boolean;
  canDelete: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export function OrderDeleteModal({ open, canDelete, onConfirm, onClose }: OrderDeleteModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[#17110d]/50 px-5 backdrop-blur-[1px] md:absolute">
      <section className="w-full max-w-[330px] rounded-[24px] bg-[#fffaf4] px-7 py-8 text-center shadow-[0_24px_70px_rgba(34,24,18,.28)]">
        {canDelete ? (
          <>
            <h2 className="text-[20px] font-semibold leading-[1.5] tracking-[-0.025em] text-[#201914]">
              주문 내역을 삭제할까요?
            </h2>
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
                onClick={onClose}
                className="min-w-[112px] rounded-full border border-[#d9cec4] bg-[#fbf6ef] px-5 py-3.5 text-[15px] font-medium text-[#332820]"
              >
                아니오
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-[18px] font-semibold leading-[1.6] tracking-[-0.025em] text-[#201914]">
              픽업을 완료한 후에만<br />주문 내역을 삭제할 수 있어요.
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 min-w-[132px] rounded-full bg-[#332820] px-6 py-3.5 text-[15px] font-medium text-white"
            >
              알겠습니다
            </button>
          </>
        )}
      </section>
    </div>
  );
}
