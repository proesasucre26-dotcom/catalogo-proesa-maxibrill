import React, { useState } from 'react';
import { CartItem, Order, Solicitante } from '../types';
import { X, Trash2, Plus, Minus, Send, ShoppingBag, MapPin, User, Phone, CheckCircle2 } from 'lucide-react';
import { COMPANY_INFO } from '../data/catalog';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (productId: string, presentationName: string, qty: number) => void;
  onClearCart: () => void;
  onOrderPlaced: (order: Order) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onClearCart,
  onOrderPlaced
}) => {
  // Solicitante data as requested: nombre, direccion, numero de celular
  const [solicitante, setSolicitante] = useState<Solicitante>(() => {
    try {
      const saved = localStorage.getItem('proesa_solicitante');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      nombre: '',
      direccion: 'Sucre, ',
      celular: ''
    };
  });

  const [orderSentSuccess, setOrderSentSuccess] = useState(false);

  if (!isOpen) return null;

  // Total quantity of requested items
  const totalCantidad = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleSendToWhatsApp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    if (!solicitante.nombre.trim()) {
      alert('Por favor introduce el Nombre del solicitante.');
      return;
    }
    if (!solicitante.direccion.trim()) {
      alert('Por favor introduce la Dirección del solicitante.');
      return;
    }
    if (!solicitante.celular.trim()) {
      alert('Por favor introduce el Número de Celular del solicitante.');
      return;
    }

    // Save solicitante details for future convenience
    try {
      localStorage.setItem('proesa_solicitante', JSON.stringify(solicitante));
    } catch (err) {
      console.error(err);
    }

    const orderNumber = `PRO-${Date.now().toString().slice(-6)}`;
    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      date: new Date().toLocaleDateString('es-BO', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      customerName: solicitante.nombre,
      phone: solicitante.celular,
      deliveryAddress: solicitante.direccion,
      items: [...cartItems],
      totalQuantity: totalCantidad,
      status: 'Pendiente'
    };

    onOrderPlaced(newOrder);

    // Format WhatsApp message with Solicitante and Cantidades
    let msg = `🛒 *SOLICITUD DE PEDIDO - PROESA DISTRIBUIDORA*\n`;
    msg += `📋 *Código de Registro:* ${orderNumber}\n\n`;
    
    msg += `👤 *DATOS DEL SOLICITANTE:*\n`;
    msg += `• *Nombre:* ${solicitante.nombre}\n`;
    msg += `• *Dirección:* ${solicitante.direccion}\n`;
    msg += `• *Celular:* ${solicitante.celular}\n\n`;

    msg += `📦 *PRODUCTOS Y CANTIDADES SOLICITADAS:*\n`;
    cartItems.forEach((item, index) => {
      msg += `${index + 1}. *${item.product.name}*\n`;
      msg += `   └ Presentación: ${item.presentation.name} | *Cantidad: ${item.quantity} unidades*\n`;
    });

    msg += `\n📊 *CANTIDAD TOTAL:* ${totalCantidad} unidades solicitadas\n`;
    msg += `\n_Mensaje enviado al +591 72853351 desde el Catálogo PROESA Distribuidora (calle Ostria Reyes 432)_`;

    // WhatsApp link to +591 72853351
    const whatsappUrl = `https://wa.me/59172853351?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');

    setOrderSentSuccess(true);
    setTimeout(() => {
      onClearCart();
      setOrderSentSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-2xs animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between overflow-hidden border-l border-[#000000]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 bg-white border-b border-[#E5E5E5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#C4272B]" />
            <div>
              <h2 className="font-display font-bold text-base text-[#1A1C1C]">
                Pedido de Productos
              </h2>
              <span className="text-xs text-[#555555]">
                Cantidad total: <strong className="text-[#C4272B]">{totalCantidad} unidades</strong>
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#737373] hover:text-[#1A1C1C] hover:bg-[#F3F3F4] transition-colors cursor-pointer"
            aria-label="Cerrar pedido"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {orderSentSuccess ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-display font-bold text-lg text-[#1A1C1C]">
                ¡Pedido Enviado a WhatsApp!
              </h3>
              <p className="text-xs text-[#555555] max-w-xs mx-auto">
                Tu solicitud con los datos del solicitante y la cantidad de productos ha sido enviada al +591 72853351.
              </p>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-16 h-16 bg-[#F9F9F9] border border-[#E5E5E5] rounded-full flex items-center justify-center mx-auto text-[#737373]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-display font-bold text-base text-[#1A1C1C]">
                No hay productos en tu pedido
              </h3>
              <p className="text-xs text-[#737373] max-w-xs mx-auto">
                Agrega productos desde el catálogo para indicar la cantidad deseada y enviar tu solicitud.
              </p>
            </div>
          ) : (
            <>
              {/* Product items with quantity emphasis */}
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase text-[#737373] tracking-wider block">
                  Productos Seleccionados & Cantidad:
                </span>

                {cartItems.map((item) => (
                  <div
                    key={`${item.product.id}-${item.presentation.name}`}
                    className="p-3 bg-[#FBFBFB] border border-[#E5E5E5] rounded-xl flex gap-3 items-center justify-between"
                  >
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-12 h-12 object-contain rounded-md border border-[#E5E5E5] bg-white p-1 shrink-0"
                    />

                    <div className="flex-1 min-w-0 pr-1">
                      <div className="text-[10px] font-bold text-[#C4272B] tnum">
                        {item.product.sku}
                      </div>
                      <h4 className="font-display font-bold text-xs text-[#1A1C1C] truncate">
                        {item.product.name}
                      </h4>
                      <div className="text-[11px] text-[#555555]">
                        Presentación: <span className="font-semibold text-[#1A1C1C]">{item.presentation.name}</span>
                      </div>
                      <div className="text-[11px] font-bold text-[#C4272B] mt-0.5">
                        Cantidad: {item.quantity} {item.quantity === 1 ? 'unidad' : 'unidades'}
                      </div>
                    </div>

                    {/* Stepper controls */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <div className="flex items-center border border-[#000000] rounded-md bg-white">
                        <button
                          onClick={() => onUpdateQty(item.product.id, item.presentation.name, item.quantity - 1)}
                          className="p-1 text-[#1A1C1C] hover:bg-gray-100 rounded-l-sm"
                          aria-label="Disminuir cantidad"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold font-display text-[#1A1C1C] tnum">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQty(item.product.id, item.presentation.name, item.quantity + 1)}
                          className="p-1 bg-[#C4272B] text-white hover:bg-[#A9171E] rounded-r-sm"
                          aria-label="Aumentar cantidad"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => onUpdateQty(item.product.id, item.presentation.name, 0)}
                        className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
                        title="Eliminar producto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* SECTION: DATOS DEL SOLICITANTE */}
              <div className="bg-[#F9F9F9] border-2 border-[#1A1C1C] rounded-xl p-3.5 space-y-3 shadow-[2px_2px_0px_#000000]">
                <div className="flex items-center gap-2 border-b border-[#E0E0E0] pb-2">
                  <User className="w-4 h-4 text-[#C4272B]" />
                  <h3 className="font-display font-bold text-xs sm:text-sm text-[#1A1C1C] uppercase tracking-wide">
                    Datos del Solicitante
                  </h3>
                </div>

                {/* Nombre */}
                <div>
                  <label className="text-[10px] font-bold uppercase text-[#555555] block mb-1">
                    Nombre Completo *
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-[#737373] absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      required
                      value={solicitante.nombre}
                      onChange={(e) => setSolicitante({ ...solicitante, nombre: e.target.value })}
                      placeholder="Ej. Carlos Mendoza / Empresa..."
                      className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-[#000000] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C4272B]"
                    />
                  </div>
                </div>

                {/* Dirección */}
                <div>
                  <label className="text-[10px] font-bold uppercase text-[#555555] block mb-1">
                    Dirección de Entrega *
                  </label>
                  <div className="relative">
                    <MapPin className="w-3.5 h-3.5 text-[#737373] absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      required
                      value={solicitante.direccion}
                      onChange={(e) => setSolicitante({ ...solicitante, direccion: e.target.value })}
                      placeholder="Calle, número, zona o referencia en Sucre"
                      className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-[#000000] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C4272B]"
                    />
                  </div>
                </div>

                {/* Número de Celular */}
                <div>
                  <label className="text-[10px] font-bold uppercase text-[#555555] block mb-1">
                    Número de Celular *
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-[#737373] absolute left-2.5 top-2.5" />
                    <input
                      type="tel"
                      required
                      value={solicitante.celular}
                      onChange={(e) => setSolicitante({ ...solicitante, celular: e.target.value })}
                      placeholder="Ej. 72853351"
                      className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-[#000000] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#25D366]"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Drawer Footer with Enviar a WhatsApp Button */}
        {cartItems.length > 0 && !orderSentSuccess && (
          <div className="p-4 bg-[#F9F9F9] border-t border-[#E5E5E5] space-y-2.5">
            <div className="flex justify-between items-center text-xs font-bold text-[#1A1C1C]">
              <span>Cantidad Total Solicitada:</span>
              <span className="font-display text-sm text-[#C4272B] tnum">{totalCantidad} unidades</span>
            </div>

            <button
              onClick={() => handleSendToWhatsApp()}
              className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] active:scale-98 text-white font-bold text-sm rounded-lg flex items-center justify-center gap-2 shadow-[2px_2px_0px_#000000] cursor-pointer transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Enviar Pedido a WhatsApp (+591 72853351)</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
