import { createBrowserRouter } from 'react-router-dom';
import { CartPage } from '../pages/CartPage';
import { HomePage } from '../pages/HomePage';
import { MenuPage } from '../pages/MenuPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { OrdersPage } from '../pages/OrdersPage';

export const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/menu', element: <MenuPage /> },
  { path: '/orders', element: <OrdersPage /> },
  { path: '/cart', element: <CartPage /> },
  { path: '*', element: <NotFoundPage /> },
]);
