export type MenuCategory = 'coffee' | 'ade' | 'tea' | 'food';
export type Temperature = 'ICE' | 'HOT';
export type MenuSize = 'S' | 'M' | 'L';

export interface MenuItem {
  id: string;
  category: MenuCategory;
  nameKo: string;
  nameEn: string;
  price: number;
  image: string;
  temperatures: Temperature[];
  sizes: MenuSize[];
}

export interface MenuSelection {
  menuId: string;
  dineType: 'FOR_HERE' | 'TO_GO';
  temperature: Temperature;
  size: MenuSize;
  quantity: number;
}
