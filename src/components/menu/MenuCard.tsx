import type { MenuItem } from '../../types/menu';

interface MenuCardProps {
  item: MenuItem;
  onClick: (item: MenuItem) => void;
}

export function MenuCard({ item, onClick }: MenuCardProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(item)}
      className="group block min-w-0 text-left"
      aria-label={`${item.nameKo} 옵션 선택`}
    >
      <div className="aspect-[4/5] overflow-hidden rounded-[18px] bg-[#ddd0c2] shadow-[0_1px_0_rgba(255,255,255,.45)]">
        <img
          src={item.image}
          alt={item.nameKo}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.015]"
        />
      </div>
      <div className="px-1 pb-2 pt-2.5">
        <p className="truncate text-[16px] font-bold leading-[1.25] tracking-[-0.02em] text-[#201a16]">
          {item.nameKo}
        </p>
        <p className="mt-0.5 truncate font-serifbrand text-[14px] leading-[1.25] text-[#746a61]">
          {item.nameEn}
        </p>
        <p className="mt-1 text-[16px] font-semibold leading-none text-[#201a16]">
          {item.price.toLocaleString('ko-KR')}
        </p>
      </div>
    </button>
  );
}
