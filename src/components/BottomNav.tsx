import React from 'react';
import { Home, LayoutGrid, Package, UserCog } from 'lucide-react';

export type TabType = 'inicio' | 'catalogo' | 'pedidos' | 'admin';

interface BottomNavProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  ordersBadgeCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onTabChange,
  ordersBadgeCount = 0
}) => {
  const tabs = [
    { id: 'inicio' as const, label: 'Inicio', icon: Home },
    { id: 'catalogo' as const, label: 'Catálogo', icon: LayoutGrid },
    { id: 'pedidos' as const, label: 'Mis Pedidos', icon: Package, badge: ordersBadgeCount },
    { id: 'admin' as const, label: 'Admin', icon: UserCog }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E5E5E5] px-2 py-1.5 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="max-w-md mx-auto grid grid-cols-4 items-center">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center py-1 transition-colors relative cursor-pointer select-none ${
                isActive ? 'text-[#C4272B]' : 'text-[#737373] hover:text-[#1A1C1C]'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                {tab.badge && tab.badge > 0 ? (
                  <span className="absolute -top-1 -right-2 bg-[#C4272B] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {tab.badge}
                  </span>
                ) : null}
              </div>
              <span className={`text-[10px] sm:text-[11px] font-semibold mt-0.5 ${isActive ? 'font-bold' : ''}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
