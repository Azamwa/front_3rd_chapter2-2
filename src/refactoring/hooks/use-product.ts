import { useState } from "react";
import { ProductType } from "../../types";

export const useProductList = (initialProductList: ProductType[]) => {
  return {
    productList: initialProductList,
    updateProduct: () => undefined,
    addProduct: () => undefined,
  };
};
