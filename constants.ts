import { Product, Category } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: '赛博朋克忍者手办',
    price: 129.99,
    category: Category.FIGURES,
    description: '高质量 1/7 比例手办，具有复杂的赛博朋克细节和霓虹灯点缀。',
    imageUrl: 'https://picsum.photos/400/400?random=1',
    rating: 4.8
  },
  {
    id: '2',
    name: '魔法少女连帽衫',
    price: 59.99,
    category: Category.APPAREL,
    description: '印有可爱魔法少女图案的超大号连帽衫。100% 纯棉，超级柔软。',
    imageUrl: 'https://picsum.photos/400/400?random=2',
    rating: 4.5
  },
  {
    id: '3',
    name: '武士刀钥匙扣',
    price: 12.50,
    category: Category.ACCESSORIES,
    description: '传说中武士刀的压铸金属钥匙扣复制品。',
    imageUrl: 'https://picsum.photos/400/400?random=3',
    rating: 4.2
  },
  {
    id: '4',
    name: '机甲驾驶员耳机',
    price: 89.99,
    category: Category.ACCESSORIES,
    description: '带有猫耳和 LED 灯效的无线游戏耳机。直播的完美选择。',
    imageUrl: 'https://picsum.photos/400/400?random=4',
    rating: 4.7
  },
  {
    id: '5',
    name: '异世界轻小说 第一卷',
    price: 14.99,
    category: Category.MANGA,
    description: '在另一个世界史诗般旅程的开始。插图特别版。',
    imageUrl: 'https://picsum.photos/400/400?random=5',
    rating: 4.9
  },
  {
    id: '6',
    name: '复古动漫海报',
    price: 24.99,
    category: Category.HOME,
    description: 'A3 尺寸高光海报，以此致敬 90 年代的动漫美学。',
    imageUrl: 'https://picsum.photos/400/400?random=6',
    rating: 4.3
  },
  {
    id: '7',
    name: 'Q版吉祥物毛绒公仔',
    price: 34.99,
    category: Category.FIGURES,
    description: '来自你最喜欢的日常系动画的柔软可爱的吉祥物毛绒玩具。',
    imageUrl: 'https://picsum.photos/400/400?random=7',
    rating: 4.8
  },
  {
    id: '8',
    name: '霓虹都市 T恤',
    price: 29.99,
    category: Category.APPAREL,
    description: '带有夜光图案印花的街头风格 T 恤。',
    imageUrl: 'https://picsum.photos/400/400?random=8',
    rating: 4.4
  },
  {
    id: '9',
    name: '限量版树脂雕像',
    price: 299.99,
    category: Category.FIGURES,
    description: '独家手绘树脂雕像。包含编号的真品证书。',
    imageUrl: 'https://picsum.photos/400/400?random=9',
    rating: 5.0
  }
];