import CouponSelect from "./coupon-select";

import { CouponType } from "../../../types";
import SelectedCoupon from "./selected-coupon";

interface ApplyCouponProps {
  couponList: CouponType[];
  applyCoupon: (coupon: CouponType) => void;
  selectedCoupon: CouponType | null;
}

const ApplyCoupon = ({ couponList, applyCoupon, selectedCoupon }: ApplyCouponProps) => {
  return (
    <>
      <CouponSelect applyCoupon={applyCoupon} couponList={couponList} />
      <SelectedCoupon selectedCoupon={selectedCoupon} />
    </>
  );
};

export default ApplyCoupon;
