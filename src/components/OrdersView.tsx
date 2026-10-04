import React, { useState } from 'react';
import { Order, CartItem, Solicitante } from '../types';
import { Package, Clock, MessageCircle, Repeat, User, MapPin, Phone, Send, ShoppingBag } from 'lucide-react';
import { COMPANY_INFO } from '../data/catalog';

interface OrdersViewProps {
  orders: Order[];
  cartItems: CartItem[];
  onReorder: (items: CartItem[]) => void;
  onExploreCatalog: () => void;
  onClearCart?: () => void;
  onOrderPlaced?: (order: Order) => void;
}

export const OrdersView: React.FC<OrdersViewProps> = ({
  orders,
  cartItems,
  onReorder,
  onExploreCatalog,
  onClearCart,
  onOrderPlaced
}) => {
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

  const [orderSent, setOrderSent] = useState(false);

  const totalCantidadActual = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleSendDirectWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();

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
    if (cartItems.length === 0) {
      alert('No tienes productos agregados a tu pedido. Explora el catálogo para agregar productos.');
      return;
    }

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
      totalQuantity: totalCantidadActual,
      status: 'Pendiente'
    };

    if (onOrderPlaced) onOrderPlaced(newOrder);

    // Format WhatsApp message as requested to +591 72853351
    let msg = `🛒 *SOLICITUD DE PEDIDO - PROESA DISTRIBUIDORA*\n`;
    msg += `📋 *Pedido N°:* ${orderNumber}\n\n`;
    msg += `👤 *DATOS DEL SOLICITANTE:*\n`;
    msg += `• *Nombre:* ${solicitante.nombre}\n`;
    msg += `• *Dirección:* ${solicitante.direccion}\n`;
    msg += `• *Celular:* ${solicitante.celular}\n\n`;
    msg += `📦 *PRODUCTOS Y CANTIDADES SOLICITADAS:*\n`;

    cartItems.forEach((item, index) => {
      msg += `${index + 1}. *${item.product.name}*\n`;
      msg += `   └ Presentación: ${item.presentation.name} | *Cantidad: ${item.quantity} unidades*\n`;
    });

    msg += `\n📊 *CANTIDAD TOTAL DE PRODUCTOS:* ${totalCantidadActual} unidades\n`;
    msg += `\n_Mensaje enviado al +591 72853351 desde PROESA Distribuidora_`;

    const whatsappUrl = `https://wa.me/59172853351?text=${encodeURIComponent(msg)}`;
    window.open(whatsappUrl, '_blank');

    setOrderSent(true);
    if (onClearCart) {
      setTimeout(() => {
        onClearCart();
        setOrderSent(false);
      }, 1500);
    }
  };

  return (
    <div className="space-y-5 pb-12">
      {/* Header section */}
      <div className="flex items-center justify-between border-b border-[#E5E5E5] pb-2.5">
        <div>
          <h1 className="font-display font-black text-xl text-[#1A1C1C]">
            Mis Pedidos
          </h1>
          <p className="text-xs text-[#555555]">
            Enviar tu solicitud de productos y administrar tus pedidos anteriores
          </p>
        </div>
      </div>

      {/* FORM: DATOS DEL SOLICITANTE & ENVÍO A WHATSAPP */}
      <div className="bg-white border-2 border-[#000000] rounded-xl p-4 sm:p-5 shadow-[3px_3px_0px_#000000] space-y-3.5">
        <div className="flex items-center gap-2 border-b border-[#E5E5E5] pb-2">
          <User className="w-5 h-5 text-[#C4272B]" />
          <div>
            <h2 className="font-display font-extrabold text-sm sm:text-base text-[#1A1C1C] uppercase tracking-wide">
              Datos del Solicitante
            </h2>
            <p className="text-[11px] text-[#737373]">
              Información de contacto para la entrega y confirmación del pedido
            </p>
          </div>
        </div>

        <form onSubmit={handleSendDirectWhatsApp} className="space-y-3">
          {/* Nombre */}
          <div>
            <label className="text-[11px] font-bold uppercase text-[#444444] block mb-1">
              Nombre del Solicitante *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#737373] absolute left-3 top-2.5" />
              <input
                type="text"
                required
                value={solicitante.nombre}
                onChange={(e) => setSolicitante({ ...solicitante, nombre: e.target.value })}
                placeholder="Nombre y apellido / Razón social"
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-[#000000] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4272B]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Dirección */}
            <div>
              <label className="text-[11px] font-bold uppercase text-[#444444] block mb-1">
                Dirección de Entrega *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-[#737373] absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={solicitante.direccion}
                  onChange={(e) => setSolicitante({ ...solicitante, direccion: e.target.value })}
                  placeholder="Calle, número, zona o referencia en Sucre"
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-[#000000] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4272B]"
                />
              </div>
            </div>

            {/* Número de celular */}
            <div>
              <label className="text-[11px] font-bold uppercase text-[#444444] block mb-1">
                Número de Celular *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#737373] absolute left-3 top-2.5" />
                <input
                  type="tel"
                  required
                  value={solicitante.celular}
                  onChange={(e) => setSolicitante({ ...solicitante, celular: e.target.value })}
                  placeholder="Ej. 72853351"
                  className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-[#000000] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#25D366]"
                />
              </div>
            </div>
          </div>

          {/* Current cart items or explore prompt */}
          <div className="pt-2 border-t border-[#E5E5E5]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-[#1A1C1C]">
                Cantidad de Productos en Pedido Actual:
              </span>
              <span className="font-display font-bold text-xs sm:text-sm text-[#C4272B] tnum">
                {totalCantidadActual} unidades
              </span>
            </div>

            {cartItems.length > 0 ? (
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {cartItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2 bg-[#F9F9F9] rounded-lg border border-[#E5E5E5] flex justify-between items-center text-xs"
                  >
                    <span className="truncate pr-2 font-medium text-[#1A1C1C]">
                      {item.product.name} ({item.presentation.name})
                    </span>
                    <span className="font-bold text-[#C4272B] shrink-0 tnum">
                      Cantidad: {item.quantity} unid.
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 bg-[#F9F9F9] rounded-lg border border-dashed border-[#CCCCCC] text-center">
                <p className="text-xs text-[#737373] mb-2">
                  No has añadido productos todavía.
                </p>
                <button
                  type="button"
                  onClick={onExploreCatalog}
                  className="px-3 py-1.5 bg-black text-white rounded-md text-xs font-bold hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  Ir al Catálogo de Distribución
                </button>
              </div>
            )}
          </div>

          {/* Botón de Enviar a WhatsApp en color verde al número +591 72853351 */}
          {cartItems.length > 0 && (
            <button
              type="submit"
              className="w-full py-3 bg-[#25D366] hover:bg-[#20bd5a] active:scale-98 text-white font-bold text-xs sm:text-sm rounded-lg flex items-center justify-center gap-2 shadow-[2px_2px_0px_#000000] cursor-pointer transition-all mt-2"
            >
              <Send className="w-4 h-4" />
              <span>Enviar Pedido a WhatsApp (+591 72853351)</span>
            </button>
          )}

          {orderSent && (
            <p className="text-center text-xs font-bold text-emerald-700 pt-1">
              ✓ ¡Solicitud generada y enviada a WhatsApp (+591 72853351)!
            </p>
          )}
        </form>
      </div>

      {/* Historial de Pedidos Anteriores */}
      <div className="space-y-3">
        <h3 className="font-display font-bold text-sm text-[#1A1C1C] uppercase tracking-wider">
          Historial de Solicitudes Registradas ({orders.length})
        </h3>

        {orders.length === 0 ? (
          <div className="bg-white border border-[#E5E5E5] rounded-xl p-6 text-center text-[#737373] text-xs">
            No hay solicitudes anteriores guardadas.
          </div>
        ) : (
          <div className="space-y-2.5">
            {orders.map((order) => {
              const totalUnidades = order.items.reduce((acc, it) => acc + it.quantity, 0);

              return (
                <div
                  key={order.id}
                  className="bg-white border border-[#000000] rounded-xl p-3.5 shadow-[2px_2px_0px_#000000] space-y-2.5"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-[#E5E5E5]">
                    <div>
                      <span className="font-display font-bold text-xs text-[#C4272B]">
                        {order.orderNumber}
                      </span>
                      <div className="text-[11px] text-[#737373] flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" />
                        <span>{order.date}</span>
                      </div>
                    </div>

                    <span className="px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {order.status}
                    </span>
                  </div>

                  {/* Solicitante info */}
                  <div className="text-[11px] text-[#555555] bg-[#F9F9F9] p-2 rounded-md">
                    <div><strong>Solicitante:</strong> {order.customerName}</div>
                    <div><strong>Dirección:</strong> {order.deliveryAddress}</div>
                    <div><strong>Celular:</strong> {order.phone}</div>
                  </div>

                  {/* Products and quantities list */}
                  <div className="space-y-1 text-xs">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-[#333333]">
                        <span className="truncate pr-2">
                          {item.product.name} ({item.presentation.name})
                        </span>
                        <span className="font-bold text-[#1A1C1C] shrink-0 tnum">
                          Cantidad: {item.quantity} unid.
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Footer with total quantity */}
                  <div className="pt-2 border-t border-[#E5E5E5] flex items-center justify-between">
                    <div className="text-xs">
                      <span className="text-[#737373] font-medium">Cantidad Total: </span>
                      <strong className="font-display text-[#C4272B]">{totalUnidades} unidades</strong>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          const msg = `Hola PROESA Distribuidora, deseo consultar el estado de mi pedido ${order.orderNumber} solicitado por ${order.customerName}.`;
                          window.open(COMPANY_INFO.whatsappUrl(msg), '_blank');
                        }}
                        className="px-3 py-1.5 bg-[#25D366] hover:bg-[#20bd5a] active:scale-95 text-white font-bold rounded-lg text-xs flex items-center gap-1.5 shadow-[1.5px_1.5px_0px_#000000] transition-all cursor-pointer"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-current" />
                        <span>Consultar por WhatsApp</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
