import { useState } from "react";
import { describe, expect, test } from "vitest";
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { useNewProduct } from "../../refactoring/hooks/use-new-product";
import { useProductIds } from "../../refactoring/hooks/use-product-ids";
import { useUpdateProduct } from "../../refactoring/hooks/use-update-product";
import useNewCoupon from "../../refactoring/hooks/use-new-coupon";
import {
  getListItemById,
  getUpdateValue,
  removeItemByIndex,
} from "../../refactoring/hooks/utils/common";

import { CartPage } from "../../refactoring/components/cart/cart-page";
import { AdminPage } from "../../refactoring/components/admin/admin-page";

import { CouponType, ProductType } from "../../types";

const mockProductList: ProductType[] = [
  {
    id: "p1",
    name: "상품1",
    price: 10000,
    stock: 20,
    discountList: [{ quantity: 10, rate: 0.1 }],
  },
  {
    id: "p2",
    name: "상품2",
    price: 20000,
    stock: 20,
    discountList: [{ quantity: 10, rate: 0.15 }],
  },
  {
    id: "p3",
    name: "상품3",
    price: 30000,
    stock: 20,
    discountList: [{ quantity: 10, rate: 0.2 }],
  },
];
const mockCouponList: CouponType[] = [
  {
    name: "5000원 할인 쿠폰",
    code: "AMOUNT5000",
    discountType: "amount",
    discountValue: 5000,
  },
  {
    name: "10% 할인 쿠폰",
    code: "PERCENT10",
    discountType: "percentage",
    discountValue: 10,
  },
];

const TestAdminPage = () => {
  const [productList, setProductList] = useState<ProductType[]>(mockProductList);
  const [couponList, setCouponList] = useState<CouponType[]>(mockCouponList);

  const handleProductUpdate = (updatedProduct: ProductType) => {
    setProductList(prev =>
      prev.map(productItem =>
        productItem.id === updatedProduct.id ? updatedProduct : productItem,
      ),
    );
  };

  const handleProductAdd = (newProduct: ProductType) => {
    setProductList(prev => [...prev, newProduct]);
  };

  const handleCouponAdd = (newCoupon: CouponType) => {
    setCouponList(prev => [...prev, newCoupon]);
  };

  return (
    <AdminPage
      productList={productList}
      couponList={couponList}
      onProductUpdate={handleProductUpdate}
      onProductAdd={handleProductAdd}
      onCouponAdd={handleCouponAdd}
    />
  );
};

describe("advanced > ", () => {
  describe("시나리오 테스트 > ", () => {
    test("장바구니 페이지 테스트 > ", async () => {
      render(<CartPage productList={mockProductList} couponList={mockCouponList} />);
      const product1 = screen.getByTestId("product-p1");
      const product2 = screen.getByTestId("product-p2");
      const product3 = screen.getByTestId("product-p3");
      const addToCartButtonsAtProduct1 = within(product1).getByText("장바구니에 추가");
      const addToCartButtonsAtProduct2 = within(product2).getByText("장바구니에 추가");
      const addToCartButtonsAtProduct3 = within(product3).getByText("장바구니에 추가");

      // 1. 상품 정보 표시
      expect(product1).toHaveTextContent("상품1");
      expect(product1).toHaveTextContent("10,000원");
      expect(product1).toHaveTextContent("재고: 20개");
      expect(product2).toHaveTextContent("상품2");
      expect(product2).toHaveTextContent("20,000원");
      expect(product2).toHaveTextContent("재고: 20개");
      expect(product3).toHaveTextContent("상품3");
      expect(product3).toHaveTextContent("30,000원");
      expect(product3).toHaveTextContent("재고: 20개");

      // 2. 할인 정보 표시
      expect(screen.getByText("10개 이상: 10% 할인")).toBeInTheDocument();

      // 3. 상품1 장바구니에 상품 추가
      fireEvent.click(addToCartButtonsAtProduct1); // 상품1 추가

      // 4. 할인율 계산
      expect(screen.getByText("상품 금액: 10,000원")).toBeInTheDocument();
      expect(screen.getByText("할인 금액: 0원")).toBeInTheDocument();
      expect(screen.getByText("최종 결제 금액: 10,000원")).toBeInTheDocument();

      // 5. 상품 품절 상태로 만들기
      for (let i = 0; i < 19; i++) {
        fireEvent.click(addToCartButtonsAtProduct1);
      }

      // 6. 품절일 때 상품 추가 안 되는지 확인하기
      expect(product1).toHaveTextContent("재고: 0개");
      fireEvent.click(addToCartButtonsAtProduct1);
      expect(product1).toHaveTextContent("재고: 0개");

      // 7. 할인율 계산
      expect(screen.getByText("상품 금액: 200,000원")).toBeInTheDocument();
      expect(screen.getByText("할인 금액: 20,000원")).toBeInTheDocument();
      expect(screen.getByText("최종 결제 금액: 180,000원")).toBeInTheDocument();

      // 8. 상품을 각각 10개씩 추가하기
      fireEvent.click(addToCartButtonsAtProduct2); // 상품2 추가
      fireEvent.click(addToCartButtonsAtProduct3); // 상품3 추가

      const increaseButtons = screen.getAllByText("+");
      for (let i = 0; i < 9; i++) {
        fireEvent.click(increaseButtons[1]); // 상품2
        fireEvent.click(increaseButtons[2]); // 상품3
      }

      // 9. 할인율 계산
      expect(screen.getByText("상품 금액: 700,000원")).toBeInTheDocument();
      expect(screen.getByText("할인 금액: 110,000원")).toBeInTheDocument();
      expect(screen.getByText("최종 결제 금액: 590,000원")).toBeInTheDocument();

      // 10. 쿠폰 적용하기
      const couponListelect = screen.getByRole("combobox");
      fireEvent.change(couponListelect, { target: { value: "1" } }); // 10% 할인 쿠폰 선택

      // 11. 할인율 계산
      expect(screen.getByText("상품 금액: 700,000원")).toBeInTheDocument();
      expect(screen.getByText("할인 금액: 169,000원")).toBeInTheDocument();
      expect(screen.getByText("최종 결제 금액: 531,000원")).toBeInTheDocument();

      // 12. 다른 할인 쿠폰 적용하기
      fireEvent.change(couponListelect, { target: { value: "0" } }); // 5000원 할인 쿠폰
      expect(screen.getByText("상품 금액: 700,000원")).toBeInTheDocument();
      expect(screen.getByText("할인 금액: 115,000원")).toBeInTheDocument();
      expect(screen.getByText("최종 결제 금액: 585,000원")).toBeInTheDocument();
    });

    test("관리자 페이지 테스트 > ", async () => {
      render(<TestAdminPage />);

      const $product1 = screen.getByTestId("product-1");

      // 1. 새로운 상품 추가
      fireEvent.click(screen.getByText("새 상품 추가"));

      fireEvent.change(screen.getByLabelText("상품명"), { target: { value: "상품4" } });
      fireEvent.change(screen.getByLabelText("가격"), { target: { value: "15000" } });
      fireEvent.change(screen.getByLabelText("재고"), { target: { value: "30" } });

      fireEvent.click(screen.getByText("추가"));

      const $product4 = screen.getByTestId("product-4");

      expect($product4).toHaveTextContent("상품4");
      expect($product4).toHaveTextContent("15000원");
      expect($product4).toHaveTextContent("재고: 30");

      // 2. 상품 선택 및 수정
      fireEvent.click($product1);
      fireEvent.click(within($product1).getByTestId("toggle-button"));
      fireEvent.click(within($product1).getByTestId("modify-button"));

      act(() => {
        fireEvent.change(within($product1).getByDisplayValue("20"), { target: { value: "25" } });
        fireEvent.change(within($product1).getByDisplayValue("10000"), {
          target: { value: "12000" },
        });
        fireEvent.change(within($product1).getByDisplayValue("상품1"), {
          target: { value: "수정된 상품1" },
        });
      });

      fireEvent.click(within($product1).getByText("수정 완료"));

      expect($product1).toHaveTextContent("수정된 상품1");
      expect($product1).toHaveTextContent("12000원");
      expect($product1).toHaveTextContent("재고: 25");

      // 3. 상품 할인율 추가 및 삭제
      fireEvent.click($product1);
      fireEvent.click(within($product1).getByTestId("modify-button"));

      // 할인 추가
      act(() => {
        fireEvent.change(screen.getByPlaceholderText("수량"), { target: { value: "5" } });
        fireEvent.change(screen.getByPlaceholderText("할인율 (%)"), { target: { value: "5" } });
      });
      fireEvent.click(screen.getByText("할인 추가"));

      expect(screen.queryByText("5개 이상 구매 시 5% 할인")).toBeInTheDocument();

      // 할인 삭제
      fireEvent.click(screen.getAllByText("삭제")[0]);
      expect(screen.queryByText("10개 이상 구매 시 10% 할인")).not.toBeInTheDocument();
      expect(screen.queryByText("5개 이상 구매 시 5% 할인")).toBeInTheDocument();

      fireEvent.click(screen.getAllByText("삭제")[0]);
      expect(screen.queryByText("10개 이상 구매 시 10% 할인")).not.toBeInTheDocument();
      expect(screen.queryByText("5개 이상 구매 시 5% 할인")).not.toBeInTheDocument();

      // 4. 쿠폰 추가
      fireEvent.change(screen.getByPlaceholderText("쿠폰 이름"), { target: { value: "새 쿠폰" } });
      fireEvent.change(screen.getByPlaceholderText("쿠폰 코드"), { target: { value: "NEW10" } });
      fireEvent.change(screen.getByRole("combobox"), { target: { value: "percentage" } });
      fireEvent.change(screen.getByPlaceholderText("할인 값"), { target: { value: "10" } });

      fireEvent.click(screen.getByText("쿠폰 추가"));

      const $newCoupon = screen.getByTestId("coupon-3");

      expect($newCoupon).toHaveTextContent("새 쿠폰 (NEW10):10% 할인");
    });
  });

  describe("자유롭게 작성해보세요.", () => {
    test("새로운 유틸 함수를 만든 후에 테스트 코드를 작성해서 실행해보세요", () => {
      expect(true).toBe(true);
    });

    test("새로운 hook 함수르 만든 후에 테스트 코드를 작성해서 실행해보세요", () => {
      expect(true).toBe(true);
    });
  });

  describe("useNewProduct", () => {
    test("생성할 제품의 속성을 변경할 수 있어야 합니다.", () => {
      const { result } = renderHook(() => useNewProduct());

      act(() => {
        result.current.changeNewProduct("name", "야미");
      });
      expect(result.current.newProduct).toEqual({
        name: "야미",
        price: 0,
        stock: 0,
        discountList: [],
      });

      act(() => {
        result.current.changeNewProduct("price", 30000);
      });
      expect(result.current.newProduct).toEqual({
        name: "야미",
        price: 30000,
        stock: 0,
        discountList: [],
      });

      act(() => {
        result.current.changeNewProduct("discountList", [
          { quantity: 2, rate: 0.1 },
          { quantity: 5, rate: 0.2 },
        ]);
      });
      expect(result.current.newProduct).toEqual({
        name: "야미",
        price: 30000,
        stock: 0,
        discountList: [
          { quantity: 2, rate: 0.1 },
          { quantity: 5, rate: 0.2 },
        ],
      });
    });

    test("제품을 초기화 합니다.", () => {
      const { result } = renderHook(() => useNewProduct());

      act(() => {
        result.current.changeNewProduct("name", "야미");
        result.current.changeNewProduct("price", 30000);

        result.current.initializeProduct();
      });

      expect(result.current.newProduct).toEqual({
        name: "",
        price: 0,
        stock: 0,
        discountList: [],
      });
    });
  });

  describe("useProductIds", () => {
    test("productId를 추가하고, 삭제할 수 있습니다.", () => {
      const { result } = renderHook(() => useProductIds());

      act(() => {
        result.current.toggleProductAccordion("아이디1");
      });
      expect(result.current.openProductIds.has("아이디1")).toBe(true);

      act(() => {
        result.current.toggleProductAccordion("아이디1");
        result.current.toggleProductAccordion("비밀번호1");
      });
      expect(result.current.openProductIds.has("아이디1")).toBe(false);
      expect(result.current.openProductIds.has("비밀번호1")).toBe(true);
    });
  });

  describe("useUpdateProduct", () => {
    const { result } = renderHook(() => {
      const [, setProductList] = useState(mockProductList);

      function updateProduct(productItem: ProductType) {
        setProductList(prev =>
          prev.map(product => (product.id === productItem.id ? productItem : product)),
        );
      }

      return useUpdateProduct({ onProductUpdate: updateProduct });
    });

    test("product의 기본정보를 변경합니다.", () => {
      act(() => result.current.productHandler.handleEditProduct(mockProductList[0]));

      const { editingProduct, productHandler } = result.current;
      const { handleProductNameUpdate, handlePriceUpdate, handleStockUpdate } = productHandler;

      if (editingProduct === null) {
        return;
      }

      act(() => handleProductNameUpdate(editingProduct.id, "빌보배긴스"));

      expect(result.current.editingProduct).toEqual({
        discountList: [{ quantity: 10, rate: 0.1 }],
        id: "p1",
        name: "빌보배긴스",
        price: 10000,
        stock: 20,
      });

      act(() => handlePriceUpdate(editingProduct.id, 111));

      waitFor(() => {
        expect(result.current.editingProduct).toEqual({
          discountList: [{ quantity: 10, rate: 0.1 }],
          id: "p1",
          name: "빌보배긴스",
          price: 111,
          stock: 20,
        });
      });

      act(() => handleStockUpdate(editingProduct.id, 111, mockProductList));

      waitFor(() => {
        expect(result.current.editingProduct).toEqual({
          discountList: [{ quantity: 10, rate: 0.1 }],
          id: "p1",
          name: "빌보배긴스",
          price: 111,
          stock: 111,
        });
      });
    });

    test("product의 할인정보를 추가/삭제 합니다.", () => {
      act(() => result.current.productHandler.handleEditProduct(mockProductList[0]));

      const { editingProduct, productHandler } = result.current;
      const { handleAddDiscount, handleRemoveDiscount } = productHandler;

      if (editingProduct === null) {
        return;
      }

      act(() => handleAddDiscount(editingProduct.id, mockProductList));

      expect(result.current.editingProduct?.discountList).toEqual([
        { quantity: 10, rate: 0.1 },
        { quantity: 0, rate: 0 },
      ]);

      act(() => handleRemoveDiscount(editingProduct.id, 1, mockProductList));

      expect(result.current.editingProduct?.discountList).toEqual([{ quantity: 10, rate: 0.1 }]);
    });
  });

  describe("useNewCoupon", () => {
    const { result } = renderHook(() => {
      const [, setCouponList] = useState(mockCouponList);

      function updateCouponList(coupon: CouponType) {
        setCouponList(prev => [...prev, coupon]);
      }

      return useNewCoupon({ onCouponAdd: updateCouponList });
    });

    test("새쿠폰의 정보를 변경합니다.", () => {
      act(() => result.current.hanldeChangeCouponInfo("name", "안두릴"));

      waitFor(() => {
        expect(result.current.newCoupon).toEqual({
          code: "",
          discountType: "percentage",
          discountValue: 0,
          name: "안두릴",
        });
      });

      act(() => result.current.hanldeChangeCouponInfo("discountType", "amount"));
      act(() => result.current.hanldeChangeCouponInfo("discountValue", 3500));

      waitFor(() => {
        expect(result.current.newCoupon).toEqual({
          code: "",
          discountType: "amount",
          discountValue: 3500,
          name: "안두릴",
        });
      });
    });
  });

  describe("전역에서 사용될 함수들을 테스트합니다.", () => {
    test("getUpdatedValue => 상태를 업데이트 하는 순수함수", () => {
      const initialValue = {
        아라곤: "장검",
        레골라스: "갈라드리엘의 활",
        김리: "도끼",
      };
      const updatedValue = getUpdateValue(initialValue, "아라곤", "안두릴");

      expect(updatedValue).toEqual({
        아라곤: "안두릴",
        레골라스: "갈라드리엘의 활",
        김리: "도끼",
      });
    });

    test("getListItemById => id값에 해당하는 객체를 찾습니다.", () => {
      const initialValue = [
        { id: "티리엘", type: "대천사" },
        { id: "메피스토", type: "대악마" },
        { id: "아마존", type: "제프 베이조스" },
      ];

      const findValue = getListItemById(initialValue, "티리엘");

      expect(findValue?.type).toBe("대천사");
    });

    test("removeItemByIndex => index값에 해당하는 항목을 삭제하고 반환합니다.", () => {
      const initialValue = ["티리엘", "말티엘", "임페리우스", "아우리엘", "이테리엘"];
      const remainedValue = removeItemByIndex(initialValue, 1);

      expect(remainedValue).toEqual(["티리엘", "임페리우스", "아우리엘", "이테리엘"]);
    });
  });
});
