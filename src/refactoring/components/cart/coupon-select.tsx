import { CouponType } from "../../../types";

interface CouponSelectProps {
  couponList: CouponType[];
  applyCoupon: (coupon: CouponType) => void;
}

const CouponSelect = ({ couponList, applyCoupon }: CouponSelectProps) => {
  const getCouponName = (coupon: CouponType) => {
    const { name, discountType, discountValue } = coupon;
    const discount = `${discountValue}${discountType === "amount" ? "원" : "%"}`;

    return `${name} - ${discount}`;
  };

  return (
    <select
      onChange={e => applyCoupon(couponList[parseInt(e.target.value)])}
      className="w-full p-2 border rounded mb-2"
    >
      <option value="">쿠폰 선택</option>
      {couponList.map((coupon, index) => (
        <option key={coupon.code} value={index}>
          {getCouponName(coupon)}
        </option>
      ))}
    </select>
  );
};

export default CouponSelect;
