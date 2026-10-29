import { categoryLabels, categoryOrder } from '../../data/menu';
import type { MenuCategory } from '../../types/menu';

interface CategoryTabsProps {
  activeCategory: MenuCategory;
  onChange: (category: MenuCategory) => void;
}

export function CategoryTabs({ activeCategory, onChange }: CategoryTabsProps) {
  return (
    <div className="sticky top-0 z-20 -mx-5 bg-prebot-paper/95 px-5 pt-1 backdrop-blur-md">
      <div className="grid grid-cols-4 border-b border-black/[0.035]">
        {categoryOrder.map((category) => {
          const active = activeCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => onChange(category)}
              className={`relative pb-3 pt-2 text-[17px] transition-colors ${
                active ? 'font-bold text-[#211b17]' : 'font-medium text-[#665d55]'
              }`}
            >
              {categoryLabels[category]}
              {active && (
                <span className="absolute inset-x-[22%] bottom-0 h-[2px] rounded-full bg-[#2d241e]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
