import { CartItemType, CouponType } from "../../../types";

export const calculateItemTotal = (item: CartItemType) => {
  return 0;
};

export const getMaxApplicableDiscount = (item: CartItemType) => {
  return 0;
};

export const calculateCartTotal = (cart: CartItemType[], selectedCoupon: CouponType | null) => {
  return {
    totalBeforeDiscount: 0,
    totalAfterDiscount: 0,
    totalDiscount: 0,
  };
};

export const updateCartItemQuantity = (
  cart: CartItemType[],
  productId: string,
  newQuantity: number,
): CartItemType[] => {
  return [];
};
