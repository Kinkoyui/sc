import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import AiAssistant from './components/AiAssistant';
import CartSidebar from './components/CartSidebar';
import ProductCard from './components/ProductCard';
import { CartProvider, useCart, HashRouter as Router, Routes, Route, Link, useParams } from './context/CartContext';
import { PRODUCTS } from './constants';
import { Category } from './types';
import { ArrowRight, Search, Filter } from 'lucide-react';

// --- Page Components Defined Locally for Structure Simplicity ---

// 1. Home Page
const HomePage: React.FC = () => {
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden bg-white">
        {/* Abstract Background */}
        <div className="absolute inset-0 bg-pink-50">
          <div className="absolute inset-0 bg-[url('https://picsum.photos/1920/1080?blur=10')] opacity-10 bg-cover bg-center mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
          <div className="absolute -top-[20%] -left-[10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold text-slate-800 tracking-tight drop-shadow-sm">
            升级你的 <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-500">二次元生活</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            精品手办、服饰和稀有收藏品的终极目的地。漫迷精选，为漫迷而生。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/shop" className="px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-full font-bold transition-all hover:shadow-lg hover:shadow-primary/25 flex items-center gap-2">
              开始购物 <ArrowRight size={20} />
            </Link>
            <Link to="/shop" className="px-8 py-3 bg-white hover:bg-pink-50 text-slate-700 border border-pink-200 rounded-full font-bold transition-all shadow-sm">
              查看新品
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-2">
          <span className="w-2 h-8 bg-primary rounded-full" /> 按分类浏览
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: Category.FIGURES, img: 'https://picsum.photos/300/300?random=10' },
            { name: Category.APPAREL, img: 'https://picsum.photos/300/300?random=11' },
            { name: Category.ACCESSORIES, img: 'https://picsum.photos/300/300?random=12' },
            { name: Category.MANGA, img: 'https://picsum.photos/300/300?random=13' },
          ].map((cat, idx) => (
            <Link to={`/shop?category=${cat.name}`} key={idx} className="group relative h-48 rounded-2xl overflow-hidden cursor-pointer border border-pink-100 shadow-sm hover:shadow-md transition-all">
              <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-4">
                <span className="text-xl font-bold text-white group-hover:text-pink-200 transition-colors">{cat.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
              <span className="w-2 h-8 bg-primary rounded-full" /> 时下流行
            </h2>
            <Link to="/shop" className="text-primary hover:text-secondary transition-colors flex items-center gap-1 font-medium">
                查看全部 <ArrowRight size={16} />
            </Link>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(p => <ProductCard key={p.id} product={p} />)}
         </div>
      </section>
    </div>
  );
};

// 2. Shop Page
const ShopPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Basic filtering
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
        const matchesCategory = selectedCategory === '全部' || p.category === selectedCategory;
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">商品列表</h1>
          <p className="text-slate-500">发现你最爱的动漫装备</p>
        </div>
        
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4">
           {/* Search */}
           <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="搜索..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-pink-100 rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-pink-100 w-full sm:w-64 transition-all shadow-sm"
              />
           </div>
           
           {/* Filter */}
           <div className="relative group">
              <div className="flex items-center gap-2 bg-white border border-pink-100 px-4 py-2 rounded-lg text-slate-700 cursor-pointer hover:border-primary transition-colors shadow-sm">
                <Filter size={18} />
                <span>{selectedCategory}</span>
              </div>
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-pink-100 rounded-lg shadow-xl overflow-hidden hidden group-hover:block z-20">
                 {['全部', ...Object.values(Category)].map(cat => (
                    <button 
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-pink-50 hover:text-primary transition-colors ${selectedCategory === cat ? 'bg-pink-50 text-primary font-bold' : 'text-slate-600'}`}
                    >
                        {cat}
                    </button>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <div className="text-center py-20">
            <p className="text-xl text-slate-400">没有找到匹配的商品。</p>
            <button onClick={() => {setSelectedCategory('全部'); setSearchTerm('')}} className="mt-4 text-primary hover:underline">清除筛选</button>
        </div>
      )}
    </div>
  );
};

// 3. Product Detail Page
const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const product = PRODUCTS.find(p => p.id === id);
    const { addToCart } = useCart();

    if (!product) return <div className="text-center py-20 text-slate-500">未找到该商品。</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
            <div className="bg-white rounded-3xl border border-pink-100 overflow-hidden shadow-lg shadow-pink-100/50">
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                    {/* Image */}
                    <div className="relative aspect-square md:aspect-auto bg-pink-50">
                         <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    
                    {/* Info */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <span className="text-primary font-bold uppercase tracking-wider text-sm mb-2">{product.category}</span>
                        <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4">{product.name}</h1>
                        <div className="flex items-center gap-4 mb-6">
                            <span className="text-3xl font-bold text-primary">${product.price.toFixed(2)}</span>
                            <div className="flex items-center gap-1 bg-pink-50 px-3 py-1 rounded-full">
                                <span className="text-yellow-400">★</span>
                                <span className="text-slate-800 font-bold">{product.rating}</span>
                                <span className="text-slate-500 text-sm ml-1">(128 条评价)</span>
                            </div>
                        </div>
                        
                        <p className="text-slate-600 leading-relaxed text-lg mb-8">
                            {product.description}
                        </p>
                        
                        <div className="flex gap-4">
                            <button 
                                onClick={() => addToCart(product)}
                                className="flex-1 bg-primary hover:bg-primary/90 text-white py-4 rounded-xl font-bold text-lg transition-all hover:shadow-lg hover:shadow-primary/25 active:scale-95"
                            >
                                加入购物车
                            </button>
                            <button className="px-6 py-4 border border-pink-200 rounded-xl hover:bg-pink-50 text-slate-600 transition-colors">
                                <span className="text-2xl">♥</span>
                            </button>
                        </div>
                        
                        <div className="mt-8 pt-8 border-t border-pink-50 grid grid-cols-2 gap-4 text-sm text-slate-500">
                             <div>
                                 <span className="block text-slate-800 font-bold mb-1">正品保证</span>
                                 100% 官方正版
                             </div>
                             <div>
                                 <span className="block text-slate-800 font-bold mb-1">物流配送</span>
                                 全球发货
                             </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Related items suggestion (simple impl) */}
            <div className="mt-16">
                 <h3 className="text-2xl font-bold text-slate-800 mb-6">猜你喜欢</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                     {PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4).map(p => (
                         <ProductCard key={p.id} product={p} />
                     ))}
                 </div>
            </div>
        </div>
    );
};

// Main Layout
const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-rose-50/50 text-slate-700 font-sans selection:bg-pink-200 selection:text-primary">
       <Navbar />
       <main>
           <Routes>
               <Route path="/" element={<HomePage />} />
               <Route path="/shop" element={<ShopPage />} />
               <Route path="/product/:id" element={<ProductDetailPage />} />
           </Routes>
       </main>
       
       <CartSidebar />
       <AiAssistant />
       
       {/* Footer */}
       <footer className="bg-white border-t border-pink-100 py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
             <div className="mb-6">
                 <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-500">
                   AniMoe
                 </span>
             </div>
             <p className="text-slate-500 mb-8">© 2024 AniMoe 动漫社. 保留所有权利。为漫迷而生。</p>
             <div className="flex justify-center gap-6 text-slate-400">
                 <a href="#" className="hover:text-primary transition-colors">Twitter</a>
                 <a href="#" className="hover:text-primary transition-colors">Instagram</a>
                 <a href="#" className="hover:text-primary transition-colors">Discord</a>
             </div>
          </div>
       </footer>
    </div>
  );
};

// Root App Component
const App: React.FC = () => {
  return (
    <CartProvider>
      <Router>
        <Layout />
      </Router>
    </CartProvider>
  );
};

export default App;