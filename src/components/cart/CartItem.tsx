import type { CartLine } from '../../types/cart';

interface CartItemProps {
  line: CartLine;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

export function CartItem({ line, onIncrement, onDecrement, onRemove }: CartItemProps) {
  return (
    <article className="grid grid-cols-[42%_1fr] overflow-hidden rounded-[20px] border border-[#eee5dc] bg-[#fffaf5]/90 shadow-[0_8px_22px_rgba(56,44,34,.035)]">
      <div className="min-h-[158px] bg-[#d9cbbc]">
        <img src={line.item.image} alt={line.item.nameKo} className="h-full w-full object-cover" />
      </div>
      <div className="relative flex min-w-0 flex-col px-4 py-4">
        <button
          type="button"
          aria-label={`${line.item.nameKo} 삭제`}
          onClick={onRemove}
          className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full text-[24px] font-light leading-none text-[#756c64] transition-colors hover:bg-[#f1e8df] hover:text-[#2f251f]"
        >
          ×
        </button>

        <div className="pr-8">
          <h3 className="truncate text-[16px] font-bold tracking-[-0.025em]">{line.item.nameKo}</h3>
          <p className="mt-0.5 truncate font-serifbrand text-[14px] text-[#72675f]">{line.item.nameEn}</p>
          <p className="mt-2 text-[12px] font-medium tracking-[-0.01em] text-[#756b63]">
            {line.dineType === 'TO_GO' ? 'To Go' : '매장 이용'} · {line.temperature} · {line.size}
          </p>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div className="flex items-center gap-2.5">
            <button type="button" onClick={onDecrement} className="grid h-9 w-9 place-items-center rounded-full bg-[#f1e9e1] text-[21px]">−</button>
            <span className="w-5 text-center font-serifbrand text-[18px]">{line.quantity}</span>
            <button type="button" onClick={onIncrement} className="grid h-9 w-9 place-items-center rounded-full bg-[#f1e9e1] text-[21px]">+</button>
          </div>
          <strong className="font-serifbrand text-[18px] font-normal">{(line.item.price * line.quantity).toLocaleString('ko-KR')}</strong>
        </div>
      </div>
    </article>
  );
}
