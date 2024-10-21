import { CouponType } from "../../types.ts";

export const useCouponList = (initialCouponList: CouponType[]) => {
  // const [couponList, setCouponList] = useState(initialCouponList);
  // function addCoupon(coupon: CouponType) {
  //   setCouponList(coupon)
  // }
  return { couponList: initialCouponList, addCoupon: () => undefined };
};
