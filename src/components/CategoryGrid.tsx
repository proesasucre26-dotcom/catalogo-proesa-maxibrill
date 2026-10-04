import React from 'react';
import { Category } from '../types';
import { ChevronRight } from 'lucide-react';

interface CategoryGridProps {
  categories: Category[];
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ categories, onSelectCategory }) => {
  return (
    <div id="catalogo-distribucion" className="w-full scroll-mt-20">
      {/* Section Header matching Image 4.jpeg */}
      <div className="mb-3.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {/* Stacked geometric shapes icon (triangle, square, circle) */}
            <div className="flex items-center gap-0.5 text-[#C4272B] shrink-0">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2L6 12h12L12 2zM6 14h6v6H6v-6zm8 0a3 3 0 100 6 3 3 0 000-6z" />
              </svg>
            </div>
            <h2 className="font-display font-extrabold text-[#1A1C1C] text-sm sm:text-base tracking-tight uppercase">
              CATÁLOGO DE DISTRIBUCIÓN
            </h2>
          </div>
          <span className="text-xs text-[#737373] hidden xs:inline font-medium">
            Selecciona una categoría
          </span>
        </div>
        <p className="text-xs text-[#555555] mt-0.5 ml-7">
          Selecciona una categoría para explorar productos
        </p>
      </div>

      {/* 2-column Grid matching Image 4.jpeg */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {categories.map((cat) => {
          const isRedBadge = cat.badgeColor === 'red';

          return (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="group relative bg-white border border-[#000000] rounded-xl p-3 flex flex-col justify-between transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_#000000] cursor-pointer"
            >
              {/* Top product count badge */}
              <div className="flex items-center justify-between w-full mb-2">
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-sm tnum ${
                    isRedBadge
                      ? 'bg-[#C4272B] text-white'
                      : 'bg-[#EEEEEE] text-[#1A1C1C] border border-[#DDDDDD]'
                  }`}
                >
                  {cat.countLabel}
                </span>
              </div>

              {/* Product Image preview container with clean background */}
              <div className="relative w-full h-28 sm:h-36 bg-[#F9F9F9] rounded-lg overflow-hidden flex items-center justify-center p-2 mb-2.5 border border-[#F0F0F0] group-hover:border-[#E5E5E5] transition-colors">
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-200"
                />
              </div>

              {/* Card Footer */}
              <div className="flex flex-col">
                <h3 className="font-display font-bold text-xs sm:text-sm text-[#1A1C1C] line-clamp-2 leading-tight group-hover:text-[#C4272B] transition-colors">
                  {cat.name}
                </h3>
                <div className="mt-1 flex items-center justify-between text-[11px] text-[#737373] group-hover:text-[#1A1C1C]">
                  <span>Ver productos</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
