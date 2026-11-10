import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, Phone, Send, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { sound } from '../services/soundService';

interface DeliveryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onClearCart: () => void;
}

export const DeliveryDrawer: React.FC<DeliveryDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onClearCart
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderType, setOrderType] = useState<'delivery' | 'takeaway'>('delivery');

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);
  const deliveryCharge = orderType === 'delivery' && subtotal > 0 ? 50 : 0;
  const grandTotal = subtotal + deliveryCharge;

  const generateWhatsAppMessage = () => {
    let msg = `*New Order - Annapurna Heritage Restaurant*\n`;
    msg += `----------------------------------------\n`;
    msg += `*Order Type:* ${orderType.toUpperCase()}\n`;
    if (customerName) msg += `*Name:* ${customerName}\n`;
    if (customerPhone) msg += `*Phone:* ${customerPhone}\n`;
    if (deliveryAddress) msg += `*Address:* ${deliveryAddress}\n`;
    msg += `\n*Items Ordered:*\n`;

    cart.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.menuItem.name} x ${item.quantity} = Rs ${item.menuItem.price * item.quantity}\n`;
    });

    msg += `\n*Subtotal:* Rs ${subtotal}\n`;
    if (deliveryCharge > 0) msg += `*Delivery Fee:* Rs ${deliveryCharge}\n`;
    msg += `*Grand Total:* Rs ${grandTotal}\n`;
    msg += `----------------------------------------\n`;
    msg += `Please confirm my order. Thank you!`;
    return encodeURIComponent(msg);
  };

  const handleWhatsAppOrder = () => {
    sound.playSuccess();
    const encoded = generateWhatsAppMessage();
    // Direct link to WhatsApp on 9857051796 (from official delivery hotline)
    window.open(`https://wa.me/9779857051796?text=${encoded}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md h-full bg-white dark:bg-[#0d1c33] border-l border-amber-500/30 text-slate-800 dark:text-slate-100 flex flex-col justify-between shadow-2xl p-6"
      >
        {/* Header */}
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-white">
                  Delivery & Takeaway Tray
                </h3>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Hotline: {RESTAURANT_INFO.deliveryHotline1}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                sound.playWoodClick();
                onClose();
              }}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
              aria-label="Close delivery tray"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Delivery vs Takeaway Switcher */}
          <div className="flex gap-2 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl my-4">
            <button
              type="button"
              onClick={() => {
                sound.playWoodClick();
                setOrderType('delivery');
              }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                orderType === 'delivery'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Express Delivery (Rs 50)
            </button>
            <button
              type="button"
              onClick={() => {
                sound.playWoodClick();
                setOrderType('takeaway');
              }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                orderType === 'takeaway'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              Self Takeaway (Free)
            </button>
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto my-2 pr-1 space-y-3">
          {cart.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <ShoppingBag className="w-12 h-12 mx-auto stroke-1 text-slate-400 mb-2" />
              <p className="text-sm">Your delivery tray is currently empty.</p>
              <p className="text-xs text-slate-500 mt-1">Browse our menu and add authentic Thakali or Tandoori dishes!</p>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.menuItem.id}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading text-xs font-bold text-slate-900 dark:text-white truncate">
                    {item.menuItem.name}
                  </h4>
                  <div className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold tabular-nums mt-0.5">
                    Rs {item.menuItem.price} each
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800">
                    <button
                      onClick={() => {
                        sound.playWoodClick();
                        onUpdateQuantity(item.menuItem.id, -1);
                      }}
                      className="px-2 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2.5 text-xs font-bold text-slate-900 dark:text-white tabular-nums">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => {
                        sound.playWoodClick();
                        onUpdateQuantity(item.menuItem.id, 1);
                      }}
                      className="px-2 py-1 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  <span className="text-xs font-bold text-slate-900 dark:text-white tabular-nums min-w-[50px] text-right">
                    Rs {item.menuItem.price * item.quantity}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Customer Details Form */}
        {cart.length > 0 && (
          <div className="border-t border-slate-200 dark:border-slate-800 pt-3 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Your Name"
                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
              />
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Phone (98...)"
                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            </div>
            {orderType === 'delivery' && (
              <input
                type="text"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                placeholder="Street Address or Hotel Atithi Room #"
                className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
              />
            )}
          </div>
        )}

        {/* Footer Checkout Summary */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-4 mt-2">
          <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400 mb-4">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold text-slate-900 dark:text-white tabular-nums">Rs {subtotal}</span>
            </div>
            {orderType === 'delivery' && (
              <div className="flex justify-between">
                <span>Standard Delivery:</span>
                <span className="font-semibold text-slate-900 dark:text-white tabular-nums">Rs {deliveryCharge}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-bold text-slate-900 dark:text-white pt-1 border-t border-slate-200 dark:border-slate-800">
              <span>Grand Total:</span>
              <span className="text-amber-600 dark:text-amber-400 tabular-nums">Rs {grandTotal}</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-2">
            <button
              type="button"
              disabled={cart.length === 0}
              onClick={handleWhatsAppOrder}
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>Send Order to WhatsApp (9857051796)</span>
            </button>

            <a
              href={`tel:${RESTAURANT_INFO.deliveryHotline1}`}
              onClick={() => sound.playWoodClick()}
              className="w-full py-2.5 rounded-xl border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 font-semibold text-xs flex items-center justify-center gap-2 transition-colors text-center"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Or Call Delivery Hotline: {RESTAURANT_INFO.deliveryHotline1}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
