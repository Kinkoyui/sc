import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product, CartItem } from '../types';

// --- Simple Router Implementation ---
const RouterContext = createContext<{ pathname: string; navigate: (path: string) => void }>({ pathname: '/', navigate: () => {} });
const RouteParamsContext = createContext<Record<string, string>>({});

export const HashRouter: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [fullPath, setFullPath] = useState(window.location.hash.slice(1) || '/');

  useEffect(() => {
    const handler = () => {
      setFullPath(window.location.hash.slice(1) || '/');
    };
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  const navigate = (newPath: string) => {
    window.location.hash = newPath;
  };

  const pathname = fullPath.split('?')[0];

  return (
    <RouterContext.Provider value={{ pathname, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useLocation = () => {
  const { pathname } = useContext(RouterContext);
  return { pathname };
};

export const useParams = <T extends Record<string, string>>() => {
  return useContext(RouteParamsContext) as T;
};

export const Link: React.FC<{ to: string; className?: string; children: ReactNode; onClick?: () => void }> = ({ to, className, children, onClick }) => {
  return (
    <a href={`#${to}`} className={className} onClick={onClick}>
      {children}
    </a>
  );
};

const matchPath = (pattern: string, pathname: string) => {
    if (pattern === pathname) return {};
    const patternParts = pattern.split('/').filter(Boolean);
    const pathParts = pathname.split('/').filter(Boolean);
    if (patternParts.length !== pathParts.length) return null;
    const params: Record<string, string> = {};
    for (let i = 0; i < patternParts.length; i++) {
        if (patternParts[i].startsWith(':')) {
            params[patternParts[i].slice(1)] = pathParts[i];
        } else if (patternParts[i] !== pathParts[i]) {
            return null;
        }
    }
    return params;
};

export const Routes: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { pathname } = useLocation();
    let element: ReactNode = null;
    
    React.Children.forEach(children, child => {
        if (element) return;
        if (!React.isValidElement(child)) return;
        
        const props = child.props as { path: string; element: ReactNode };
        const params = matchPath(props.path, pathname);
        if (params) {
            element = (
                <RouteParamsContext.Provider value={params}>
                    {props.element}
                </RouteParamsContext.Provider>
            );
        }
    });
    
    return <>{element}</>;
};

export const Route: React.FC<{ path: string; element: ReactNode }> = () => null;

// --- Cart Context Implementation ---

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  total: number;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(newTotal);
  }, [items]);

  const addToCart = (product: Product) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setItems(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setItems(prev =>
      prev.map(item => {
        if (item.id === productId) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total, isOpen, setIsOpen }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};