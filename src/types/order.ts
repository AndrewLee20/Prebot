import type { CartLine } from './cart';

export type OrderStatus = 'RECEIVED' | 'PREPARING' | 'READY' | 'PICKUP';

export interface Order {
  id: string;
  orderNumber: number;
  status: OrderStatus;
  items: CartLine[];
  totalPrice: number;
  createdAt: string;
}
