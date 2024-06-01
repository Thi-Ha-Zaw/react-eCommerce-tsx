import { setCartSheetOpen } from "@/app/features/cart/cartSlice";

import { useAppDispatch, useAppSelector } from "@/app/hooks";

import { FaShopify } from "react-icons/fa";



const CartBag = () => {
    const { carts } = useAppSelector(state => state.cart);

    const dispatch = useAppDispatch();

    return (
        <button
            onClick={() => dispatch(setCartSheetOpen(true))}
            type="button"
            className=" cart-icon relative  inline-flex items-center p-3 text-sm font-medium text-center text-white bg-gray-800 rounded-xl hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        >
            <FaShopify className=" text-xl" />
            <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-gray-700 border-2 border-white rounded-full -top-2 -end-2 dark:border-gray-900">
                {carts.length}
            </div>
        </button>
    );
};

export default CartBag;
