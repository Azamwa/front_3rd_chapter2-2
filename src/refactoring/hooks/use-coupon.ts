import { CouponType } from "../../types.ts";
import { useState } from "react";

export const useCouponList = (initialCouponList: CouponType[]) => {
  return { couponList: [], addCoupon: () => undefined };
};
