interface IconProps {
  active?: boolean;
}

const stroke = (active?: boolean) => (active ? 2.15 : 1.75);

export function HomeIcon({ active }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={stroke(active)} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 10.8 12 3l9 7.8" />
      <path d="M5.5 9.5V21h13V9.5" />
      {!active && <path d="M9.5 21v-6h5v6" />}
    </svg>
  );
}

export function MenuIcon({ active }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={stroke(active)} strokeLinecap="round" aria-hidden="true">
      {[6, 12, 18].map((y) => (
        <g key={y}>
          <circle cx="4" cy={y} r="1" fill="currentColor" stroke="none" />
          <path d={`M8 ${y}h12`} />
        </g>
      ))}
    </svg>
  );
}

export function OrdersIcon({ active }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={stroke(active)} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 3.5h7l4 4V21H7z" />
      <path d="M14 3.5V8h4" />
      {!active && <><path d="M10 12h5" /><path d="M10 16h5" /></>}
    </svg>
  );
}

export function CartIcon({ active }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={stroke(active)} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 1.9-1.4L21 8H7" />
      <circle cx="10" cy="20" r="1.2" fill="currentColor" />
      <circle cx="18" cy="20" r="1.2" fill="currentColor" />
    </svg>
  );
}
