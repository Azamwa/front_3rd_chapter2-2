// useCart.ts
import { useState } from "react";
import { CartItemType, CouponType, ProductType } from "../../types";
import { calculateCartTotal, updateCartItemQuantity } from "./utils/cart-utils";

export const useCart = () => {
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<CouponType | null>(null);

  function addToCart(product: ProductType) {
    const cartItem = cart.find(cartItem => cartItem.product.id === product.id);
    const hasCartItem = cartItem !== undefined;
    const hasCartStock = hasCartItem && cartItem.product.stock > 0;

    if (hasCartItem && hasCartStock) {
      setCartQuantity(cartItem.product.id, cartItem.quantity + 1);
    } else {
      addCartItem(product);
    }
  }

  function addCartItem(product: ProductType) {
    setCart(prev => prev.concat({ product: { ...product }, quantity: 1 }));
  }

  function removeFromCart(productId: string) {
    setCart(prev => prev.filter(cartItem => cartItem.product.id !== productId));
  }

  function updateQuantity(productId: string, newQuantity: number) {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCartQuantity(productId, newQuantity);
    }
  }

  function setCartQuantity(productId: string, newQuantity: number) {
    setCart(prev =>
      prev.map(cartItem => {
        const { product, quantity } = cartItem;
        const isStockRemained = product.stock + quantity - newQuantity > 0;

        return product.id === productId && isStockRemained
          ? {
              product: { ...product, stock: product.stock + quantity - newQuantity },
              quantity: newQuantity,
            }
          : cartItem;
      }),
    );
  }

  function applyCoupon(coupon: CouponType) {
    setSelectedCoupon(coupon || null);
  }

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
