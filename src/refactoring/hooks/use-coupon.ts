import { useState } from "react";

import { CouponType } from "../../types.ts";

export const useCouponList = (initialCouponList: CouponType[]) => {
  const [couponList, setCouponList] = useState(initialCouponList);

  function addCoupon(coupon: CouponType) {
    setCouponList(prev => addNewCoupon(prev, coupon));
  }

  const addNewCoupon = (prev: CouponType[], coupon: CouponType) => {
    return [...prev, coupon];
  };

  return { couponList, addCoupon };
};
