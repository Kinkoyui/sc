import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '../types';
import { useCart, Link } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-2xl border border-pink-100 overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-pink-200/50 flex flex-col">
      <Link to={`/product/${product.id}`} className="relative overflow-hidden aspect-square block">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-md px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <Star size={12} className="text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-bold text-slate-800">{product.rating}</span>
        </div>
      </Link>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="mb-2">
          <span className="text-xs font-bold text-primary uppercase tracking-wider">{product.category}</span>
          <Link to={`/product/${product.id}`}>
            <h3 className="text-lg font-bold text-slate-800 group-hover:text-primary transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>
        </div>
        
        <p className="text-slate-500 text-sm mb-4 line-clamp-2 flex-1">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-pink-50">
          <span className="text-xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-2 bg-pink-50 hover:bg-primary text-primary hover:text-white px-4 py-2 rounded-lg transition-all font-medium text-sm group-active:scale-95"
          >
            <ShoppingCart size={16} />
            添加
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;