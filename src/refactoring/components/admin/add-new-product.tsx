import { Dispatch, SetStateAction } from "react";
import { ProductType } from "../../../types";

interface AddNewProductProps {
  newProduct: Omit<ProductType, "id">;
  setNewProduct: Dispatch<SetStateAction<Omit<ProductType, "id">>>;
  onProductAdd: (newProduct: ProductType) => void;
  setShowNewProductForm: Dispatch<SetStateAction<boolean>>;
}

const AddNewProduct = ({
  newProduct,
  setNewProduct,
  onProductAdd,
  setShowNewProductForm,
}: AddNewProductProps) => {
  const handleAddNewProduct = () => {
    const productWithId = { ...newProduct, id: Date.now().toString() };
    onProductAdd(productWithId);
    setNewProduct({
      name: "",
      price: 0,
      stock: 0,
      discountList: [],
    });
    setShowNewProductForm(false);
  };

  return (
    <>
      <div className="mb-2">
        <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
          상품명
        </label>
        <input
          id="productName"
          type="text"
          value={newProduct.name}
          onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="productPrice" className="block text-sm font-medium text-gray-700">
          가격
        </label>
        <input
          id="productPrice"
          type="number"
          value={newProduct.price}
          onChange={e => setNewProduct({ ...newProduct, price: parseInt(e.target.value) })}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="productStock" className="block text-sm font-medium text-gray-700">
          재고
        </label>
        <input
          id="productStock"
          type="number"
          value={newProduct.stock}
          onChange={e => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })}
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={handleAddNewProduct}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        추가
      </button>
    </>
  );
};

export default AddNewProduct;
