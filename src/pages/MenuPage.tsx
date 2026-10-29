import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppShell } from '../components/layout/AppShell';
import { BottomNavigation } from '../components/layout/BottomNavigation';
import { PageHeader } from '../components/layout/PageHeader';
import { CategoryTabs } from '../components/menu/CategoryTabs';
import { MenuGrid } from '../components/menu/MenuGrid';
import { MenuOptionModal } from '../components/menu/MenuOptionModal';
import { AddToCartConfirmModal } from '../components/common/AddToCartConfirmModal';
import { menuItems } from '../data/menu';
import { useCart } from '../store/CartContext';
import type { MenuCategory, MenuItem, MenuSelection } from '../types/menu';

export function MenuPage() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('coffee');
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);
  const [showAddedModal, setShowAddedModal] = useState(false);

  const visibleItems = useMemo(
    () => menuItems.filter((item) => item.category === activeCategory),
    [activeCategory],
  );

  const handleOptionSubmit = (selection: MenuSelection) => {
    addItem(selection);
    setSelectedMenu(null);
    setShowAddedModal(true);
  };

  return (
    <AppShell>
      <div className="prebot-scroll-area bg-prebot-paper">
        <PageHeader />
        <div className="px-5 pb-6">
          <CategoryTabs activeCategory={activeCategory} onChange={setActiveCategory} />
          <div className="pt-4">
            <MenuGrid items={visibleItems} onSelect={setSelectedMenu} />
          </div>
        </div>
      </div>

      <BottomNavigation />

      <MenuOptionModal item={selectedMenu} onClose={() => setSelectedMenu(null)} onSubmit={handleOptionSubmit} />
      <AddToCartConfirmModal
        open={showAddedModal}
        onOrderNow={() => navigate('/cart')}
        onKeepShopping={() => setShowAddedModal(false)}
      />
    </AppShell>
  );
}
