import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { menuItems } from '../data/menu';
import type { MenuSelection } from '../types/menu';
import type { CartLine } from '../types/cart';

const CART_KEY = 'prebot_cart';

interface CartContextValue {
  items: CartLine[];
  totalPrice: number;
  totalQuantity: number;
  addItem: (selection: MenuSelection) => void;
  increment: (key: string) => void;
  decrement: (key: string) => void;
  remove: (key: string) => void;
  clear: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function makeKey(selection: MenuSelection) {
  return [selection.menuId, selection.dineType, selection.temperature, selection.size].join('::');
}

function readCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    return parsed
      .map((line) => {
        const item = menuItems.find((candidate) => candidate.id === line.menuId);
        return item ? { ...line, item } : null;
      })
      .filter((line): line is CartLine => Boolean(line));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>(() => readCart());

  useEffect(() => {
    if (items.length === 0) localStorage.removeItem(CART_KEY);
    else localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = (selection: MenuSelection) => {
    const item = menuItems.find((candidate) => candidate.id === selection.menuId);
    if (!item) return;
    const key = makeKey(selection);

    setItems((current) => {
      const existing = current.find((line) => line.key === key);
      if (existing) {
        return current.map((line) =>
          line.key === key ? { ...line, quantity: line.quantity + selection.quantity } : line,
        );
      }
      return [...current, { ...selection, key, item }];
    });
  };

  const increment = (key: string) =>
    setItems((current) => current.map((line) => (line.key === key ? { ...line, quantity: line.quantity + 1 } : line)));

  const decrement = (key: string) =>
    setItems((current) => current.map((line) => (line.key === key ? { ...line, quantity: Math.max(1, line.quantity - 1) } : line)));

  const remove = (key: string) => setItems((current) => current.filter((line) => line.key !== key));
  const clear = () => setItems([]);

  const value = useMemo<CartContextValue>(() => ({
    items,
    totalPrice: items.reduce((sum, line) => sum + line.item.price * line.quantity, 0),
    totalQuantity: items.reduce((sum, line) => sum + line.quantity, 0),
    addItem,
    increment,
    decrement,
    remove,
    clear,
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error('useCart must be used inside CartProvider');
  return value;
}
