import { useEffect, useState } from 'react';
import type { MenuItem, MenuSelection, MenuSize, Temperature } from '../../types/menu';
import { OptionPill } from './OptionPill';

interface MenuOptionModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onSubmit?: (selection: MenuSelection) => void;
}

export function MenuOptionModal({ item, onClose, onSubmit }: MenuOptionModalProps) {
  const [dineType, setDineType] = useState<MenuSelection['dineType']>('FOR_HERE');
  const [temperature, setTemperature] = useState<Temperature>('ICE');
  const [size, setSize] = useState<MenuSize>('S');
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!item) return;
    setDineType('FOR_HERE');
    setTemperature(item.temperatures[0] ?? 'ICE');
    setSize(item.sizes[0] ?? 'S');
    setQuantity(1);
  }, [item]);

  if (!item) return null;

  const isDrink = item.category !== 'food';

  const submit = () => {
    const selection: MenuSelection = {
      menuId: item.id,
      dineType,
      temperature,
      size,
      quantity,
    };
    onSubmit?.(selection);
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#17110d]/45 px-4 py-6 backdrop-blur-[1px] md:absolute">
      <button type="button" className="absolute inset-0" onClick={onClose} aria-label="옵션 창 닫기" />

      <section
        role="dialog"
        aria-modal="true"
        aria-label={`${item.nameKo} 옵션 선택`}
        className="relative z-10 max-h-[calc(100dvh-32px)] w-full max-w-[392px] overflow-y-auto rounded-[28px] bg-[#fbf7f1] shadow-[0_24px_70px_rgba(34,24,18,.28)]"
      >
        <div className="relative aspect-[16/8.3] overflow-hidden rounded-t-[28px] bg-[#d8c7b6]">
          <img
            src={item.image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full scale-110 object-cover object-center blur-[10px] brightness-[0.95]"
          />
          <div className="absolute inset-0 bg-[#d7c4b0]/15" />
          <img
            src={item.image}
            alt={item.nameKo}
            className="relative z-[1] h-full w-full object-contain object-center"
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-[2] grid h-11 w-11 place-items-center rounded-full bg-[#f8f3ec]/95 text-[27px] font-light leading-none text-[#201914] shadow-sm"
            aria-label="닫기"
          >
            ×
          </button>
        </div>

        <div className="px-5 pb-6 pt-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h2 className="text-[22px] font-bold tracking-[-0.035em] text-[#1f1915]">{item.nameKo}</h2>
              <p className="mt-0.5 font-serifbrand text-[15px] text-[#756b63]">{item.nameEn}</p>
            </div>
            <p className="shrink-0 pt-1 font-serifbrand text-[23px] text-[#1f1915]">
              {item.price.toLocaleString('ko-KR')}
            </p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <OptionPill selected={dineType === 'FOR_HERE'} onClick={() => setDineType('FOR_HERE')}>
              매장 이용
            </OptionPill>
            <OptionPill selected={dineType === 'TO_GO'} onClick={() => setDineType('TO_GO')}>
              To Go
            </OptionPill>
          </div>

          {isDrink && (
            <>
              <div className="my-3.5 h-px bg-[#ddd4cb]" />
              <div className="grid grid-cols-2 gap-2.5">
                {(['ICE', 'HOT'] as Temperature[]).map((option) => (
                  <OptionPill
                    key={option}
                    selected={temperature === option}
                    onClick={() => setTemperature(option)}
                    disabled={!item.temperatures.includes(option)}
                  >
                    {option}
                  </OptionPill>
                ))}
              </div>
            </>
          )}

          {isDrink && (
            <div className="mt-4">
              <p className="mb-2 text-[16px] font-semibold tracking-[-0.02em]">사이즈</p>
              <div className="grid grid-cols-3 gap-2.5">
                {(['S', 'M', 'L'] as MenuSize[]).map((option) => (
                  <OptionPill
                    key={option}
                    selected={size === option}
                    onClick={() => setSize(option)}
                    disabled={!item.sizes.includes(option)}
                  >
                    {option}
                  </OptionPill>
                ))}
              </div>
            </div>
          )}

          <div className="mt-4 flex items-center gap-6">
            <p className="min-w-[46px] text-[16px] font-semibold tracking-[-0.02em]">수량</p>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                className="grid h-11 w-11 place-items-center rounded-full bg-[#f0e8df] text-[24px] font-light"
                aria-label="수량 감소"
              >
                −
              </button>
              <span className="w-5 text-center font-serifbrand text-[21px]">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((current) => current + 1)}
                className="grid h-11 w-11 place-items-center rounded-full bg-[#f0e8df] text-[24px] font-light"
                aria-label="수량 증가"
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={submit}
            className="mt-5 min-h-[58px] w-full rounded-full bg-[#30251f] px-6 text-[18px] font-medium text-white shadow-[0_10px_24px_rgba(45,35,29,.14)] transition-transform active:scale-[.99]"
          >
            장바구니 담기
          </button>
        </div>
      </section>
    </div>
  );
}
