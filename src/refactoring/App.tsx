import { useCouponList, useProductList } from "./hooks/index.ts";
import { initialCouponList, initialProductList } from "./hooks/utils/initial-data";

import { CartPage } from "./components/cart/cart-page.tsx";
import { AdminPage } from "./components/admin/admin-page.tsx";
import Navigation from "./components/Navigation.tsx";
import useNavigation from "./hooks/use-navigation.ts";

const App = () => {
  const { productList, updateProduct, addProduct } = useProductList(initialProductList);
  const { couponList, addCoupon } = useCouponList(initialCouponList);
  const { isAdmin, handleChangeAdmin } = useNavigation();

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation isAdmin={isAdmin} handleChangeAdmin={handleChangeAdmin} />

      <main className="container mx-auto mt-6">
        {isAdmin ? (
          <AdminPage
            productList={productList}
            couponList={couponList}
            onProductUpdate={updateProduct}
            onProductAdd={addProduct}
            onCouponAdd={addCoupon}
          />
        ) : (
          <CartPage productList={productList} couponList={couponList} />
        )}
      </main>
    </div>
  );
};

export default App;
