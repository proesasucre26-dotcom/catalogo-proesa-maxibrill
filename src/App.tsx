import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MaxiBrillBanner } from './components/MaxiBrillBanner';
import { CategoryGrid } from './components/CategoryGrid';
import { CategoryView } from './components/CategoryView';
import { BottomNav, TabType } from './components/BottomNav';
import { CartDrawer } from './components/CartDrawer';
import { FichaTecnicaModal } from './components/FichaTecnicaModal';
import { OrdersView } from './components/OrdersView';
import { AdminView } from './components/AdminView';
import { CATEGORIES, PRODUCTS } from './data/catalog';
import { Product, Category, CartItem, PresentationOption, Order, AppBranding } from './types';

export default function App() {
  // Navigation state
  const [currentTab, setCurrentTab] = useState<TabType>('inicio');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  // Search state
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Branding state: Logo Principal (square) and Logo Secundario (rectangular)
  const [branding, setBranding] = useState<AppBranding>(() => {
    try {
      const saved = localStorage.getItem('proesa_branding');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {
      logoPrincipal: '/1.png',
      logoSecundario: '/2.png'
    };
  });

  // Products state persisted in localStorage
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('proesa_products');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return PRODUCTS;
  });

  // Categories state persisted in localStorage
  const [categories, setCategories] = useState<Category[]>(() => {
    try {
      const saved = localStorage.getItem('proesa_categories');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return CATEGORIES;
  });

  // Cart state persisted in localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('proesa_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        product: PRODUCTS[0],
        presentation: PRODUCTS[0].presentations[0],
        quantity: 2
      },
      {
        product: PRODUCTS[1],
        presentation: PRODUCTS[1].presentations[0],
        quantity: 1
      }
    ];
  });

  // Orders state persisted in localStorage
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('proesa_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        id: 'ord-init-1',
        orderNumber: 'PRO-849201',
        date: 'Ayer, 16:30',
        customerName: 'Clínica Los Ángeles (Sucre)',
        phone: '72853351',
        deliveryAddress: 'calle San Alberto #210, Sucre',
        items: [
          {
            product: PRODUCTS[0],
            presentation: PRODUCTS[0].presentations[2],
            quantity: 2
          },
          {
            product: PRODUCTS[1],
            presentation: PRODUCTS[1].presentations[1],
            quantity: 4
          }
        ],
        totalQuantity: 6,
        status: 'Confirmado'
      }
    ];
  });

  // Modals & Panels
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [fichaProduct, setFichaProduct] = useState<Product | null>(null);

  // Save changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('proesa_branding', JSON.stringify(branding));
    } catch (e) {
      console.error(e);
    }
  }, [branding]);

  useEffect(() => {
    try {
      localStorage.setItem('proesa_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('proesa_categories', JSON.stringify(categories));
    } catch (e) {
      console.error(e);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem('proesa_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem('proesa_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Cart total items count
  const cartTotalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Add to cart handler
  const handleAddToCart = (product: Product, presentation: PresentationOption, qty: number = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (ci) => ci.product.id === product.id && ci.presentation.name === presentation.name
      );

      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        return updated;
      } else {
        return [...prev, { product, presentation, quantity: qty }];
      }
    });
  };

  // Update cart item quantity
  const handleUpdateCartQty = (productId: string, presentationName: string, newQty: number) => {
    setCartItems((prev) => {
      if (newQty <= 0) {
        return prev.filter(
          (ci) => !(ci.product.id === productId && ci.presentation.name === presentationName)
        );
      }
      return prev.map((ci) => {
        if (ci.product.id === productId && ci.presentation.name === presentationName) {
          return { ...ci, quantity: newQty };
        }
        return ci;
      });
    });
  };

  const handleUpdateProductQtyFromCard = (product: Product, presentation: PresentationOption, newQty: number) => {
    handleUpdateCartQty(product.id, presentation.name, newQty);
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleOrderPlaced = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  const handleReorder = (items: CartItem[]) => {
    setCartItems(items);
    setIsCartOpen(true);
  };

  const handleToggleStock = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, inStock: !p.inStock } : p))
    );
  };

  // Switch to category view (matches Image 7.jpeg)
  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setCurrentTab('catalogo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back to catalog grid / home
  const handleBackToCatalog = () => {
    setSelectedCategoryId(null);
    setCurrentTab('inicio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Tab switching from bottom nav
  const handleTabChange = (tab: TabType) => {
    if (tab === 'catalogo') {
      // User requested: "en el botón de catalogo del menú inferior enlaza a la sección 'catálogo de distribución'"
      setCurrentTab('inicio');
      setSelectedCategoryId(null);
      setTimeout(() => {
        const el = document.getElementById('catalogo-distribucion');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
      return;
    }

    setCurrentTab(tab);

    if (tab === 'inicio') {
      setSelectedCategoryId(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'pedidos') {
      // User requested: "el botón mis pedidos lleva ala sección de 'mis pedidos'"
      setSelectedCategoryId(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'admin') {
      setSelectedCategoryId(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Active category object
  const activeCategory = categories.find((c) => c.id === selectedCategoryId) || categories[0];

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-[#1A1C1C] flex flex-col font-body selection:bg-[#C4272B] selection:text-white">
      {/* Global Header with configurable square Logo Principal */}
      <Header
        cartCount={cartTotalCount}
        logoPrincipal={branding.logoPrincipal}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigateHome={() => {
          setSelectedCategoryId(null);
          setCurrentTab('inicio');
          setSearchQuery('');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        searchQuery={searchQuery}
        onSearchChange={(q) => setSearchQuery(q)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-3 sm:px-4 py-4 pb-20">
        {/* VIEW 1: INICIO (matches Image 4.jpeg) */}
        {currentTab === 'inicio' && !selectedCategoryId && (
          <div className="space-y-4">
            {/* Banner Secundario: configurable rectangular image without labels */}
            <MaxiBrillBanner
              logoSecundario={branding.logoSecundario}
              onSelect={() => {
                const el = document.getElementById('catalogo-distribucion');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            />

            {/* Catálogo de Distribución Grid (anchored with id="catalogo-distribucion") */}
            <CategoryGrid
              categories={categories}
              onSelectCategory={handleSelectCategory}
            />
          </div>
        )}

        {/* VIEW 2: CATEGORY DETAIL TAB (matches Image 7.jpeg) */}
        {selectedCategoryId !== null && currentTab !== 'pedidos' && currentTab !== 'admin' && (
          <CategoryView
            category={activeCategory}
            allCategories={categories}
            allProducts={products}
            cartItems={cartItems}
            searchQuery={searchQuery}
            onBackToCatalog={handleBackToCatalog}
            onSelectCategory={(catId) => {
              setSelectedCategoryId(catId);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onAddToCart={handleAddToCart}
            onUpdateCartQty={handleUpdateProductQtyFromCard}
            onOpenFicha={(prod) => setFichaProduct(prod)}
          />
        )}

        {/* VIEW 3: MIS PEDIDOS */}
        {currentTab === 'pedidos' && (
          <OrdersView
            orders={orders}
            cartItems={cartItems}
            onReorder={handleReorder}
            onExploreCatalog={() => {
              setCurrentTab('inicio');
              setSelectedCategoryId(null);
              setTimeout(() => {
                document.getElementById('catalogo-distribucion')?.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }}
            onClearCart={handleClearCart}
            onOrderPlaced={handleOrderPlaced}
          />
        )}

        {/* VIEW 4: ADMIN (Clave secreta: Valentina 1010) */}
        {currentTab === 'admin' && (
          <AdminView
            products={products}
            categories={categories}
            branding={branding}
            onUpdateBranding={(newBranding) => setBranding(newBranding)}
            onUpdateProducts={(newProducts) => setProducts(newProducts)}
            onUpdateCategories={(newCategories) => setCategories(newCategories)}
            onToggleStock={handleToggleStock}
            onExitAdmin={() => {
              setCurrentTab('inicio');
              setSelectedCategoryId(null);
            }}
          />
        )}
      </main>

      {/* Bottom Navigation Bar */}
      <BottomNav
        currentTab={currentTab}
        onTabChange={handleTabChange}
        ordersBadgeCount={orders.length}
      />

      {/* Cart Drawer with Solicitante and Quantity focus */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateCartQty}
        onClearCart={handleClearCart}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* Ficha Técnica Modal */}
      <FichaTecnicaModal
        product={fichaProduct}
        onClose={() => setFichaProduct(null)}
      />
    </div>
  );
}
