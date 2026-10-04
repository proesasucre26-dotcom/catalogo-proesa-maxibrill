import React, { useState } from 'react';
import { Product, Category, AppBranding } from '../types';
import { 
  ShieldCheck, Lock, LogOut, Image, Package, Layers, Plus, 
  Trash2, Edit, Check, Eye, EyeOff, Upload, RefreshCw, X 
} from 'lucide-react';

interface AdminViewProps {
  products: Product[];
  categories: Category[];
  branding: AppBranding;
  onUpdateBranding: (branding: AppBranding) => void;
  onUpdateProducts: (products: Product[]) => void;
  onUpdateCategories: (categories: Category[]) => void;
  onToggleStock: (productId: string) => void;
  onExitAdmin: () => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  products,
  categories,
  branding,
  onUpdateBranding,
  onUpdateProducts,
  onUpdateCategories,
  onToggleStock,
  onExitAdmin
}) => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('proesa_admin_auth') === 'true';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState(false);

  // Active admin tab
  const [activeTab, setActiveTab] = useState<'logos' | 'productos' | 'categorias'>('logos');
  const [notification, setNotification] = useState<string | null>(null);

  // Logo form state
  const [logoPrincipal, setLogoPrincipal] = useState(branding.logoPrincipal);
  const [logoSecundario, setLogoSecundario] = useState(branding.logoSecundario);

  // Product modal / editing state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [searchProductQuery, setSearchProductQuery] = useState('');

  // Category modal / editing state
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isNewCategory, setIsNewCategory] = useState(false);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Login handler with secret key "Valentina 1010"
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanInput = passwordInput.trim();
    // Clave secreta: Valentina 1010
    if (cleanInput.toLowerCase() === 'valentina 1010') {
      setIsAuthenticated(true);
      sessionStorage.setItem('proesa_admin_auth', 'true');
      setAuthError(false);
      setPasswordInput('');
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('proesa_admin_auth');
  };

  // Handle image upload from file reader
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>, target: 'principal' | 'secundario' | 'product' | 'category') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (target === 'principal') {
        setLogoPrincipal(result);
      } else if (target === 'secundario') {
        setLogoSecundario(result);
      } else if (target === 'product' && editingProduct) {
        setEditingProduct({ ...editingProduct, imageUrl: result });
      } else if (target === 'category' && editingCategory) {
        setEditingCategory({ ...editingCategory, imageUrl: result });
      }
    };
    reader.readAsDataURL(file);
  };

  // Save Logos
  const handleSaveLogos = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateBranding({
      ...branding,
      logoPrincipal,
      logoSecundario
    });
    showNotification('¡Logos actualizados exitosamente!');
  };

  const handleResetLogos = () => {
    setLogoPrincipal('/1.png');
    setLogoSecundario('/2.png');
    onUpdateBranding({
      ...branding,
      logoPrincipal: '/1.png',
      logoSecundario: '/2.png'
    });
    showNotification('Logos restablecidos a los valores por defecto');
  };

  // Save product
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    if (isNewProduct) {
      onUpdateProducts([editingProduct, ...products]);
      showNotification(`Producto "${editingProduct.name}" agregado con éxito.`);
    } else {
      onUpdateProducts(
        products.map((p) => (p.id === editingProduct.id ? editingProduct : p))
      );
      showNotification(`Producto "${editingProduct.name}" actualizado.`);
    }

    setEditingProduct(null);
    setIsNewProduct(false);
  };

  // Delete product
  const handleDeleteProduct = (id: string, name: string) => {
    if (confirm(`¿Estás seguro de eliminar el producto "${name}"?`)) {
      onUpdateProducts(products.filter((p) => p.id !== id));
      showNotification(`Producto eliminado.`);
    }
  };

  // Open product editor
  const handleOpenAddProduct = () => {
    const newProd: Product = {
      id: `prod-${Date.now()}`,
      sku: `CÓD: PRO-${Math.floor(100 + Math.random() * 900)}`,
      name: '',
      shortDescription: '',
      categoryId: categories[0]?.id || 'desinfectantes',
      brand: 'PROESA',
      imageUrl: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=500&auto=format&fit=crop&q=80',
      defaultPresentation: '1 Litro',
      presentations: [
        { name: '1 Litro', volume: '1L', price: 25, wholesalePrice: 20 },
        { name: 'Galón (3.8 Litros)', volume: '3.8L', price: 75, wholesalePrice: 60 }
      ],
      price: 25,
      inStock: true,
      stockCount: 100,
      technicalSheet: {
        activePrinciple: '',
        concentration: '',
        ph: '7.0',
        dilution: 'Uso directo o dilución 1:20',
        applications: ['Pisos y superficies de alto contacto'],
        precautions: ['Mantener fuera del alcance de los niños']
      }
    };
    setEditingProduct(newProd);
    setIsNewProduct(true);
  };

  // Save category
  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;

    if (isNewCategory) {
      onUpdateCategories([...categories, editingCategory]);
      showNotification(`Categoría "${editingCategory.name}" agregada.`);
    } else {
      onUpdateCategories(
        categories.map((c) => (c.id === editingCategory.id ? editingCategory : c))
      );
      showNotification(`Categoría "${editingCategory.name}" actualizada.`);
    }

    setEditingCategory(null);
    setIsNewCategory(false);
  };

  // Delete category
  const handleDeleteCategory = (id: string, name: string) => {
    if (confirm(`¿Estás seguro de eliminar la categoría "${name}"?`)) {
      onUpdateCategories(categories.filter((c) => c.id !== id));
      showNotification(`Categoría eliminada.`);
    }
  };

  // Open category editor
  const handleOpenAddCategory = () => {
    const newCat: Category = {
      id: `cat-${Date.now()}`,
      name: '',
      titleWithAccent: '',
      countLabel: '10 Prod.',
      referenceCount: 10,
      badgeColor: 'red',
      imageUrl: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?w=600&auto=format&fit=crop&q=80',
      description: '',
      subcategories: ['Todos']
    };
    setEditingCategory(newCat);
    setIsNewCategory(true);
  };

  // ==========================================
  // VIEW: LOCK SCREEN IF NOT AUTHENTICATED
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="py-12 px-4 max-w-sm mx-auto">
        <div className="bg-white border-2 border-[#000000] rounded-2xl p-6 shadow-[4px_4px_0px_#000000] space-y-4">
          <div className="w-14 h-14 bg-[#FFF0F0] border border-[#FFD0D0] rounded-full flex items-center justify-center mx-auto text-[#C4272B]">
            <Lock className="w-7 h-7" />
          </div>

          <div className="text-center">
            <h2 className="font-display font-black text-lg text-[#1A1C1C]">
              Acceso Exclusivo de Administrador
            </h2>
            <p className="text-xs text-[#555555] mt-1">
              Ingresa la clave secreta de administración para gestionar productos, características, categorías y logotipos.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-3 pt-2">
            <div>
              <label className="text-[11px] font-bold uppercase text-[#555555] block mb-1">
                Clave Secreta de Ingreso
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (authError) setAuthError(false);
                  }}
                  placeholder="Introduce la clave secreta..."
                  className="w-full pl-3 pr-10 py-2.5 text-sm bg-white border border-[#000000] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C4272B]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-3 text-[#737373] hover:text-[#1A1C1C]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {authError && (
              <div className="p-2.5 bg-rose-50 border border-rose-300 rounded-lg text-rose-700 text-xs font-semibold">
                ⚠️ Clave incorrecta. Solo el administrador autorizado puede acceder.
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-[#C4272B] hover:bg-[#A9171E] active:scale-98 text-white font-bold text-sm rounded-lg shadow-[2px_2px_0px_#000000] cursor-pointer transition-all"
            >
              Ingresar al Panel
            </button>

            <button
              type="button"
              onClick={onExitAdmin}
              className="w-full py-2 text-xs text-[#737373] hover:text-[#1A1C1C] hover:underline transition-colors"
            >
              ← Volver al Catálogo
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW: AUTHENTICATED ADMIN PANEL
  // ==========================================
  return (
    <div className="space-y-5 pb-16">
      {/* Top Banner with Logout */}
      <div className="bg-[#1A1C1C] text-white p-4 rounded-xl flex items-center justify-between border-2 border-[#000000] shadow-[2px_2px_0px_#000000]">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-[#C4272B] text-white flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-[#FF9E9E] uppercase tracking-wider">
              Acceso Autorizado · Administrador
            </div>
            <h1 className="font-display font-black text-base sm:text-lg text-white">
              Gestión Integral PROESA
            </h1>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">Cerrar Sesión</span>
        </button>
      </div>

      {notification && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-lg text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <Check className="w-4 h-4 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      {/* Admin Tabs */}
      <div className="flex border-b border-[#E5E5E5] gap-1 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => setActiveTab('logos')}
          className={`px-3 py-2 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'logos'
              ? 'bg-[#C4272B] text-white shadow-xs'
              : 'text-[#555555] hover:text-[#1A1C1C] hover:bg-[#F3F3F4]'
          }`}
        >
          <Image className="w-4 h-4" />
          <span>Logos Principal & Secundario</span>
        </button>

        <button
          onClick={() => setActiveTab('productos')}
          className={`px-3 py-2 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'productos'
              ? 'bg-[#C4272B] text-white shadow-xs'
              : 'text-[#555555] hover:text-[#1A1C1C] hover:bg-[#F3F3F4]'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Productos ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('categorias')}
          className={`px-3 py-2 text-xs font-bold rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap ${
            activeTab === 'categorias'
              ? 'bg-[#C4272B] text-white shadow-xs'
              : 'text-[#555555] hover:text-[#1A1C1C] hover:bg-[#F3F3F4]'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Categorías ({categories.length})</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1: GESTIÓN DE LOGOS (PRINCIPAL Y SECUNDARIO) */}
      {/* ======================================================== */}
      {activeTab === 'logos' && (
        <form onSubmit={handleSaveLogos} className="space-y-4">
          <div className="bg-white border-2 border-[#000000] rounded-xl p-4 sm:p-5 shadow-[3px_3px_0px_#000000] space-y-4">
            <div>
              <h2 className="font-display font-black text-sm sm:text-base text-[#1A1C1C] uppercase">
                Imágenes Corporativas y Logos
              </h2>
              <p className="text-xs text-[#555555] mt-0.5">
                Sube o enlaza las imágenes para el logotipo principal (cabecera) y el logotipo secundario (rectángulo de la pantalla principal).
              </p>
            </div>

            {/* 1. Logo Principal (Cuadrada) */}
            <div className="p-4 bg-[#FBFBFB] border border-[#E5E5E5] rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-sm text-[#1A1C1C]">
                    1. Logo Principal (Imagen cuadrada - Cabecera)
                  </h3>
                  <p className="text-[11px] text-[#737373]">
                    Se muestra en la esquina superior izquierda de la cabecera junto al nombre.
                  </p>
                </div>
                <span className="text-[10px] font-bold bg-[#C4272B] text-white px-2 py-0.5 rounded-sm uppercase">
                  Cuadrado 1:1
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                {/* Preview */}
                <div className="w-20 h-20 bg-white border-2 border-[#000000] rounded-xl p-1 shrink-0 flex items-center justify-center overflow-hidden shadow-2xs">
                  <img
                    src={logoPrincipal}
                    alt="Vista previa Logo Principal"
                    className="w-full h-full object-contain"
                    onError={(e) => { e.currentTarget.src = '/1.png'; }}
                  />
                </div>

                <div className="flex-1 space-y-2 w-full">
                  <div>
                    <label className="text-[11px] font-bold text-[#555555] block mb-1">
                      Subir archivo desde el dispositivo:
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageFileUpload(e, 'principal')}
                      className="text-xs text-[#555555] file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-[#1A1C1C] file:text-white hover:file:bg-[#333333] cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#555555] block mb-1">
                      O ingresar enlace URL directo:
                    </label>
                    <input
                      type="text"
                      value={logoPrincipal}
                      onChange={(e) => setLogoPrincipal(e.target.value)}
                      placeholder="https://... o /1.png"
                      className="w-full px-3 py-1.5 text-xs bg-white border border-[#CCCCCC] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C4272B]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Logo Secundario (Rectangular) */}
            <div className="p-4 bg-[#FBFBFB] border border-[#E5E5E5] rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display font-bold text-sm text-[#1A1C1C]">
                    2. Logo Secundario (Imagen rectangular - Banner de inicio)
                  </h3>
                  <p className="text-[11px] text-[#737373]">
                    Se muestra en el rectángulo central de la pantalla principal.
                  </p>
                </div>
                <span className="text-[10px] font-bold bg-[#000000] text-white px-2 py-0.5 rounded-sm uppercase">
                  Rectangular
                </span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                {/* Preview */}
                <div className="w-36 h-20 bg-white border-2 border-[#000000] rounded-xl p-2 shrink-0 flex items-center justify-center overflow-hidden shadow-2xs">
                  <img
                    src={logoSecundario}
                    alt="Vista previa Logo Secundario"
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => { e.currentTarget.src = '/2.png'; }}
                  />
                </div>

                <div className="flex-1 space-y-2 w-full">
                  <div>
                    <label className="text-[11px] font-bold text-[#555555] block mb-1">
                      Subir archivo desde el dispositivo:
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageFileUpload(e, 'secundario')}
                      className="text-xs text-[#555555] file:mr-2 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-bold file:bg-[#1A1C1C] file:text-white hover:file:bg-[#333333] cursor-pointer"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-[#555555] block mb-1">
                      O ingresar enlace URL directo:
                    </label>
                    <input
                      type="text"
                      value={logoSecundario}
                      onChange={(e) => setLogoSecundario(e.target.value)}
                      placeholder="https://... o /2.png"
                      className="w-full px-3 py-1.5 text-xs bg-white border border-[#CCCCCC] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C4272B]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={handleResetLogos}
                className="px-3 py-2 text-xs font-semibold text-[#737373] hover:text-[#1A1C1C] border border-[#CCCCCC] hover:border-[#000000] rounded-lg flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Restablecer Originales</span>
              </button>

              <button
                type="submit"
                className="px-5 py-2.5 bg-[#C4272B] hover:bg-[#A9171E] active:scale-98 text-white font-bold text-xs sm:text-sm rounded-lg shadow-[2px_2px_0px_#000000] cursor-pointer transition-all"
              >
                Guardar Cambios de Logos
              </button>
            </div>
          </div>
        </form>
      )}

      {/* ======================================================== */}
      {/* TAB 2: GESTIÓN DE PRODUCTOS */}
      {/* ======================================================== */}
      {activeTab === 'productos' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="font-display font-black text-base text-[#1A1C1C]">
                Catálogo de Productos ({products.length})
              </h2>
              <p className="text-xs text-[#555555]">
                Agrega, edita características, nombres, imágenes y códigos de los productos.
              </p>
            </div>

            <button
              onClick={handleOpenAddProduct}
              className="px-3.5 py-2 bg-[#C4272B] hover:bg-[#A9171E] text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-[2px_2px_0px_#000000] transition-all cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Producto</span>
            </button>
          </div>

          {/* Search box for products */}
          <input
            type="text"
            value={searchProductQuery}
            onChange={(e) => setSearchProductQuery(e.target.value)}
            placeholder="Filtrar por nombre o SKU..."
            className="w-full px-3 py-2 text-xs bg-white border border-[#000000] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C4272B]"
          />

          {/* Product list */}
          <div className="bg-white border-2 border-[#000000] rounded-xl overflow-hidden shadow-[2px_2px_0px_#000000] divide-y divide-[#E5E5E5] max-h-[500px] overflow-y-auto">
            {products
              .filter(
                (p) =>
                  p.name.toLowerCase().includes(searchProductQuery.toLowerCase()) ||
                  p.sku.toLowerCase().includes(searchProductQuery.toLowerCase())
              )
              .map((product) => (
                <div
                  key={product.id}
                  className="p-3 flex items-center justify-between gap-3 hover:bg-[#FAFAFA]"
                >
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-12 h-12 object-contain rounded-md border border-[#E5E5E5] bg-white p-1 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-bold text-[11px] text-[#C4272B] tnum">
                        {product.sku}
                      </span>
                      <span className="text-[10px] font-bold text-gray-500 uppercase">
                        {product.brand}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-xs sm:text-sm text-[#1A1C1C] truncate">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-[10px] font-bold text-[#C4272B] bg-[#FFF0F0] px-1.5 py-0.5 rounded-sm">
                        {product.defaultPresentation || '1 Litro'}
                      </span>
                      <p className="text-[11px] text-[#737373] truncate">
                        {product.shortDescription || 'Sin características'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => onToggleStock(product.id)}
                      className={`px-2 py-1 text-[10px] font-bold rounded-md transition-colors cursor-pointer ${
                        product.inStock
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {product.inStock ? 'Stock' : 'Agotado'}
                    </button>

                    <button
                      onClick={() => {
                        setEditingProduct({ ...product });
                        setIsNewProduct(false);
                      }}
                      className="p-1.5 border border-[#CCCCCC] hover:border-[#000000] text-[#1A1C1C] rounded-md hover:bg-white cursor-pointer"
                      title="Editar producto"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => handleDeleteProduct(product.id, product.name)}
                      className="p-1.5 text-gray-400 hover:text-red-600 rounded-md cursor-pointer"
                      title="Eliminar producto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3: GESTIÓN DE CATEGORÍAS */}
      {/* ======================================================== */}
      {activeTab === 'categorias' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-2">
            <div>
              <h2 className="font-display font-black text-base text-[#1A1C1C]">
                Categorías de Distribución ({categories.length})
              </h2>
              <p className="text-xs text-[#555555]">
                Organiza las líneas de producto en la pantalla principal.
              </p>
            </div>

            <button
              onClick={handleOpenAddCategory}
              className="px-3.5 py-2 bg-[#C4272B] hover:bg-[#A9171E] text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-[2px_2px_0px_#000000] transition-all cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Nueva Categoría</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="bg-white border-2 border-[#000000] rounded-xl p-3.5 shadow-[2px_2px_0px_#000000] flex gap-3 items-center justify-between"
              >
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="w-14 h-14 object-contain rounded-md border border-[#E5E5E5] bg-[#F9F9F9] p-1 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-[#C4272B] block">
                    {cat.countLabel}
                  </span>
                  <h3 className="font-display font-bold text-xs sm:text-sm text-[#1A1C1C] truncate">
                    {cat.name}
                  </h3>
                  <p className="text-[11px] text-[#555555] line-clamp-1">
                    {cat.description}
                  </p>
                </div>

                <div className="flex flex-col gap-1 shrink-0">
                  <button
                    onClick={() => {
                      setEditingCategory({ ...cat });
                      setIsNewCategory(false);
                    }}
                    className="p-1.5 border border-[#CCCCCC] hover:border-[#000000] rounded-md text-[#1A1C1C] hover:bg-white cursor-pointer"
                    title="Editar categoría"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => handleDeleteCategory(cat.id, cat.name)}
                    className="p-1.5 text-gray-400 hover:text-red-600 rounded-md cursor-pointer"
                    title="Eliminar categoría"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: EDITAR / CREAR PRODUCTO */}
      {/* ======================================================== */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-2xs overflow-y-auto">
          <div className="relative bg-white w-full max-w-lg rounded-2xl border-2 border-[#000000] shadow-[4px_4px_0px_#000000] max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="bg-[#1A1C1C] text-white p-3.5 flex items-center justify-between border-b border-[#000000]">
              <h3 className="font-display font-bold text-sm sm:text-base">
                {isNewProduct ? '➕ Agregar Nuevo Producto' : `✏️ Editar Producto: ${editingProduct.sku}`}
              </h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProduct} className="p-4 overflow-y-auto space-y-3 text-xs">
              {/* Product Image */}
              <div className="p-3 bg-[#F9F9F9] rounded-xl border border-[#E5E5E5] space-y-2">
                <span className="font-bold text-[#1A1C1C] uppercase text-[10px] block">
                  Imagen del Producto:
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-white border border-[#000000] rounded-lg p-1 shrink-0 flex items-center justify-center">
                    <img
                      src={editingProduct.imageUrl}
                      alt="Preview"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageFileUpload(e, 'product')}
                      className="text-xs text-[#555555] file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[11px] file:font-bold file:bg-[#1A1C1C] file:text-white"
                    />
                    <input
                      type="text"
                      value={editingProduct.imageUrl}
                      onChange={(e) => setEditingProduct({ ...editingProduct, imageUrl: e.target.value })}
                      placeholder="O URL directa de imagen"
                      className="w-full px-2 py-1 text-xs border border-[#CCCCCC] rounded-md"
                    />
                  </div>
                </div>
              </div>

              {/* Basic Fields */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-[#444444] block mb-0.5">Nombre del Producto *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    placeholder="Ej. Desinfectante Pino Concentrado"
                    className="w-full px-2.5 py-1.5 border border-[#000000] rounded-md font-semibold"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#444444] block mb-0.5">Código / SKU *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.sku}
                    onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                    placeholder="Ej. CÓD: PRO-AMO-501"
                    className="w-full px-2.5 py-1.5 border border-[#000000] rounded-md text-[#C4272B] font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-[#444444] block mb-0.5">Categoría *</label>
                  <select
                    value={editingProduct.categoryId}
                    onChange={(e) => setEditingProduct({ ...editingProduct, categoryId: e.target.value })}
                    className="w-full px-2.5 py-1.5 border border-[#CCCCCC] rounded-md bg-white font-medium"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#444444] block mb-0.5">Marca</label>
                  <select
                    value={editingProduct.brand}
                    onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value as any })}
                    className="w-full px-2.5 py-1.5 border border-[#CCCCCC] rounded-md bg-white font-medium"
                  >
                    <option value="PROESA">PROESA</option>
                    <option value="MAXI BRILL">MAXI BRILL</option>
                  </select>
                </div>
              </div>

              {/* Presentación (Texto Botón Rojo que cambia el admin) */}
              <div className="bg-[#FFF5F5] p-2.5 rounded-lg border border-[#FFD0D0]">
                <label className="font-bold text-[#C4272B] block mb-1">
                  Presentación (Texto del Botón Rojo) *
                </label>
                <input
                  type="text"
                  required
                  value={editingProduct.defaultPresentation || ''}
                  onChange={(e) => {
                    const val = e.target.value;
                    setEditingProduct({
                      ...editingProduct,
                      defaultPresentation: val,
                      presentations: [{ name: val, volume: val, price: 0 }]
                    });
                  }}
                  placeholder="Ej. 1 Litro, 500 ml, Galón 3.8L, Bidón 20L..."
                  className="w-full px-2.5 py-1.5 border border-[#000000] rounded-md font-bold text-[#C4272B] bg-white"
                />
                <span className="text-[10px] text-[#737373] mt-1 block">
                  Este texto se mostrará directamente en el botón rojo de presentación en la ventana de categorías.
                </span>
              </div>

              {/* Características del Producto */}
              <div className="border-t border-[#E5E5E5] pt-2 space-y-2">
                <span className="font-display font-bold text-[#1A1C1C] uppercase text-[11px] block">
                  Características y Especificaciones Técnicas
                </span>

                <div>
                  <label className="font-bold text-[#555555] block mb-0.5">Descripción de Uso / Características Breves</label>
                  <textarea
                    rows={2}
                    value={editingProduct.shortDescription}
                    onChange={(e) => setEditingProduct({ ...editingProduct, shortDescription: e.target.value })}
                    placeholder="Desinfección de pisos, superficies, etc."
                    className="w-full px-2.5 py-1.5 border border-[#CCCCCC] rounded-md"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-[#555555] block mb-0.5">Principio Activo</label>
                    <input
                      type="text"
                      value={editingProduct.technicalSheet.activePrinciple}
                      onChange={(e) => setEditingProduct({
                        ...editingProduct,
                        technicalSheet: { ...editingProduct.technicalSheet, activePrinciple: e.target.value }
                      })}
                      placeholder="Ej. Amonio Cuaternario 5ta Gen"
                      className="w-full px-2 py-1 border border-[#CCCCCC] rounded-md"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#555555] block mb-0.5">Nivel de pH</label>
                    <input
                      type="text"
                      value={editingProduct.technicalSheet.ph}
                      onChange={(e) => setEditingProduct({
                        ...editingProduct,
                        technicalSheet: { ...editingProduct.technicalSheet, ph: e.target.value }
                      })}
                      placeholder="Ej. 7.0 ± 0.5"
                      className="w-full px-2 py-1 border border-[#CCCCCC] rounded-md"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-[#555555] block mb-0.5">Modo de Dilución / Dosificación</label>
                  <input
                    type="text"
                    value={editingProduct.technicalSheet.dilution}
                    onChange={(e) => setEditingProduct({
                      ...editingProduct,
                      technicalSheet: { ...editingProduct.technicalSheet, dilution: e.target.value }
                    })}
                    placeholder="Ej. 8 ml por Litro de agua"
                    className="w-full px-2 py-1 border border-[#CCCCCC] rounded-md"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E5E5E5]">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-3 py-1.5 text-xs text-[#555555] hover:text-[#1A1C1C]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#C4272B] hover:bg-[#A9171E] text-white font-bold rounded-lg shadow-sm"
                >
                  Guardar Producto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* MODAL: EDITAR / CREAR CATEGORÍA */}
      {/* ======================================================== */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-2xs">
          <div className="relative bg-white w-full max-w-md rounded-2xl border-2 border-[#000000] shadow-[4px_4px_0px_#000000] flex flex-col overflow-hidden">
            <div className="bg-[#1A1C1C] text-white p-3.5 flex items-center justify-between border-b border-[#000000]">
              <h3 className="font-display font-bold text-sm sm:text-base">
                {isNewCategory ? '➕ Nueva Categoría' : `✏️ Editar Categoría: ${editingCategory.name}`}
              </h3>
              <button
                onClick={() => setEditingCategory(null)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="p-4 space-y-3 text-xs">
              <div>
                <label className="font-bold text-[#444444] block mb-0.5">Nombre de la Categoría *</label>
                <input
                  type="text"
                  required
                  value={editingCategory.name}
                  onChange={(e) => setEditingCategory({
                    ...editingCategory,
                    name: e.target.value,
                    titleWithAccent: editingCategory.titleWithAccent || e.target.value
                  })}
                  placeholder="Ej. Desinfectantes"
                  className="w-full px-2.5 py-1.5 border border-[#000000] rounded-md font-semibold"
                />
              </div>

              <div>
                <label className="font-bold text-[#444444] block mb-0.5">Etiqueta de Contador *</label>
                <input
                  type="text"
                  required
                  value={editingCategory.countLabel}
                  onChange={(e) => setEditingCategory({ ...editingCategory, countLabel: e.target.value })}
                  placeholder="Ej. 42 Prod."
                  className="w-full px-2.5 py-1.5 border border-[#CCCCCC] rounded-md"
                />
              </div>

              <div>
                <label className="font-bold text-[#444444] block mb-0.5">Descripción Breve</label>
                <textarea
                  rows={2}
                  value={editingCategory.description}
                  onChange={(e) => setEditingCategory({ ...editingCategory, description: e.target.value })}
                  placeholder="Amonios cuaternarios, pino concentrado..."
                  className="w-full px-2.5 py-1.5 border border-[#CCCCCC] rounded-md"
                />
              </div>

              <div>
                <label className="font-bold text-[#444444] block mb-0.5">Imagen de la Categoría</label>
                <div className="flex items-center gap-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageFileUpload(e, 'category')}
                    className="text-xs file:py-1 file:px-2 file:rounded file:border-0 file:bg-[#1A1C1C] file:text-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E5E5E5]">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
                  className="px-3 py-1.5 text-xs text-[#555555]"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#C4272B] hover:bg-[#A9171E] text-white font-bold rounded-lg shadow-sm"
                >
                  Guardar Categoría
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
