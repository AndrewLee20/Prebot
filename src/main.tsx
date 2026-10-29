import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { CartProvider } from './store/CartContext';
import { OrderProvider } from './store/OrderContext';
import './styles/globals.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <OrderProvider>
        <RouterProvider router={router} />
      </OrderProvider>
    </CartProvider>
  </StrictMode>,
);
