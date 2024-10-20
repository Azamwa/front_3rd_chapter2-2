// useCart.ts
import { useState } from "react";
import { CartItemType, CouponType, ProductType } from "../../types";
import { calculateCartTotal, updateCartItemQuantity } from "./utils/cart-utils";

export const useCart = () => {
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [selectedCoupon, setSelectedCoupon] = useState<CouponType | null>(null);

  function addToCart(product: ProductType) {
    const cartItemIndex = cart.findIndex(cartItem => cartItem.product.id === product.id);
    const hasCartItem = cartItemIndex !== -1;
    const hasCartStock = hasCartItem && cart[cartItemIndex].product.stock > 0;

    if (hasCartItem && hasCartStock) {
      addCartItemQuantity(cartItemIndex, product);
    } else {
      addCartItem(product);
    }
  }

  function addCartItemQuantity(cartItemIndex: number, product: ProductType) {
    setCart(prev =>
      prev.with(cartItemIndex, {
        product: { ...product, stock: product.stock - 1 },
        quantity: prev[cartItemIndex].quantity + 1,
      }),
    );
  }

  function addCartItem(product: ProductType) {
    setCart(prev => prev.concat({ product: { ...product }, quantity: 1 }));
  }

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
