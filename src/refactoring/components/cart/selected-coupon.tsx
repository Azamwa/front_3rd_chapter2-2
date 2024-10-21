import { CouponType } from "../../../types";

interface SelectedCouponProps {
  selectedCoupon: CouponType | null;
}

const SelectedCoupon = ({ selectedCoupon }: SelectedCouponProps) => {
  const selectedDiscription = () => {
    if (selectedCoupon === null) {
      return null;
    }
    const { name, discountType, discountValue } = selectedCoupon;
    const discount = `${discountValue}${discountType === "amount" ? "원" : "%"}`;
    const discountText = `적용된 쿠폰: ${name}(${discount} 할인)`;

    return discountText;
  };

  if (selectedCoupon === null) {
    return null;
  }

  return <p className="text-green-600">{selectedDiscription()}</p>;
};

export default SelectedCoupon;
