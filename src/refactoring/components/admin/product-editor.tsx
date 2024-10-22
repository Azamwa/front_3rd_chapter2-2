import { Dispatch, SetStateAction } from "react";
import { DiscountType, ProductHandlerType, ProductType } from "../../../types";
import DiscountList from "./discount-list";
import UpdateProductInfo from "./update-product-info";
import AddDiscount from "./add-discount";

interface ProductEditorProps {
  productList: ProductType[];
  productItem: ProductType;
  editingProduct: ProductType | null;
  newDiscount: DiscountType;
  setNewDiscount: Dispatch<SetStateAction<DiscountType>>;
  productHandler: ProductHandlerType;
}

const ProductEditor = (productEditorProps: ProductEditorProps) => {
  const { productList, productItem, editingProduct, newDiscount, setNewDiscount, productHandler } =
    productEditorProps;

  const {
    handleProductNameUpdate,
    handlePriceUpdate,
    handleStockUpdate,
    handleRemoveDiscount,
    handleAddDiscount,
    handleEditComplete,
  } = productHandler;

  if (editingProduct === null) {
    return;
  }

  return (
    <div>
      <UpdateProductInfo
        productId={productItem.id}
        productList={productList}
        editingProduct={editingProduct}
        handleUpdateInfo={{ handleProductNameUpdate, handlePriceUpdate, handleStockUpdate }}
      />
      {/* 할인 정보 수정 부분 */}
      <div>
        <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
        <DiscountList
          productItem={productItem}
          productList={productList}
          handleRemoveDiscount={handleRemoveDiscount}
        />
        <div className="flex space-x-2">
          <AddDiscount
            newDiscount={newDiscount}
            setNewDiscount={setNewDiscount}
            addDiscount={{ productId: productItem.id, productList, handleAddDiscount }}
          />
        </div>
      </div>
      <button
        onClick={handleEditComplete}
        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
      >
        수정 완료
      </button>
    </div>
  );
};

export default ProductEditor;
