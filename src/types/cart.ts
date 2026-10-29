import type { MenuItem, MenuSelection } from './menu';

export interface CartLine extends MenuSelection {
  key: string;
  item: MenuItem;
}
