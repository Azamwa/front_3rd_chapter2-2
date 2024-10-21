interface OrderSummaryProps {
  calculateTotal: {
    totalBeforeDiscount: number;
    totalAfterDiscount: number;
    totalDiscount: number;
  };
}

const OrderSummary = ({ calculateTotal }: OrderSummaryProps) => {
  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } = calculateTotal;

  return (
    <div className="space-y-1">
      <p>상품 금액: {totalBeforeDiscount.toLocaleString()}원</p>
      <p className="text-green-600">할인 금액: {totalDiscount.toLocaleString()}원</p>
      <p className="text-xl font-bold">최종 결제 금액: {totalAfterDiscount.toLocaleString()}원</p>
    </div>
  );
};

export default OrderSummary;
