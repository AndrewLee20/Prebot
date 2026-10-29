import { NavLink } from 'react-router-dom';
import { CartIcon, HomeIcon, MenuIcon, OrdersIcon } from './icons';

const navItems = [
  { to: '/', label: '홈', icon: HomeIcon, end: true },
  { to: '/menu', label: '메뉴', icon: MenuIcon },
  { to: '/cart', label: '장바구니', icon: CartIcon },
  { to: '/orders', label: '주문내역', icon: OrdersIcon },
];

export function BottomNavigation() {
  return (
    <nav
      className="absolute inset-x-0 bottom-0 z-40 border-t border-black/[0.045] bg-[#fbf8f2]/95 px-3 pt-2 backdrop-blur-xl"
      style={{ paddingBottom: 'max(10px, env(safe-area-inset-bottom))' }}
      aria-label="주요 메뉴"
    >
      <ul className="grid h-[78px] grid-cols-4">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <li
            key={to}
            className="relative before:absolute before:left-0 before:top-1/2 before:h-10 before:-translate-y-1/2 before:border-l before:border-[#d6d3d1] before:content-[''] first:before:hidden"
          >
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex h-full flex-col items-center justify-center gap-1 text-[11px] transition-colors ${
                  isActive ? 'font-semibold text-black' : 'font-medium text-[#756d65]'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon active={isActive} />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
