import { useState } from "react";
import { useCoupons, useProductList } from "./hooks/index.ts";
import { initialCoupons, initialProducts } from "./hooks/utils/initial-data";

import { CartPage } from "./components/cart/cart-page.tsx";
import { AdminPage } from "./components/admin-page.tsx";

const App = () => {
  const { productList, updateProduct, addProduct } = useProductList(initialProducts);
  const { coupons, addCoupon } = useCoupons(initialCoupons);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">쇼핑몰 관리 시스템</h1>
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100"
          >
            {isAdmin ? "장바구니 페이지로" : "관리자 페이지로"}
          </button>
        </div>
      </nav>
      <main className="container mx-auto mt-6">
        {isAdmin ? (
          <AdminPage
            products={productList}
            coupons={coupons}
            onProductUpdate={updateProduct}
            onProductAdd={addProduct}
            onCouponAdd={addCoupon}
          />
        ) : (
          <CartPage productList={productList} coupons={coupons} />
        )}
      </main>
    </div>
  );
};

export default App;
