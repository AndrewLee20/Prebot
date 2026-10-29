import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-prebot-brown text-white border border-prebot-brown hover:bg-[#261d17] active:scale-[0.99]',
  secondary:
    'bg-prebot-paper/95 text-prebot-ink border border-prebot-line hover:bg-white active:scale-[0.99]',
  ghost: 'bg-transparent text-prebot-ink hover:bg-black/5 active:bg-black/10',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'min-h-10 px-5 text-sm',
  md: 'min-h-12 px-7 text-[15px]',
  lg: 'min-h-14 px-9 text-base',
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-3 rounded-prebot-pill transition ${variantClasses[variant]} ${sizeClasses[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
