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
      if (editingProduct && editingProduct.id === productId) {
        const updatedProduct = { ...editingProduct, name: newName };
        setEditingProduct(updatedProduct);
      }
    },

    handlePriceUpdate: function (productId: string, newPrice: number) {
      if (editingProduct && editingProduct.id === productId) {
        const updatedProduct = { ...editingProduct, price: newPrice };
        setEditingProduct(updatedProduct);
      }
    },

    handleStockUpdate: function (productId: string, newStock: number, productList: ProductType[]) {
      const updatedProduct = productList.find(product => product.id === productId);
      if (updatedProduct) {
        const newProduct = { ...updatedProduct, stock: newStock };
        onProductUpdate(newProduct);
        setEditingProduct(newProduct);
      }
    },

    handleRemoveDiscount: function (productId: string, index: number, productList: ProductType[]) {
      const updatedProduct = productList.find(product => product.id === productId);
      if (updatedProduct) {
        const newProduct = {
          ...updatedProduct,
          discountList: updatedProduct.discountList.filter((_, i) => i !== index),
        };
        onProductUpdate(newProduct);
        setEditingProduct(newProduct);
      }
    },

    handleAddDiscount: function (productId: string, productList: ProductType[]) {
      const updatedProduct = productList.find(product => product.id === productId);
      if (updatedProduct && editingProduct) {
        const newProduct = {
          ...updatedProduct,
          discountList: [...updatedProduct.discountList, newDiscount],
        };
        onProductUpdate(newProduct);
        setEditingProduct(newProduct);
        setNewDiscount({ quantity: 0, rate: 0 });
      }
    },

    handleEditComplete: function () {
      if (editingProduct) {
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
