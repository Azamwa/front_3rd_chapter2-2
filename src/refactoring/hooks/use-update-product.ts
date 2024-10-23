import { useState } from "react";
import { getListItemById, getUpdateValue, removeItemByIndex } from "./utils/common";

import { DiscountType, ProductHandlerType, ProductType } from "../../types";

interface UseUpdateProductProps {
  onProductUpdate: (updatedProduct: ProductType) => void;
}

export const useUpdateProduct = ({ onProductUpdate }: UseUpdateProductProps) => {
  const [editingProduct, setEditingProduct] = useState<ProductType | null>(null);
  const [newDiscount, setNewDiscount] = useState<DiscountType>({ quantity: 0, rate: 0 });

  const productHandler: ProductHandlerType = {
    handleProductNameUpdate: function (productId: string, newName: string) {
      if (editingProduct !== null && editingProduct.id === productId) {
        const updatedProduct = getUpdateValue(editingProduct, "name", newName);
        setEditingProduct(updatedProduct);
      }
    },

    handlePriceUpdate: function (productId: string, newPrice: number) {
      if (editingProduct !== null && editingProduct.id === productId) {
        const updatedProduct = getUpdateValue(editingProduct, "price", newPrice);
        setEditingProduct(updatedProduct);
      }
    },

    handleStockUpdate: function (productId: string, newStock: number, productList: ProductType[]) {
      const updatedProduct = getListItemById(productList, productId);

      if (updatedProduct !== undefined) {
        const newProduct = getUpdateValue(updatedProduct, "stock", newStock);
        onProductUpdate(newProduct);
        setEditingProduct(newProduct);
      }
    },

    handleRemoveDiscount: function (
      productId: string,
      discountIndex: number,
      productList: ProductType[],
    ) {
      const updatedProduct = getListItemById(productList, productId);
      if (updatedProduct !== undefined) {
        const discountList = removeItemByIndex(updatedProduct.discountList, discountIndex);
        const newProduct = getUpdateValue(updatedProduct, "discountList", discountList);

        onProductUpdate(newProduct);
        setEditingProduct(newProduct);
      }
    },

    handleAddDiscount: function (productId: string, productList: ProductType[]) {
      const updatedProduct = getListItemById(productList, productId);
      if (updatedProduct !== undefined && editingProduct !== null) {
        const discountList = [...updatedProduct.discountList, newDiscount];
        const newProduct = getUpdateValue(updatedProduct, "discountList", discountList);

        onProductUpdate(newProduct);
        setEditingProduct(newProduct);
        setNewDiscount({ quantity: 0, rate: 0 });
      }
    },

    handleChangeNewDiscount: function <K extends keyof DiscountType>(
      key: K,
      value: DiscountType[K],
    ) {
      setNewDiscount(prev => {
        const updatedDiscount = getUpdateValue(prev, key, value);
        return updatedDiscount;
      });
    },

    handleEditComplete: function () {
      if (editingProduct !== null) {
        onProductUpdate(editingProduct);
        setEditingProduct(null);
      }
    },

    handleEditProduct: function (product: ProductType) {
      setEditingProduct({ ...product });
    },
  };

  return {
    editingProduct,
    newDiscount,
    setNewDiscount,
    productHandler,
  };
};
