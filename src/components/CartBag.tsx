import { setCartSheetOpen } from "@/app/features/cart/cartSlice";
import { setCartBtnInfo } from "@/app/features/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect, useRef } from "react";
import { FaShopify } from "react-icons/fa";

type Props = {};

const CartBag = (props: Props) => {
    const { carts } = useAppSelector(state => state.cart);

    const cartBtnRef = useRef<HTMLButtonElement | null>(null);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if (cartBtnRef.current) {
          const { width, height, top, left } = cartBtnRef.current.getBoundingClientRect();
          dispatch(
            setCartBtnInfo({ width, height, top, left })
          );
        }
      }, [dispatch]);
    

    return (
        <button
            ref={cartBtnRef}
            onClick={() => dispatch(setCartSheetOpen(true))}
            type="button"
            className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white bg-gray-800 rounded-xl hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        >
            <FaShopify className=" text-xl" />
            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-gray-700 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                {carts.length}
            </div>
        </button>
    );
};

export default CartBag;
