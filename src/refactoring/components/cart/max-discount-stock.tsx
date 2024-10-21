import { ProductType } from "../../../types";

interface MaxDiscountStockProps {
  product: ProductType;
  getRemainingStock: (product: ProductType) => number;
}

const MaxDiscountStock = ({ product, getRemainingStock }: MaxDiscountStockProps) => {
  const getMaxDiscount = (discountList: { quantity: number; rate: number }[]) => {
    return discountList.reduce((max, discount) => Math.max(max, discount.rate), 0);
  };

  return (
    <div className="text-sm text-gray-500 mb-2">
      <span
        className={`font-medium ${getRemainingStock(product) > 0 ? "text-green-600" : "text-red-600"}`}
      >
        재고: {getRemainingStock(product)}개
      </span>
      {product.discountList.length > 0 && (
        <span className="ml-2 font-medium text-blue-600">
          최대 {(getMaxDiscount(product.discountList) * 100).toFixed(0)}% 할인
        </span>
      )}
    </div>
  );
};

export default MaxDiscountStock;
