type CartItem = {
  id: number;
  title: string;
  price: number;
  qty: number;
  image?: string;
  variantId?: string;
};

type CartState = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "qty">, qty?: number) => void;
  removeItem: (id: number, variantId?: string) => void;
  clear: () => void;
  setQty: (id: number, qty: number, variantId?: string) => void;
  count: number;
  total: number;
  hasItems: boolean;
  getSelectedVariant: (productId: number) => string | undefined;
  setSelectedVariant: (productId: number, variantId?: string) => void;
};

export type { CartState, CartItem };
