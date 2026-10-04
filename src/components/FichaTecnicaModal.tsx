import React from 'react';
import { Product } from '../types';
import { X, FileText, CheckCircle2, AlertTriangle, Printer, MessageCircle, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '../data/catalog';
import { ProesaEmblemVector } from './Logos';

interface FichaTecnicaModalProps {
  product: Product | null;
  onClose: () => void;
}

export const FichaTecnicaModal: React.FC<FichaTecnicaModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  const { technicalSheet } = product;

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppInquiry = () => {
    const text = `Hola PROESA Distribuidora, deseo solicitar más información técnica y cotización por mayor del producto: ${product.name} (${product.sku}).`;
    window.open(COMPANY_INFO.whatsappUrl(text), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="relative bg-white w-full max-w-lg max-h-[90vh] rounded-xl border-2 border-[#000000] shadow-[4px_4px_0px_#000000] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#1A1C1C] text-white p-3.5 sm:p-4 flex items-center justify-between border-b border-[#000000]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white rounded-full p-1 flex items-center justify-center">
              <ProesaEmblemVector className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#FF9E9E] tracking-wider uppercase block">
                FICHA TÉCNICA COMERCIAL
              </span>
              <h2 className="font-display font-bold text-sm sm:text-base leading-tight line-clamp-1">
                {product.name}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Cerrar ficha"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs sm:text-sm text-[#1A1C1C]">
          {/* Product basic summary */}
          <div className="flex gap-3 items-start pb-3 border-b border-[#E5E5E5]">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-md border border-[#E5E5E5] bg-[#F9F9F9] p-1 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="inline-block font-display font-bold text-[#C4272B] text-xs tnum">
                {product.sku}
              </div>
              <h3 className="font-display font-bold text-sm sm:text-base text-[#1A1C1C] leading-snug">
                {product.name}
              </h3>
              <p className="text-xs text-[#555555] mt-1">
                {product.shortDescription}
              </p>
              <div className="mt-1 text-[11px] font-semibold text-[#1A1C1C]">
                Marca:{' '}
                <span className={product.brand === 'MAXI BRILL' ? 'text-[#C4272B]' : 'text-[#1A1C1C]'}>
                  {product.brand}
                </span>
              </div>
            </div>
          </div>

          {/* Chemical Specifications Grid */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-[#F9F9F9] p-2.5 rounded-lg border border-[#E5E5E5]">
              <span className="text-[10px] font-bold text-[#737373] uppercase block">
                Principio Activo
              </span>
              <span className="font-semibold text-[#1A1C1C] mt-0.5 block leading-tight">
                {technicalSheet.activePrinciple}
              </span>
            </div>

            <div className="bg-[#F9F9F9] p-2.5 rounded-lg border border-[#E5E5E5]">
              <span className="text-[10px] font-bold text-[#737373] uppercase block">
                Concentración
              </span>
              <span className="font-semibold text-[#1A1C1C] mt-0.5 block leading-tight">
                {technicalSheet.concentration}
              </span>
            </div>

            <div className="bg-[#F9F9F9] p-2.5 rounded-lg border border-[#E5E5E5]">
              <span className="text-[10px] font-bold text-[#737373] uppercase block">
                Nivel de pH
              </span>
              <span className="font-semibold text-[#1A1C1C] mt-0.5 block">
                {technicalSheet.ph}
              </span>
            </div>

            <div className="bg-[#F9F9F9] p-2.5 rounded-lg border border-[#E5E5E5]">
              <span className="text-[10px] font-bold text-[#737373] uppercase block">
                Dosificación / Dilución
              </span>
              <span className="font-semibold text-[#1A1C1C] mt-0.5 block leading-tight">
                {technicalSheet.dilution}
              </span>
            </div>
          </div>

          {/* Applications list */}
          <div>
            <h4 className="font-display font-bold text-xs uppercase text-[#1A1C1C] mb-1.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Campos de Aplicación Recomendados
            </h4>
            <ul className="space-y-1 text-xs text-[#444444] pl-5 list-disc marker:text-[#C4272B]">
              {technicalSheet.applications.map((app, idx) => (
                <li key={idx} className="leading-snug">{app}</li>
              ))}
            </ul>
          </div>

          {/* Precautions */}
          <div className="bg-[#FFF5F5] border border-[#FFD0D0] p-3 rounded-lg text-xs">
            <h4 className="font-bold text-[#C4272B] uppercase mb-1 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              Precauciones y Seguridad
            </h4>
            <ul className="space-y-1 text-[#555555] pl-4 list-disc marker:text-[#C4272B]">
              {technicalSheet.precautions.map((prec, idx) => (
                <li key={idx}>{prec}</li>
              ))}
            </ul>
          </div>

          {/* Available presentations */}
          <div>
            <span className="text-[11px] font-bold text-[#737373] uppercase block mb-1">
              Presentación Oficial
            </span>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-3 py-1 text-xs font-bold bg-[#C4272B] text-white rounded-md">
                {product.defaultPresentation || product.presentations[0]?.name || '1 Litro'}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-3 bg-[#F4F4F4] border-t border-[#E5E5E5] flex items-center justify-between gap-2">
          <button
            onClick={handlePrint}
            className="px-3 py-2 text-xs font-semibold bg-white border border-[#000000] rounded-lg text-[#1A1C1C] hover:bg-gray-100 flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimir</span>
          </button>

          <button
            onClick={handleWhatsAppInquiry}
            className="px-3.5 py-2 text-xs font-bold bg-[#25D366] text-white rounded-lg hover:bg-[#20bd5a] active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>Consultar por WhatsApp</span>
          </button>
        </div>
      </div>
    </div>
  );
};
