import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ModalProps {
  open: boolean;
  children: ReactNode;
  layerClassName: string;
  backdropClassName?: string;
  shadowClassName?: string;
}

export function Modal({
  open,
  children,
  layerClassName,
  backdropClassName = 'bg-[#17110d]/50',
  shadowClassName = 'shadow-[0_24px_70px_rgba(34,24,18,.28)]',
}: ModalProps) {
  if (!open) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center px-5 backdrop-blur-[1px] md:absolute ${layerClassName} ${backdropClassName}`}>
      <section className={`w-full max-w-[330px] rounded-[24px] bg-[#fffaf4] px-7 py-8 text-center ${shadowClassName}`}>
        {children}
      </section>
    </div>
  );
}

interface ModalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  secondary?: boolean;
}

export function ModalButton({
  secondary = false,
  className = 'min-w-[112px] px-5',
  ...props
}: ModalButtonProps) {
  const colors = secondary
    ? 'border border-[#d9cec4] bg-[#fbf6ef] text-[#332820]'
    : 'bg-[#332820] text-white';

  return (
    <button
      type="button"
      className={`rounded-full py-3.5 text-[15px] font-medium ${colors} ${className}`}
      {...props}
    />
  );
}
