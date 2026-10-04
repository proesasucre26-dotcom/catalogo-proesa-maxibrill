import React, { useState } from 'react';
import { Product, PresentationOption } from '../types';
import { ShoppingCart, FileText, Plus, Minus, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  quantityInCart: number;
  onAddToCart: (product: Product, presentation: PresentationOption, qty: number) => void;
  onUpdateCartQty: (product: Product, presentation: PresentationOption, qty: number) => void;
  onOpenFicha: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  quantityInCart,
  onAddToCart,
  onUpdateCartQty,
  onOpenFicha
}) => {
  // Use product.defaultPresentation or first presentation
  const currentPresentation: PresentationOption = {
    name: product.defaultPresentation || product.presentations[0]?.name || '1 Litro',
    volume: product.defaultPresentation || '1L',
    price: 0
  };

  const [justAdded, setJustAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, currentPresentation, 1);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div className="bg-white border-2 border-[#000000] rounded-xl p-3.5 sm:p-4 shadow-[2px_2px_0px_#000000] hover:shadow-[3px_3px_0px_#C4272B] transition-all flex flex-col gap-3">
      {/* Top section: Large vertical product photo & details */}
      <div className="flex gap-3 sm:gap-4 items-stretch">
        {/* Foto del producto en formato vertical grande */}
        <div 
          onClick={() => onOpenFicha(product)}
          className="relative w-32 sm:w-40 min-h-[170px] sm:min-h-[210px] bg-[#F9F9F9] rounded-xl border border-[#000000] p-2 shrink-0 flex items-center justify-center cursor-pointer group/img overflow-hidden shadow-2xs"
          title="Ver detalles del producto"
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-contain mix-blend-multiply group-hover/img:scale-105 transition-transform duration-200"
          />
          {product.brand === 'MAXI BRILL' && (
            <span className="absolute top-2 left-2 bg-[#C4272B] text-white text-[9px] font-black px-1.5 py-0.5 rounded-xs tracking-tighter shadow-2xs">
              MAXI BRILL
            </span>
          )}
        </div>

        {/* Text information */}
        <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
          <div>
            {/* SKU in red */}
            <div className="font-display font-bold text-[#C4272B] text-xs sm:text-sm tracking-tight tnum uppercase">
              {product.sku}
            </div>

            {/* Product Title */}
            <h3 
              onClick={() => onOpenFicha(product)}
              className="font-display font-bold text-sm sm:text-base text-[#1A1C1C] leading-snug cursor-pointer hover:text-[#C4272B] transition-colors mt-0.5 line-clamp-2"
            >
              {product.name}
            </h3>

            {/* Short description */}
            <p className="text-xs text-[#555555] line-clamp-3 mt-1.5 leading-relaxed">
              {product.shortDescription}
            </p>
          </div>

          {/* Presentación: Solo un botón rojo como solicita el usuario */}
          <div className="mt-2.5">
            <span className="text-[10px] font-bold text-[#737373] uppercase tracking-wider block mb-1">
              PRESENTACIÓN:
            </span>
            {/* Botón rojo de presentación cambiable desde el administrador */}
            <button
              type="button"
              className="px-3 py-1.5 bg-[#C4272B] text-white text-xs font-bold rounded-lg shadow-2xs select-none inline-flex items-center"
            >
              {product.defaultPresentation || '1 Litro'}
            </button>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-1 border-t border-[#F0F0F0]">
        {quantityInCart === 0 ? (
          <button
            onClick={handleAdd}
            className={`flex-1 py-2.5 px-3 rounded-lg font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-[#C4272B] hover:bg-[#A9171E] active:scale-98 text-white shadow-[2px_2px_0px_#000000]'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>¡Agregado al Pedido!</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                <span>Añadir Pedido</span>
              </>
            )}
          </button>
        ) : (
          <div className="flex-1 flex items-center justify-between border-2 border-[#000000] rounded-lg bg-white px-2 py-1 shadow-2xs">
            <button
              onClick={() => onUpdateCartQty(product, currentPresentation, quantityInCart - 1)}
              className="w-8 h-8 flex items-center justify-center text-[#1A1C1C] hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
              aria-label="Disminuir cantidad"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-display font-black text-xs sm:text-sm text-[#C4272B] tnum px-2">
              Cantidad: {quantityInCart} unid.
            </span>
            <button
              onClick={() => onUpdateCartQty(product, currentPresentation, quantityInCart + 1)}
              className="w-8 h-8 flex items-center justify-center bg-[#C4272B] text-white hover:bg-[#A9171E] rounded-md transition-colors cursor-pointer"
              aria-label="Aumentar cantidad"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Ficha Técnica button */}
        <button
          onClick={() => onOpenFicha(product)}
          title="Ver Ficha Técnica"
          aria-label="Ver Ficha Técnica"
          className="p-2.5 border-2 border-[#000000] hover:border-[#C4272B] rounded-lg bg-[#F9F9F9] hover:bg-white text-[#1A1C1C] transition-all cursor-pointer shadow-2xs"
        >
          <FileText className="w-5 h-5 text-[#333333] hover:text-[#C4272B]" />
        </button>
      </div>
    </div>
  );
};
