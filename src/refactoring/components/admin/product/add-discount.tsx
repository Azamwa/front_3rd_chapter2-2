import { DiscountType, ProductType } from "../../../../types";

interface AddDiscountProps {
  newDiscount: DiscountType;
  addDiscount: {
    productId: string;
    productList: ProductType[];
    handleChangeNewDiscount: <K extends keyof DiscountType>(key: K, value: DiscountType[K]) => void;
    handleAddDiscount: (productId: string, productList: ProductType[]) => void;
  };
}

const AddDiscount = ({ newDiscount, addDiscount }: AddDiscountProps) => {
  const { productId, productList, handleAddDiscount, handleChangeNewDiscount } = addDiscount;

  return (
    <>
      <input
        type="number"
        placeholder="수량"
        value={newDiscount.quantity}
        onChange={e => handleChangeNewDiscount("quantity", parseInt(e.target.value))}
        className="w-1/3 p-2 border rounded"
      />
      <input
        type="number"
        placeholder="할인율 (%)"
        value={newDiscount.rate * 100}
        onChange={e => handleChangeNewDiscount("rate", parseInt(e.target.value) / 100)}
        className="w-1/3 p-2 border rounded"
      />
      <button
        onClick={() => handleAddDiscount(productId, productList)}
        className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        할인 추가
      </button>
    </>
  );
};

export default AddDiscount;
