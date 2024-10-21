import { useState } from "react";

import { ProductType } from "../../types";

export const useProductList = (initialProductList: ProductType[]) => {
  const [productList, setProductList] = useState(initialProductList);

  function updateProduct(productItem: ProductType) {
    setProductList(prev => getFormatProduct(prev, productItem));
  }

  function addProduct(newProduct: ProductType) {
    setProductList(prev => addNewProduct(prev, newProduct));
  }

  const getFormatProduct = (prev: ProductType[], productItem: ProductType) => {
    return prev.map(product => (product.id === productItem.id ? productItem : product));
  };

  const addNewProduct = (prev: ProductType[], newProduct: ProductType) => {
    return [...prev, newProduct];
  };

  return {
    productList,
    updateProduct,
    addProduct,
  };
};
