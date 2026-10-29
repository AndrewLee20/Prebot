interface CartDineTypeAlertModalProps {
  open: boolean;
  onClose: () => void;
}

export function CartDineTypeAlertModal({ open, onClose }: CartDineTypeAlertModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#17110d]/50 px-5 backdrop-blur-[1px] md:absolute">
      <section className="w-full max-w-[330px] rounded-[24px] bg-[#fffaf4] px-7 py-8 text-center shadow-[0_24px_70px_rgba(34,24,18,.28)]">
        <h2 className="text-[19px] font-semibold leading-[1.55] tracking-[-0.025em] text-[#201914]">
          매장 이용 / To Go 중<br />하나만 선택해주세요.
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 min-w-[132px] rounded-full bg-[#332820] px-6 py-3.5 text-[15px] font-medium text-white"
        >
          알겠습니다
        </button>
      </section>
    </div>
  );
}
