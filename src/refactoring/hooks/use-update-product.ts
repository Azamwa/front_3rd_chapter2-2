import { useState } from "react";
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
        const updatedProduct = getUpdatedNewProduct(editingProduct, "name", newName);
        setEditingProduct(updatedProduct);
      }
    },

    handlePriceUpdate: function (productId: string, newPrice: number) {
      if (editingProduct !== null && editingProduct.id === productId) {
        const updatedProduct = getUpdatedNewProduct(editingProduct, "price", newPrice);
        setEditingProduct(updatedProduct);
      }
    },

    handleStockUpdate: function (productId: string, newStock: number, productList: ProductType[]) {
      const updatedProduct = getProductById(productList, productId);

      if (updatedProduct !== undefined) {
        const newProduct = getUpdatedNewProduct(updatedProduct, "stock", newStock);
        onProductUpdate(newProduct);
        setEditingProduct(newProduct);
      }
    },

    handleRemoveDiscount: function (
      productId: string,
      discountIndex: number,
      productList: ProductType[],
    ) {
      const updatedProduct = getProductById(productList, productId);
      if (updatedProduct !== undefined) {
        const newProduct = getRemovedDiscountProduct(updatedProduct, discountIndex);
        onProductUpdate(newProduct);
        setEditingProduct(newProduct);
      }
    },

    handleAddDiscount: function (productId: string, productList: ProductType[]) {
      const updatedProduct = getProductById(productList, productId);
      if (updatedProduct !== undefined && editingProduct !== null) {
        const newProduct = getNewDiscountProduct(updatedProduct);
        onProductUpdate(newProduct);
        setEditingProduct(newProduct);
        setNewDiscount({ quantity: 0, rate: 0 });
      }
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

  const getProductById = (productList: ProductType[], productId: string) => {
    return productList.find(product => product.id === productId);
  };

  const getUpdatedNewProduct = <K extends keyof ProductType>(
    product: ProductType,
    key: K,
    value: ProductType[K],
  ) => {
    return { ...product, [key]: value };
  };

  const getRemovedDiscountProduct = (updatedProduct: ProductType, discountIndex: number) => {
    return {
      ...updatedProduct,
      discountList: updatedProduct.discountList.filter((_, index) => index !== discountIndex),
    };
  };

  const getNewDiscountProduct = (updatedProduct: ProductType) => {
    return {
      ...updatedProduct,
      discountList: [...updatedProduct.discountList, newDiscount],
    };
  };

  return {
    editingProduct,
    newDiscount,
    setNewDiscount,
    productHandler,
  };
};
