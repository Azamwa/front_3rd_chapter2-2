import AddCoupon from "./add-coupon.tsx";
import CurrentCouponList from "./current-coupon-list.tsx";

import { CouponType, ProductType } from "../../../types.ts";
import ProductManagement from "./product-management.tsx";

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
            <CurrentCouponList couponList={couponList} />
          </div>
        </div>
      </div>
    </div>
  );
};
