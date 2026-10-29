import type { CartLine } from '../types/cart';
import type { MenuCategory, MenuSize } from '../types/menu';

export type SupplyType = 'cup' | 'lid' | 'straw' | 'wet_tissue' | 'fork';

export interface Supply {
  item: SupplyType;
  size?: MenuSize;
  quantity: number;
}

interface SupplyRule {
  item: SupplyType;
  useMenuSize?: boolean;
  quantityPerItem: number;
}

const drinkRules: readonly SupplyRule[] = [
  { item: 'cup', useMenuSize: true, quantityPerItem: 1 },
  { item: 'lid', useMenuSize: true, quantityPerItem: 1 },
  { item: 'straw', quantityPerItem: 1 },
  { item: 'wet_tissue', quantityPerItem: 1 },
];

/** 현재 합의한 규칙: 온도 및 매장/포장 여부에 관계없이 적용한다. */
export const supplyRules: Record<MenuCategory, readonly SupplyRule[]> = {
  coffee: drinkRules,
  ade: drinkRules,
  tea: drinkRules,
  food: [
    { item: 'fork', quantityPerItem: 1 },
    { item: 'wet_tissue', quantityPerItem: 1 },
  ],
};

/** 검증된 주문 항목에서 물품을 계산한다. 주문/저장소/번호는 변경하지 않는다. */
export function calculateSupplies(items: CartLine[]): Supply[] {
  const totals = new Map<string, Supply>();
  for (const line of items) {
    const rules = supplyRules[line.item.category];
    if (!rules) throw new Error('물품 규칙이 없는 메뉴 카테고리입니다.');
    for (const rule of rules) {
      const size = rule.useMenuSize ? line.size : undefined;
      const key = `${rule.item}:${size ?? ''}`;
      const quantity = (totals.get(key)?.quantity ?? 0) + rule.quantityPerItem * line.quantity;
      if (!Number.isSafeInteger(quantity) || quantity < 1) {
        throw new Error('물품 수량은 1 이상의 안전한 정수여야 합니다.');
      }
      totals.set(key, { item: rule.item, ...(size ? { size } : {}), quantity });
    }
  }
  return [...totals.values()];
}
