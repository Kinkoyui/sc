export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  description: string;
  imageUrl: string;
  rating: number;
}

export enum Category {
  FIGURES = '手办',
  APPAREL = '服饰',
  ACCESSORIES = '配饰',
  MANGA = '漫画',
  HOME = '家居'
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}