import { CartItemType } from "../../../../types";

interface CartItemProps {
  cartItem: CartItemType;
  updateQuantity: (productId: string, newQuantity: number) => void;
  removeFromCart: (productId: string) => void;
}

const CartItem = ({ cartItem, updateQuantity, removeFromCart }: CartItemProps) => {
  const getAppliedDiscount = (item: CartItemType) => {
    const { discountList } = item.product;
    const { quantity } = item;
    let appliedDiscount = 0;
    for (const discount of discountList) {
      if (quantity >= discount.quantity) {
        appliedDiscount = Math.max(appliedDiscount, discount.rate);
      }
    }
    return appliedDiscount;
  };

  const isUnUpdatable = (cartItem: CartItemType, newQuantity: number) => {
    const { quantity, product } = cartItem;
    return quantity + product.stock <= newQuantity;
  };

  return (
    <div
      key={cartItem.product.id}
      className="flex justify-between items-center bg-white p-3 rounded shadow"
    >
      <div>
        <span className="font-semibold">{cartItem.product.name}</span>
        <br />
        <span className="text-sm text-gray-600">
          {cartItem.product.price}원 x {cartItem.quantity}
          {getAppliedDiscount(cartItem) > 0 && (
            <span className="text-green-600 ml-1">
              ({(getAppliedDiscount(cartItem) * 100).toFixed(0)}% 할인 적용)
            </span>
          )}
        </span>
      </div>

      <div>
        <button
          onClick={() => updateQuantity(cartItem.product.id, cartItem.quantity - 1)}
          className="bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400"
        >
          -
        </button>
        <button
          onClick={() => updateQuantity(cartItem.product.id, cartItem.quantity + 1)}
          disabled={isUnUpdatable(cartItem, cartItem.quantity + 1)}
          className={` px-2 py-1 rounded mr-1 bg-gray-300 
            ${
              isUnUpdatable(cartItem, cartItem.quantity + 1)
                ? "text-gray-400"
                : "text-gray-800 hover:bg-gray-400"
            }`}
        >
          +
        </button>
        <button
          onClick={() => removeFromCart(cartItem.product.id)}
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          삭제
        </button>
      </div>
    </div>
  );
};

export default CartItem;
