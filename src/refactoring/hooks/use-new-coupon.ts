import { useState } from "react";
import { getUpdateValue } from "./utils/common";

import { CouponType } from "../../types";

interface UseNewCouponProps {
  onCouponAdd: (newCoupon: CouponType) => void;
}

const useNewCoupon = ({ onCouponAdd }: UseNewCouponProps) => {
  const [newCoupon, setNewCoupon] = useState<CouponType>({
    name: "",
    code: "",
    discountType: "percentage",
    discountValue: 0,
  });

  const hanldeChangeCouponInfo = <K extends keyof CouponType>(key: K, value: CouponType[K]) => {
    setNewCoupon(prev => getUpdateValue(prev, key, value));
  };

  const handleAddCoupon = () => {
    onCouponAdd(newCoupon);
    setNewCoupon({
      name: "",
      code: "",
      discountType: "percentage",
      discountValue: 0,
    });
  };

  return { newCoupon, hanldeChangeCouponInfo, handleAddCoupon };
};

export default useNewCoupon;
