import React, { useState, useMemo } from 'react';
import { Category, Product, PresentationOption, CartItem } from '../types';
import { ProductCard } from './ProductCard';
import { ArrowLeft, Filter, X, MessageCircle, RefreshCw, Package } from 'lucide-react';
import { COMPANY_INFO } from '../data/catalog';

interface CategoryViewProps {
  category: Category;
  allCategories: Category[];
  allProducts: Product[];
  cartItems: CartItem[];
  searchQuery: string;
  onBackToCatalog: () => void;
  onSelectCategory: (categoryId: string) => void;
  onAddToCart: (product: Product, presentation: PresentationOption, qty: number) => void;
  onUpdateCartQty: (product: Product, presentation: PresentationOption, qty: number) => void;
  onOpenFicha: (product: Product) => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({
  category,
  allCategories,
  allProducts,
  cartItems,
  searchQuery,
  onBackToCatalog,
  onSelectCategory,
  onAddToCart,
  onUpdateCartQty,
  onOpenFicha
}) => {
  const [activeSubcategory, setActiveSubcategory] = useState<string>('Todos');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [brandFilter, setBrandFilter] = useState<'ALL' | 'PROESA' | 'MAXI BRILL'>('ALL');

  // Filter products for this category
  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      // Must belong to category
      if (p.categoryId !== category.id) return false;

      // Brand filter
      if (brandFilter !== 'ALL' && p.brand !== brandFilter) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesSku = p.sku.toLowerCase().includes(q);
        const matchesDesc = p.shortDescription.toLowerCase().includes(q);
        if (!matchesName && !matchesSku && !matchesDesc) return false;
      }

      // Subcategory filter
      if (activeSubcategory !== 'Todos') {
        const q = activeSubcategory.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesDesc = p.shortDescription.toLowerCase().includes(q);
        const matchesSheet = p.technicalSheet.activePrinciple.toLowerCase().includes(q) ||
          p.technicalSheet.applications.some((app) => app.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesSheet) return false;
      }

      return true;
    });
  }, [allProducts, category.id, brandFilter, searchQuery, activeSubcategory]);

  const handleContactAdvisor = () => {
    const text = `Hola PROESA Distribuidora, tengo una consulta sobre los productos de la categoría ${category.titleWithAccent} y quisiera una cotización comercial.`;
    window.open(COMPANY_INFO.whatsappUrl(text), '_blank');
  };

  // Other categories for quick jump
  const otherCategories = allCategories.filter((c) => c.id !== category.id);

  return (
    <div className="w-full space-y-4 pb-8">
      {/* Subheader: Volver al Catálogo & dynamic reference count (matching Image 7.jpeg) */}
      <div className="flex items-center justify-between gap-2 pt-1">
        <button
          onClick={onBackToCatalog}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#1A1C1C] hover:text-[#C4272B] transition-colors py-1 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Catálogo</span>
        </button>

        <div className="flex items-center gap-1 bg-[#F3F3F4] text-[#1A1C1C] border border-[#E5E5E5] px-2.5 py-0.5 rounded-full text-xs font-semibold tnum">
          <Package className="w-3.5 h-3.5 text-[#C4272B]" />
          <span>{filteredProducts.length} referencias</span>
        </div>
      </div>

      {/* Main Category Heading with Red Indicator Bar (matching Image 7.jpeg) */}
      <div className="flex items-start gap-2.5">
        <div className="w-2 self-stretch min-h-[28px] bg-[#C4272B] rounded-xs shrink-0" />
        <div>
          <h1 className="font-display font-black text-xl sm:text-2xl text-[#1A1C1C] leading-tight tracking-tight">
            {category.titleWithAccent}
          </h1>
          <p className="text-xs text-[#555555] mt-0.5">
            {category.description}
          </p>
        </div>
      </div>

      {/* Filter toolbar matching Image 7.jpeg */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between border-y border-[#E5E5E5] py-2 px-1">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              showFilters || brandFilter !== 'ALL' || activeSubcategory !== 'Todos'
                ? 'bg-[#C4272B] text-white'
                : 'bg-white text-[#1A1C1C] border border-[#CCCCCC] hover:border-[#000000]'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filtros {brandFilter !== 'ALL' || activeSubcategory !== 'Todos' ? '(Activo)' : ''}</span>
          </button>

          {(brandFilter !== 'ALL' || activeSubcategory !== 'Todos') && (
            <button
              onClick={() => {
                setBrandFilter('ALL');
                setActiveSubcategory('Todos');
              }}
              className="text-xs text-[#C4272B] font-semibold flex items-center gap-1 hover:underline cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Limpiar filtros</span>
            </button>
          )}
        </div>

        {/* Filter controls expansion */}
        {showFilters && (
          <div className="p-3 bg-white border border-[#000000] rounded-xl space-y-2.5 shadow-[2px_2px_0px_#000000] animate-in fade-in duration-100">
            <div>
              <span className="text-[10px] font-bold uppercase text-[#737373] block mb-1">
                Línea / Marca
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(['ALL', 'PROESA', 'MAXI BRILL'] as const).map((b) => (
                  <button
                    key={b}
                    onClick={() => setBrandFilter(b)}
                    className={`px-2.5 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer ${
                      brandFilter === b
                        ? 'bg-[#000000] text-white'
                        : 'bg-[#F3F3F4] text-[#1A1C1C] hover:bg-[#E5E5E5]'
                    }`}
                  >
                    {b === 'ALL' ? 'Todas las marcas' : b}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase text-[#737373] block mb-1">
                Subcategorías
              </span>
              <div className="flex flex-wrap gap-1">
                {category.subcategories.map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setActiveSubcategory(sub)}
                    className={`px-2 py-0.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                      activeSubcategory === sub
                        ? 'bg-[#C4272B] text-white font-bold'
                        : 'bg-[#EEEEEE] text-[#1A1C1C] hover:bg-[#E0E0E0]'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Product List matching Image 7.jpeg */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white border border-[#E5E5E5] rounded-xl p-8 text-center space-y-3">
          <p className="font-display font-bold text-base text-[#1A1C1C]">
            No se encontraron productos con los filtros seleccionados
          </p>
          <p className="text-xs text-[#737373]">
            Intenta borrar los términos de búsqueda o cambiar de categoría.
          </p>
          <button
            onClick={() => {
              setActiveSubcategory('Todos');
              setBrandFilter('ALL');
            }}
            className="px-4 py-2 bg-[#C4272B] text-white rounded-lg text-xs font-bold cursor-pointer"
          >
            Restablecer Filtros
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredProducts.map((product) => {
            const itemInCart = cartItems.find((ci) => ci.product.id === product.id);
            const qty = itemInCart ? itemInCart.quantity : 0;

            return (
              <ProductCard
                key={product.id}
                product={product}
                quantityInCart={qty}
                onAddToCart={onAddToCart}
                onUpdateCartQty={onUpdateCartQty}
                onOpenFicha={onOpenFicha}
              />
            );
          })}
        </div>
      )}

      {/* Quick Jump to Other Categories slider matching Image 7.jpeg */}
      <div className="pt-2">
        <div className="flex items-center gap-1.5 text-xs text-[#737373] font-bold mb-2">
          <RefreshCw className="w-3.5 h-3.5 text-[#C4272B]" />
          <span>Saltar a otra cat...</span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {otherCategories.map((c) => (
            <button
              key={c.id}
              onClick={() => onSelectCategory(c.id)}
              className="px-3 py-1.5 bg-white border border-[#CCCCCC] hover:border-[#000000] text-[#1A1C1C] rounded-lg text-xs font-semibold whitespace-nowrap hover:bg-[#F9F9F9] transition-all cursor-pointer shrink-0 shadow-2xs"
            >
              {c.name} &gt;
            </button>
          ))}
        </div>
      </div>

      {/* Commercial Advisor Contact Banner matching Image 7.jpeg */}
      <div className="bg-[#FFF1F1] border border-[#FFD5D5] rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
        <div className="flex gap-3 items-start">
          <div className="w-9 h-9 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-2xs">
            <MessageCircle className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h3 className="font-display font-bold text-sm sm:text-base text-[#1A1C1C]">
              ¿Tienes alguna consulta acerca de nuestros productos?
            </h3>
            <p className="text-xs text-[#555555] mt-1 leading-relaxed max-w-lg">
              Consulta directamente con nuestros asesores comerciales por WhatsApp para formulaciones personalizadas y pedidos especiales sin compromiso.
            </p>
          </div>
        </div>

        <button
          onClick={handleContactAdvisor}
          className="w-full sm:w-auto px-4 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs sm:text-sm rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[2px_2px_0px_#000000] whitespace-nowrap active:scale-95"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>Contactar Asesor</span>
        </button>
      </div>
    </div>
  );
};
