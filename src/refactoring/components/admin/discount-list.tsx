import { ProductType } from "../../../types";

interface DiscountListProps {
  productItem: ProductType;
  productList?: ProductType[];
  handleRemoveDiscount?: (productId: string, index: number, productList: ProductType[]) => void;
}

const DiscountList = ({ productList, productItem, handleRemoveDiscount }: DiscountListProps) => {
  return (
    <>
      {productItem.discountList.map((discount, index) => (
        <div key={index} className="flex justify-between items-center mb-2">
          <span>
            {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
          </span>
          {handleRemoveDiscount !== undefined && productList !== undefined && (
            <button
              onClick={() => handleRemoveDiscount(productItem.id, index, productList)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              삭제
            </button>
          )}
        </div>
      ))}
    </>
  );
};

export default DiscountList;
