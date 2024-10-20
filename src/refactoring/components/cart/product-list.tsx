import { ProductType } from "../../../types";
import CartItem from "./cart-item";

interface ProductListProps {
  productList: ProductType[];
}

const CartProductList = ({ productList }: ProductListProps) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>
      <div className="space-y-2">
        {productList.map(product => {
          return <CartItem product={product} key={product.id} />;
        })}
      </div>
    </div>
  );
};

export default CartProductList;
