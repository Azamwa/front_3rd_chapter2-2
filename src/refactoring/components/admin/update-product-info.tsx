import { ProductHandlerType, ProductType } from "../../../types";

interface UpdateProductInfoProps {
  productId: string;
  productList: ProductType[];
  editingProduct: ProductType;
  handleUpdateInfo: Pick<
    ProductHandlerType,
    "handleProductNameUpdate" | "handlePriceUpdate" | "handleStockUpdate"
  >;
}

const UpdateProductInfo = ({
  productId,
  productList,
  editingProduct,
  handleUpdateInfo,
}: UpdateProductInfoProps) => {
  const { handleProductNameUpdate, handlePriceUpdate, handleStockUpdate } = handleUpdateInfo;
  return (
    <>
      <div className="mb-4">
        <label className="block mb-1">상품명: </label>
        <input
          type="text"
          value={editingProduct.name}
          onChange={e => handleProductNameUpdate(productId, e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">가격: </label>
        <input
          type="number"
          value={editingProduct.price}
          onChange={e => handlePriceUpdate(productId, parseInt(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">재고: </label>
        <input
          type="number"
          value={editingProduct.stock}
          onChange={e => handleStockUpdate(productId, parseInt(e.target.value), productList)}
          className="w-full p-2 border rounded"
        />
      </div>
    </>
  );
};

export default UpdateProductInfo;
