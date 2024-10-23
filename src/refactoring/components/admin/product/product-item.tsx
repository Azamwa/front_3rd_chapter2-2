import { useUpdateProduct } from "../../../hooks/use-update-product";
import { useProductIds } from "../../../hooks/use-product-ids";

import ProductEditor from "./product-editor";

import { ProductType } from "../../../../types";
import ProductSummary from "./product-summary";

interface ProductItemProps {
  productList: ProductType[];
  index: number;
  onProductUpdate: (updatedProduct: ProductType) => void;
}

const ProductItem = ({ productList, index, onProductUpdate }: ProductItemProps) => {
  const productItem = productList[index];
  const updateProduct = useUpdateProduct({ onProductUpdate });
  const { editingProduct, productHandler } = updateProduct;
  const { openProductIds, toggleProductAccordion } = useProductIds();

  return (
    <div data-testid={`product-${index + 1}`} className="bg-white p-4 rounded shadow">
      <button
        data-testid="toggle-button"
        onClick={() => toggleProductAccordion(productItem.id)}
        className="w-full text-left font-semibold"
      >
        {productItem.name} - {productItem.price}원 (재고: {productItem.stock})
      </button>

      {openProductIds.has(productItem.id) && (
        <div className="mt-2">
          {editingProduct && editingProduct.id === productItem.id ? (
            <ProductEditor productList={productList} productItem={productItem} {...updateProduct} />
          ) : (
            <ProductSummary
              productItem={productItem}
              handleEditProduct={productHandler.handleEditProduct}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ProductItem;
