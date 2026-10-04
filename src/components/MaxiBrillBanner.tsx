import React from 'react';

interface BannerSecundarioProps {
  logoSecundario: string;
  onSelect?: () => void;
}

export const MaxiBrillBanner: React.FC<BannerSecundarioProps> = ({
  logoSecundario,
  onSelect
}) => {
  return (
    <div 
      onClick={onSelect}
      className="group relative bg-white border-2 border-[#C4272B] rounded-xl p-4 sm:p-6 shadow-[2px_2px_0px_#000000] hover:shadow-[3px_3px_0px_#C4272B] transition-all cursor-pointer overflow-hidden flex items-center justify-center min-h-[130px] sm:min-h-[150px]"
    >
      {/* Rectangular Image (Logo Secundario) configurable from admin */}
      <div className="w-full flex items-center justify-center py-1 transition-transform duration-200 group-hover:scale-[1.02]">
        <img
          src={logoSecundario}
          alt="Logo Secundario"
          className="max-h-24 sm:max-h-28 max-w-full object-contain"
          onError={(e) => {
            // fallback to /2.png
            e.currentTarget.src = '/2.png';
          }}
        />
      </div>
    </div>
  );
};
