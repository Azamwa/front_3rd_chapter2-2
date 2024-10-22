export interface ProductType {
  id: string;
  name: string;
  price: number;
  stock: number;
  discountList: DiscountType[];
}

export interface DiscountType {
  quantity: number;
  rate: number;
}

export interface CartItemType {
  product: ProductType;
  quantity: number;
}

export interface CouponType {
  name: string;
  code: string;
  discountType: "amount" | "percentage";
  discountValue: number;
}

export interface ProductHandlerType {
  handleProductNameUpdate: (productId: string, newName: string) => void;
  handlePriceUpdate: (productId: string, newPrice: number) => void;
  handleStockUpdate: (productId: string, newStock: number, productList: ProductType[]) => void;
  handleRemoveDiscount: (productId: string, index: number, productList: ProductType[]) => void;
  handleAddDiscount: (productId: string, productList: ProductType[]) => void;
  handleEditComplete: () => void;
  handleEditProduct: (product: ProductType) => void;
}
