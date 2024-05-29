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
    const [clones, setClones] = useState<HTMLImageElement[]>([]);

    console.log(clones);

    const { products, allProducts } = useAppSelector(state => state.product);

    const animateQuantityAdded = () => {
        const cartItem = document.querySelector(
            `div[img-div-id='${cart.id}']`
        ) as HTMLDivElement;
        console.log(cartItem);
        const imgElement = document.querySelector(
            `.cart-item img[data-id='${cart.id}']`
        ) as HTMLImageElement;
        if (!imgElement) return;

        const imgRect = imgElement.getBoundingClientRect();
        const cloneIndex = clones.length;
        const offset = (imgRect.width / 2) * cloneIndex;

        const clonedImg = imgElement.cloneNode(true) as HTMLImageElement;
        clonedImg.style.position = "fixed";
        clonedImg.style.top = `${imgRect.top}px`;
        clonedImg.style.left = `${imgRect.left + offset}px`;
        clonedImg.style.width = `${imgRect.width}px`;
        clonedImg.style.height = `${imgRect.height}px`;
        clonedImg.style.transition = "all 0.5s ease";
        clonedImg.style.zIndex = "1000"; // Ensure it's above other elements
        clonedImg.classList.add(
            "animate__animated",
            "animate__rotateInDownRight",
            "clone"
        ); // Add animate.css classes and a custom class

        cartItem.appendChild(clonedImg);
        // Add the new clone to the list of clones
        setClones(prevClones => [...prevClones, clonedImg]);
    };

    const handleAddQuantity = (): void => {
        dispatch(increaseQuantity(cart));
        animateQuantityAdded();
    };

    const removeLastClone = () => {
        const lastClone = clones[clones.length - 1];
        if (lastClone) {
            lastClone.classList.replace(
                "animate__rotateInDownRight",
                "animate__rotateOutUpRight"
            ); // Fade out the last clone

            lastClone.addEventListener("animationend", () => {
                if (lastClone.parentNode) {
                    lastClone.remove();
                }
            });
            setClones(prevClones => prevClones.slice(0, -1)); // Remove from state
        }
    };

    const removeAllClones = () => {
        clones.forEach(clone => {
            clone.remove();
        });
        setClones([]); // Clear the clones state
    };

    const handleSubQuantity = (): void => {
        dispatch(decreaseQuantity(cart));
        removeLastClone();
    };

    const handleDeleteCart = (): void => {
        const cartItem = document.querySelector(
            `div[cart-item-id='${cart.id}']`
        ) as HTMLDivElement;
        cartItem.classList.add("animate__hinge");

        cartItem.addEventListener("animationend", () => {
            removeAllClones();

            dispatch(removCart(cart));
            // removeAllClones();

            const updatedProducts = products.map(pd =>
                pd.id == cart.id ? { ...pd, isInCart: false } : pd
            );

            const updatedAllProducts = allProducts.map(pd =>
                pd.id == cart.id ? { ...pd, isInCart: false } : pd
            );

            dispatch(setProducts(updatedProducts));
            dispatch(setAllProducts(updatedAllProducts));
        });
    };
    return (
        <Fade>
            <div
                cart-item-id={cart.id}
                // onAnimationEnd={handleDeleteCart}
                className={` cart-item group animate__animated `}
            >
                <div img-div-id={cart.id}>
                    <img
                        data-id={cart.id}
                        src={cart.image}
                        className=" h-10 -mb-5 ms-5 group-hover:-rotate-6 duration-300"
                        alt=""
                    />
                </div>
                <div className=" shadow  rounded-lg p-5 relative">
                    <button
                        onClick={handleDeleteCart}
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
