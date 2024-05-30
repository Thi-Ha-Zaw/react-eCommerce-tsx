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
import { useEffect, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { FaTrash } from "react-icons/fa";
import { FiMinus } from "react-icons/fi";
import { GoPlus } from "react-icons/go";

type Props = {
    cart: Required<Product>;
};

const Cart = ({ cart }: Props) => {
    const dispatch = useAppDispatch();

    const [clones, setClones] = useState<
        Array<{
            id: number;
            left: number;
            top: number;
            width: number;
            height: number;
        }>
    >([]);

    console.log(clones);

    const { products, allProducts } = useAppSelector(state => state.product);

    useEffect(() => {
        const cartItem = document.querySelector(
            `div[cart-item-id='${cart.id}']`
        ) as HTMLDivElement;
        const imgElement = document.querySelector(
            `.cart-item img[data-id='${cart.id}']`
        ) as HTMLImageElement;
        if (!imgElement) return;

        const imgRect = imgElement.getBoundingClientRect();

        // Update clones when quantity changes
        if (cartItem) {
            const currentClones = [];
            for (let i = 0; i < cart.quantity - 1; i++) {
                const offset = i * (imgRect.width / 2);
                currentClones.push({
                    id: i,
                    left:
                        imgRect.left -
                        cartItem.getBoundingClientRect().left +
                        offset,
                    top: imgRect.top - cartItem.getBoundingClientRect().top,
                    width: imgRect.width,
                    height: imgRect.height,
                });
            }
            setClones(currentClones);
        }
    }, []);

    const animateQuantityAdded = () => {
        const cartItem = document.querySelector(
            `div[cart-item-id='${cart.id}']`
        ) as HTMLDivElement;

        const imgElement = document.querySelector(
            `.cart-item img[data-id='${cart.id}']`
        ) as HTMLImageElement;
        if (!imgElement) return;

        const imgRect = imgElement.getBoundingClientRect();
        const cloneIndex = clones.length;

        const offset = (imgRect.width / 2) * cloneIndex;

        // Add the new clone to the list of clones
        setClones(prevClones => [
            ...prevClones,
            {
                id: cloneIndex,
                left:
                    imgRect.left -
                    cartItem.getBoundingClientRect().left +
                    offset,
                top: imgRect.top - cartItem.getBoundingClientRect().top,
                width: imgRect.width,
                height: imgRect.height,
            },
        ]);
    };

    const handleAddQuantity = (): void => {
        dispatch(increaseQuantity(cart));
        animateQuantityAdded();
    };

    const removeLastClone = () => {
        if (clones.length === 0) return;
        const lastClone = clones[clones.length - 1];
        console.log(lastClone.id);
        const cloneElement = document.querySelector(
            `img[data-id='${cart?.id}'][data-clone-id='${lastClone?.id}']`
        ) as HTMLImageElement;
        if (!cloneElement) return;

        cloneElement.classList.replace(
            "animate__rotateInDownRight",
            "animate__rotateOutUpRight"
        ); // Fade out the last clone

        cloneElement.addEventListener("animationend", () => {
            

            const updatedClones = clones.filter(cl => cl.id != lastClone.id);

            setClones(updatedClones); // Remove from state
           
        },{once : true});

       
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
            dispatch(removCart(cart));

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
                className={` cart-item group animate__animated relative `}
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
                {clones.map(clone => (
                    <img
                        key={clone.id}
                        data-id={cart.id}
                        data-clone-id={clone.id}
                        src={cart.image}
                        style={{
                            position: "absolute",
                            top: `${clone.top}px`,
                            left: `${clone.left}px`,
                            width: `${clone.width}px`,
                            height: `${clone.height}px`,
                            zIndex: 1000,
                            transition: "all 0.5s ease",
                        }}
                        className=" ms-5 animate__animated animate__rotateInDownRight clone"
                    />
                ))}
            </div>
        </Fade>
    );
};

export default Cart;
