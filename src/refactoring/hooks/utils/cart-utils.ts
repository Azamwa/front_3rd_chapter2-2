import { CartItemType, CouponType } from "../../../types";

// 개별아이템 수량 * 가격 * 최대할인
export const calculateItemTotal = (cartItem: CartItemType) => {
  const { price } = cartItem.product;
  const { quantity } = cartItem;

  const discount = getMaxApplicableDiscount(cartItem);

  return price * quantity * (1 - discount);
};

// 개별아이템 할인율 최대치
export const getMaxApplicableDiscount = (cartItem: CartItemType) => {
  const { discountList } = cartItem.product;
  const { quantity } = cartItem;

  const maxDiscount = discountList.reduce((maxDiscount, discount) => {
    return quantity >= discount.quantity && discount.rate > maxDiscount
      ? discount.rate
      : maxDiscount;
  }, 0);

  return maxDiscount;
};

const getTotalBeforeDiscount = (cart: CartItemType[]) => {
  const beforeDiscount = cart.reduce((acc, cartItem) => {
    const { price } = cartItem.product;
    const { quantity } = cartItem;
    return acc + price * quantity;
  }, 0);

  return beforeDiscount;
};

const getTotalAfterDiscount = (cart: CartItemType[]) => {
  const afterDiscount = cart.reduce((acc, cartItem) => {
    const discountedCartItem = calculateItemTotal(cartItem);
    return acc + discountedCartItem;
  }, 0);

  return afterDiscount;
};

// 장바구니의 할인 전 가격, 할인 후 가격, 총 할인율
export const calculateCartTotal = (cart: CartItemType[], selectedCoupon: CouponType | null) => {
  const totalBeforeDiscount = getTotalBeforeDiscount(cart);
  let totalAfterDiscount = getTotalAfterDiscount(cart);
  let totalDiscount = totalBeforeDiscount - totalAfterDiscount;

  if (selectedCoupon !== null) {
    if (selectedCoupon.discountType === "amount") {
      totalAfterDiscount = Math.max(0, totalAfterDiscount - selectedCoupon.discountValue);
    } else {
      totalAfterDiscount *= 1 - selectedCoupon.discountValue / 100;
    }
    totalDiscount = totalBeforeDiscount - totalAfterDiscount;
  }

  return {
    totalBeforeDiscount,
    totalAfterDiscount,
    totalDiscount,
  };
};

// 장바구니의 개수 증감
export const updateCartItemQuantity = (
  cart: CartItemType[],
  productId: string,
  newQuantity: number,
): CartItemType[] => {
  // 이 부분은 테스트를 통과 하기 위해 만들었지만, 굳이 removeCartItem은 따로 export해도 괜찮을 것 같습니다.
  if (newQuantity === 0) {
    return removeCartItem(cart, productId);
  }

  return getUpdateQuantity(cart, productId, newQuantity);
};

export const removeCartItem = (cart: CartItemType[], productId: string) => {
  return cart.filter(cartItem => cartItem.product.id !== productId);
};

const getUpdateQuantity = (cart: CartItemType[], productId: string, newQuantity: number) => {
  return cart.map(cartItem => {
    if (cartItem.product.id === productId) {
      const maxQuantity = Math.min(newQuantity, cartItem.product.stock);
      return { product: { ...cartItem.product }, quantity: maxQuantity };
    }
    return cartItem;
  });
};
