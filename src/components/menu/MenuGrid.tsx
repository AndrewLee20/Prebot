import type { MenuItem } from '../../types/menu';
import { MenuCard } from './MenuCard';

interface MenuGridProps {
  items: MenuItem[];
  onSelect: (item: MenuItem) => void;
}

export function MenuGrid({ items, onSelect }: MenuGridProps) {
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-4">
      {items.map((item) => (
        <MenuCard key={item.id} item={item} onClick={onSelect} />
      ))}
    </div>
  );
}
