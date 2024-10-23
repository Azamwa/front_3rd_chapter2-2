import DiscountCondition from "./discount-condition";
import MaxDiscountStock from "./max-discount-stock";

import { CartItemType, ProductType } from "../../../../types";

interface ProductItemProps {
  product: ProductType;
  cart: CartItemType[];
  addToCart: (product: ProductType) => void;
}

const ProductItem = ({ product, cart, addToCart }: ProductItemProps) => {
  const getRemainingStock = (product: ProductType) => {
    const productItem = cart.find(item => item.product.id === product.id);
    return product.stock - (productItem?.quantity || 0);
  };

  return (
    <div data-testid={`product-${product.id}`} className="bg-white p-3 rounded shadow">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">{product.name}</span>
        <span className="text-gray-600">{product.price.toLocaleString()}원</span>
      </div>
      <MaxDiscountStock product={product} getRemainingStock={getRemainingStock} />

      {product.discountList.length > 0 && (
        <ul className="list-disc list-inside text-sm text-gray-500 mb-2">
          {product.discountList.map((discount, index) => (
            <DiscountCondition discount={discount} key={`${discount.quantity}${index}`} />
          ))}
        </ul>
      )}

      <button
        onClick={() => addToCart(product)}
        className={`w-full px-3 py-1 rounded ${
          getRemainingStock(product) > 0
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        disabled={getRemainingStock(product) <= 0}
      >
        {getRemainingStock(product) > 0 ? "장바구니에 추가" : "품절"}
      </button>
    </div>
  );
};

export default ProductItem;
