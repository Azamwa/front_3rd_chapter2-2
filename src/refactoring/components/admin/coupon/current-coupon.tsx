import { CouponType } from "../../../../types";

interface CurrentCouponProps {
  coupon: CouponType;
  index: number;
}

const CurrentCoupon = ({ coupon, index }: CurrentCouponProps) => {
  const currentCouponText = (coupon: CouponType) => {
    const { name, code, discountType, discountValue } = coupon;
    return `${name} (${code}):${discountValue}${discountType === "amount" ? "원" : "%"} 할인`;
  };
  return (
    <div data-testid={`coupon-${index + 1}`} className="bg-gray-100 p-2 rounded">
      {currentCouponText(coupon)}
    </div>
  );
};

export default CurrentCoupon;
