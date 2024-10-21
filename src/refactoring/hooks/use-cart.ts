// useCart.ts
import { useState } from "react";
import { CartItemType, CouponType, ProductType } from "../../types";
import { calculateCartTotal, removeCartItem, updateCartItemQuantity } from "./utils/cart-utils";

export const useCart = () => {
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<CouponType | null>(null);

  function addToCart(product: ProductType) {
    const cartItem = cart.find(cartItem => cartItem.product.id === product.id);
    const hasCartItem = cartItem !== undefined;
    const hasCartStock = hasCartItem && cartItem.product.stock > 0;

    if (hasCartItem && hasCartStock) {
      updateQuantity(cartItem.product.id, cartItem.quantity + 1);
    } else {
      addCartItem(product);
    }
  }

  function addCartItem(product: ProductType) {
    setCart(prev => prev.concat({ product: { ...product }, quantity: 1 }));
  }

  function removeFromCart(productId: string) {
    setCart(prev => removeCartItem(prev, productId));
  }

  function updateQuantity(productId: string, newQuantity: number) {
    setCart(prev => updateCartItemQuantity(prev, productId, newQuantity));
  }

  function applyCoupon(coupon: CouponType) {
    setSelectedCoupon(coupon || null);
  }

  const calculateTotal = calculateCartTotal(cart, selectedCoupon);

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
