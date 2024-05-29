import {
    decreaseQuantity,
    increaseQuantity,
    removCart,
} from "@/app/features/cart/cartSlice";
import {
    setAllProducts,
    setProducts,
} from "@/app/features/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Product } from "@/app/types";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { FaTrash } from "react-icons/fa";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";

type Props = {
    cart: Required<Product>;
};

const Cart = ({ cart }: Props) => {
    const dispatch = useAppDispatch();

    const [deletedPdId, setDeletedPdId] = useState("");

    const { products,allProducts } = useAppSelector(state => state.product);

    const handleAddQuantity = (): void => {
        dispatch(increaseQuantity(cart));
    };

    const handleSubQuantity = (): void => {
        dispatch(decreaseQuantity(cart));
    };

    const handleDeleteCart = (): void => {
        dispatch(removCart(cart));
        const updatedProducts = products.map(pd =>
            pd.id == cart.id ? { ...pd, isInCart: false } : pd
        );

        const updatedAllProducts = allProducts.map(pd =>
            pd.id == cart.id ? { ...pd, isInCart: false } : pd
        );

        dispatch(setProducts(updatedProducts));
        dispatch(setAllProducts(updatedAllProducts));
    };
    return (
        <Fade>
            <div
                onAnimationEnd={handleDeleteCart}
                className={` group animate__animated ${
                    deletedPdId == cart.id ? "animate__hinge" : ""
                }`}
            >
                <img
                    src={cart.image}
                    className=" h-12 -mb-5 ms-5 group-hover:-rotate-6 duration-300"
                    alt=""
                />
                <div className=" shadow  rounded-lg p-5 relative">
                    <button
                        onClick={() => setDeletedPdId(cart.id)}
                        className=" absolute top-3 right-3"
                    >
                        <FaTrash className=" text-xs text-red-500" />
                    </button>
                    <div className=" pt-3">
                        <p className=" font-bold text-sm font-roboto_condensed line-clamp-1">
                            {cart.title}
                        </p>
                    </div>

                    <div className=" flex justify-between items-center mt-4">
                        <p className=" font-bold text-sm">
                            $<span>{cart.price}</span>
                        </p>
                        <div>
                            <div className=" group flex items-center gap-2">
                                <button
                                    onClick={handleSubQuantity}
                                    className=" bg-gray-100 rounded-xl p-1  group-hover:pointer-events-auto  group-hover:translate-x-0 group-hover:opacity-100 pointer-events-none opacity-0 -translate-x-3 duration-300"
                                >
                                    <FiMinus className=" text-xs" />
                                </button>
                                <p>{cart.quantity}</p>
                                <button
                                    onClick={handleAddQuantity}
                                    className=" bg-gray-100 rounded-xl p-1  group-hover:pointer-events-auto  group-hover:translate-x-0 group-hover:opacity-100 pointer-events-none opacity-0 translate-x-3 duration-300"
                                >
                                    <GoPlus className=" text-xs" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fade>
    );
};

export default Cart;
