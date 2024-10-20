import { DiscountType } from "../../../types";

interface DiscountConditionProps {
  discount: DiscountType;
}

const DiscountCondition = ({ discount }: DiscountConditionProps) => {
  return (
    <li>
      {discount.quantity}개 이상: {(discount.rate * 100).toFixed(0)}% 할인
    </li>
  );
};

export default DiscountCondition;
