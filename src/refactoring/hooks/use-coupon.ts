import { CouponType } from "../../types.ts";
import { useState } from "react";

export const useCoupons = (initialCoupons: CouponType[]) => {
  return { coupons: [], addCoupon: () => undefined };
};
