// useCart.ts
import { useState } from "react";
import { CartItemType, CouponType, ProductType } from "../../types";
import { calculateCartTotal, updateCartItemQuantity } from "./utils/cart-utils";

export const useCart = () => {
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<CouponType | null>(null);

  const addToCart = (product: ProductType) => {};

  const removeFromCart = (productId: string) => {};

  const updateQuantity = (productId: string, newQuantity: number) => {};

  const applyCoupon = (coupon: CouponType) => {};

  const calculateTotal = () => ({
    totalBeforeDiscount: 0,
    totalAfterDiscount: 0,
    totalDiscount: 0,
  });

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  };
};
