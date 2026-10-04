import React, { useState } from 'react';

// Exact vector representation of Image 1.png: Stylized circular 'P' emblem
export const ProesaEmblemVector: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => {
  return (
    <svg 
      viewBox="0 0 200 200" 
      className={`${className} shrink-0`} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="PROESA Logo"
    >
      {/* Outer red circular ribbon */}
      <path
        d="M 100 12 C 51.4 12 12 51.4 12 100 L 12 188 L 44 188 L 44 100 C 44 69.1 69.1 44 100 44 C 130.9 44 156 69.1 156 100 C 156 130.9 130.9 156 100 156 C 84.8 156 71.1 149.9 61.1 140 L 40.5 160.6 C 55.4 177.3 76.5 188 100 188 C 148.6 188 188 148.6 188 100 C 188 51.4 148.6 12 100 12 Z"
        fill="#C4272B"
      />
      {/* Inner red loop of the 'P' */}
      <path
        d="M 100 68 C 82.3 68 68 82.3 68 100 L 68 188 L 92 188 L 92 100 C 92 95.6 95.6 92 100 92 C 104.4 92 108 95.6 108 100 C 108 104.4 104.4 108 100 108 L 92 108 L 92 132 L 100 132 C 117.7 132 132 117.7 132 100 C 132 82.3 117.7 68 100 68 Z"
        fill="#C4272B"
      />
    </svg>
  );
};

// Vector representation of Image 6.png: PROESA Distribuidora text
export const ProesaTextVector: React.FC<{ className?: string }> = ({ className = 'h-8' }) => {
  return (
    <div className={`flex flex-col justify-center leading-none select-none ${className}`}>
      <span className="font-display font-black tracking-tight text-[#C4272B] text-lg sm:text-xl uppercase leading-none">
        PROESA
      </span>
      <span className="font-body font-bold text-[#C4272B] text-[11px] sm:text-[12px] tracking-wide leading-tight">
        Distribuidora
      </span>
    </div>
  );
};

// Component that tries image 1.png and 6.png, falling back gracefully to SVG
export const ProesaHeaderLogo: React.FC = () => {
  const [img1Error, setImg1Error] = useState(false);
  const [img6Error, setImg6Error] = useState(false);

  return (
    <div className="flex items-center gap-1.5 sm:gap-2 cursor-pointer">
      {/* Emblem: Image 1.png or vector fallback */}
      {!img1Error ? (
        <img
          src="/1.png"
          alt="PROESA"
          className="w-9 h-9 sm:w-10 sm:h-10 object-contain shrink-0"
          onError={() => setImg1Error(true)}
        />
      ) : (
        <ProesaEmblemVector className="w-9 h-9 sm:w-10 sm:h-10" />
      )}

      {/* Brand text: Image 6.png or vector text */}
      {!img6Error ? (
        <img
          src="/6.png"
          alt="PROESA Distribuidora"
          className="h-8 sm:h-9 object-contain shrink-0 hidden xs:block"
          onError={() => setImg6Error(true)}
        />
      ) : (
        <ProesaTextVector />
      )}

      {/* In case image 6.png is transparent or tiny on mobile, show crisp text */}
      {img6Error && <ProesaTextVector />}
    </div>
  );
};

// Vector representation of Image 2.png: MAXI BRILL Logo
export const MaxiBrillVector: React.FC<{ className?: string; size?: 'sm' | 'md' | 'lg' }> = ({
  className = '',
  size = 'lg'
}) => {
  const isLarge = size === 'lg';
  return (
    <div className={`flex flex-col items-center justify-center select-none text-center ${className}`}>
      <div className="relative inline-block font-black text-[#C4272B] tracking-wider leading-none">
        {/* Arched stylized MAXI */}
        <div 
          className={`font-display font-extrabold ${
            isLarge ? 'text-4xl sm:text-6xl tracking-widest' : 'text-2xl sm:text-3xl tracking-wider'
          } uppercase transform scale-y-110`}
          style={{
            textShadow: '0 0 1px #fff, 0 0 2px #fff, 2px 2px 0px rgba(196, 39, 43, 0.15)',
            letterSpacing: '0.08em'
          }}
        >
          MAXI
        </div>
        {/* Curved heavy BRILL */}
        <div 
          className={`font-display font-black ${
            isLarge ? 'text-5xl sm:text-7xl tracking-tighter' : 'text-3xl sm:text-4xl'
          } uppercase transform -mt-1 scale-y-105`}
          style={{
            textShadow: '0 0 1px #fff, 0 0 2px #fff, 2px 2px 0px rgba(196, 39, 43, 0.15)',
            letterSpacing: '0.04em'
          }}
        >
          BRILL
        </div>
      </div>
    </div>
  );
};

// MAXI BRILL banner component supporting Image 2.png with vector fallback
export const MaxiBrillLogo: React.FC<{ className?: string; size?: 'sm' | 'md' | 'lg' }> = ({
  className = '',
  size = 'lg'
}) => {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return <MaxiBrillVector className={className} size={size} />;
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img
        src="/2.png"
        alt="MAXI BRILL"
        className={size === 'lg' ? 'max-h-24 sm:max-h-28 object-contain' : 'max-h-12 object-contain'}
        onError={() => setImgError(true)}
      />
    </div>
  );
};
