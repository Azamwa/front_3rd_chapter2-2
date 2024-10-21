import { useState } from "react";
import { ProductType } from "../../types";

const initialNewProduct = {
  name: "",
  price: 0,
  stock: 0,
  discountList: [],
};

const useNewProduct = () => {
  const [newProduct, setNewProduct] = useState<Omit<ProductType, "id">>(initialNewProduct);

  function changeNewProduct<K extends keyof ProductType>(key: K, value: ProductType[K]) {
    setNewProduct(prev => ({ ...prev, [key]: value }));
  }

  function initializeProduct() {
    setNewProduct(initialNewProduct);
  }

  return { newProduct, changeNewProduct, initializeProduct };
};

export default useNewProduct;
