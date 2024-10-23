import DiscountList from "./discount-list";

import { ProductType } from "../../../../types";

interface ProductSummaryProps {
  productItem: ProductType;
  handleEditProduct: (product: ProductType) => void;
}

const ProductSummary = ({ productItem, handleEditProduct }: ProductSummaryProps) => {
  return (
    <div>
      <DiscountList productItem={productItem} />
      <button
        data-testid="modify-button"
        onClick={() => handleEditProduct(productItem)}
        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
      >
        수정
      </button>
    </div>
  );
};

export default ProductSummary;
