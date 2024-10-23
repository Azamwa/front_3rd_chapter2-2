import { useState } from "react";

import AddNewProduct from "./add-new-product";
import ProductItem from "./product-item";

import { ProductType } from "../../../../types";

interface ProductManagementProps {
  productList: ProductType[];
  onProductUpdate: (updatedProduct: ProductType) => void;
  onProductAdd: (newProduct: ProductType) => void;
}

const ProductManagement = ({
  productList,
  onProductUpdate,
  onProductAdd,
}: ProductManagementProps) => {
  const [showNewProductForm, setShowNewProductForm] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowNewProductForm(!showNewProductForm)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        {showNewProductForm ? "취소" : "새 상품 추가"}
      </button>
      {showNewProductForm && (
        <div className="bg-white p-4 rounded shadow mb-4">
          <h3 className="text-xl font-semibold mb-2">새 상품 추가</h3>
          <AddNewProduct
            onProductAdd={onProductAdd}
            setShowNewProductForm={setShowNewProductForm}
          />
        </div>
      )}
      <div className="space-y-2">
        {productList.map((product, index) => (
          <ProductItem
            productList={productList}
            index={index}
            onProductUpdate={onProductUpdate}
            key={product.id}
          />
        ))}
      </div>
    </>
  );
};

export default ProductManagement;
