import type { ReactNode } from 'react';

interface OptionPillProps {
  selected: boolean;
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

export function OptionPill({ selected, children, onClick, disabled = false }: OptionPillProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`min-h-[48px] rounded-full border px-4 text-[15px] transition-all disabled:cursor-not-allowed disabled:opacity-35 ${
        selected
          ? 'border-[#30251f] bg-[#30251f] font-medium text-white shadow-[0_6px_15px_rgba(45,35,29,.12)]'
          : 'border-[#d9d0c8] bg-[#f8f4ee]/70 font-medium text-[#4d453f]'
      }`}
    >
      {children}
    </button>
  );
}
