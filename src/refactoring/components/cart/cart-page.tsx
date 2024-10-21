import { useCart } from "../../hooks/index";

import CartItem from "./cart-item";
import ProductItem from "./product-item";
import ApplyCoupon from "./apply-coupon";

import { CouponType, ProductType } from "../../../types";

interface CartPageProps {
  productList: ProductType[];
  couponList: CouponType[];
}

export const CartPage = ({ productList, couponList }: CartPageProps) => {
  const {
    cart,
    addToCart,
    updateQuantity,
    removeFromCart,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  } = useCart();
  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } = calculateTotal();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
          <div className="space-y-2">
            {productList.map(product => {
              return (
                <ProductItem cart={cart} product={product} addToCart={addToCart} key={product.id} />
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
          <div className="space-y-2">
            {cart.map(cartItem => {
              return (
                <CartItem
                  cartItem={cartItem}
                  updateQuantity={updateQuantity}
                  removeFromCart={removeFromCart}
                  key={cartItem.product.id}
                />
              );
            })}
          </div>

          <div className="mt-6 bg-white p-4 rounded shadow">
            <h2 className="text-2xl font-semibold mb-2">쿠폰 적용</h2>
            <ApplyCoupon
              couponList={couponList}
              applyCoupon={applyCoupon}
              selectedCoupon={selectedCoupon}
            />
          </div>

          <div className="mt-6 bg-white p-4 rounded shadow">
            <h2 className="text-2xl font-semibold mb-2">주문 요약</h2>
            <div className="space-y-1">
              <p>상품 금액: {totalBeforeDiscount.toLocaleString()}원</p>
              <p className="text-green-600">할인 금액: {totalDiscount.toLocaleString()}원</p>
              <p className="text-xl font-bold">
                최종 결제 금액: {totalAfterDiscount.toLocaleString()}원
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
