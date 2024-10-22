import AddCoupon from "./add-coupon.tsx";
import ProductManagement from "./product-management.tsx";
import CurrentCoupon from "./current-coupon.tsx";

import { CouponType, ProductType } from "../../../types.ts";

interface AdminPageProps {
  productList: ProductType[];
  couponList: CouponType[];
  onProductUpdate: (updatedProduct: ProductType) => void;
  onProductAdd: (newProduct: ProductType) => void;
  onCouponAdd: (newCoupon: CouponType) => void;
}

export const AdminPage = ({
  productList,
  couponList,
  onProductUpdate,
  onProductAdd,
  onCouponAdd,
}: AdminPageProps) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">관리자 페이지</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
          <ProductManagement
            productList={productList}
            onProductUpdate={onProductUpdate}
            onProductAdd={onProductAdd}
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
          <div className="bg-white p-4 rounded shadow">
            <AddCoupon onCouponAdd={onCouponAdd} />
            <div>
              <h3 className="text-lg font-semibold mb-2">현재 쿠폰 목록</h3>
              <div className="space-y-2">
                {couponList.map((coupon, index) => (
                  <CurrentCoupon coupon={coupon} index={index} key={coupon.code + index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
