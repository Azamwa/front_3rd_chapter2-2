import { useCart } from "../../hooks/index";

import CartItem from "./cartItem/cart-item";
import ProductItem from "./productItem/product-item";
import ApplyCoupon from "./applyCoupon/apply-coupon";
import OrderSummary from "./orderSummary/order-summary";

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
            <OrderSummary calculateTotal={calculateTotal} />
          </div>
        </div>
      </div>
    </div>
  );
};
