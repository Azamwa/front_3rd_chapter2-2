import CouponSelect from "./coupon-select";
import SelectedCoupon from "./selected-coupon";

import { CouponType } from "../../../../types";

interface ApplyCouponProps {
  couponList: CouponType[];
  applyCoupon: (coupon: CouponType) => void;
  selectedCoupon: CouponType | null;
}

const ApplyCoupon = ({ couponList, applyCoupon, selectedCoupon }: ApplyCouponProps) => {
  return (
    <>
      <CouponSelect applyCoupon={applyCoupon} couponList={couponList} />
      {selectedCoupon !== null && <SelectedCoupon selectedCoupon={selectedCoupon} />}
    </>
  );
};

export default ApplyCoupon;
