import React from 'react';
import { ShoppingCart, Search, MapPin, Phone, X } from 'lucide-react';
import { ProesaHeaderLogo } from './Logos';
import { COMPANY_INFO } from '../data/catalog';

interface HeaderProps {
  cartCount: number;
  logoPrincipal: string;
  onOpenCart: () => void;
  onNavigateHome: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  logoPrincipal,
  onOpenCart,
  onNavigateHome,
  searchQuery,
  onSearchChange
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#E5E5E5] px-3 sm:px-4 py-2.5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="max-w-4xl mx-auto flex flex-col gap-2.5">
        {/* Top brand row */}
        <div className="flex items-center justify-between gap-2">
          {/* Logo Principal (Imagen cuadrada de producto cambiable desde el admin) */}
          <div 
            onClick={onNavigateHome} 
            className="cursor-pointer transition-opacity hover:opacity-90 flex items-center gap-2"
            title="Ir a Inicio"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg border border-[#CCCCCC] bg-white p-0.5 shadow-2xs overflow-hidden shrink-0 flex items-center justify-center">
              <img
                src={logoPrincipal}
                alt="Logo Principal"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = '/1.png';
                }}
              />
            </div>
            <div className="flex flex-col justify-center leading-none">
              <span className="font-display font-black tracking-tight text-[#C4272B] text-base sm:text-lg uppercase leading-none">
                PROESA
              </span>
              <span className="font-body font-bold text-[#C4272B] text-[10px] sm:text-[11px] tracking-wide leading-tight">
                Distribuidora
              </span>
            </div>
          </div>

          {/* Contact & Address info (matches image 4 & 7) */}
          <div className="flex flex-col text-[11px] sm:text-xs text-[#444444] leading-tight">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#C4272B] shrink-0" />
              <span className="truncate">{COMPANY_INFO.address}</span>
            </div>
            <div className="flex items-center gap-1 font-medium text-[#1A1C1C]">
              <Phone className="w-3 h-3 text-[#C4272B] shrink-0" />
              <a 
                href={`tel:${COMPANY_INFO.primaryPhone}`} 
                className="hover:underline hover:text-[#C4272B] transition-colors"
              >
                cel. {COMPANY_INFO.phones.join(' - ')}
              </a>
            </div>
          </div>

          {/* Cart trigger button: botón rojo */}
          <button
            onClick={onOpenCart}
            aria-label="Abrir carrito de pedidos"
            className="relative p-2.5 rounded-xl bg-[#C4272B] hover:bg-[#A9171E] active:scale-95 transition-all text-white shadow-[2px_2px_0px_#000000] shrink-0 cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5 stroke-[2.2px]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-white text-[#C4272B] text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#C4272B] shadow-sm tnum">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Search bar */}
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#737373]">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar desinfectantes, detergentes, cepillos..."
            className="w-full pl-9 pr-8 py-2 text-sm bg-white border border-[#000000] rounded-lg text-[#1A1C1C] placeholder:text-[#737373] focus:outline-none focus:ring-1 focus:ring-[#C4272B] focus:border-[#C4272B] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-[#737373] hover:text-[#1A1C1C]"
              aria-label="Borrar búsqueda"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
