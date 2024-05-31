import type { Product } from "@/app/types";
import { MouseEvent, useRef, useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Button } from "../ui/button";
import { Fade } from "react-awesome-reveal";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setCarts } from "@/app/features/cart/cartSlice";
import {
    setAllProducts,
    setProducts,
} from "@/app/features/product/productSlice";
import Swal from "sweetalert2";


type Props = {
    product: Product;
};

const Product = ({ product }: Props) => {
    const [isHover, setIsHover] = useState(false);


    const imgRef = useRef<HTMLImageElement | null>(null);

    const { carts } = useAppSelector(state => state.cart);
    const { products, allProducts } = useAppSelector(state => state.product);

    const dispatch = useAppDispatch();

    const updatedProducts = (product: Product,isInCart : boolean): void => {
        const updatedProducts = products.map(pd =>
            pd.id === product.id ? { ...pd, isInCart: isInCart } : pd
        );

        const updatedAllProducts = allProducts.map(pd =>
            pd.id == product.id ? { ...pd, isInCart: isInCart } : pd
        );

        dispatch(setProducts(updatedProducts));
        dispatch(setAllProducts(updatedAllProducts));
    };

    const handleAddToCartBtnClick = async (
        event: MouseEvent<HTMLButtonElement>,
        product: Product
    ) => {
       
        if (product.isInCart) {
            const isConfirmed = await confirmRemoval();
            if (!isConfirmed) return;

            updatedProducts(product,false)
            const updatedCarts = carts.filter(cart => cart.id !== product.id);
            dispatch(setCarts(updatedCarts));
        } else {
           
            updatedProducts(product,true)
            const updatedCarts = [...carts, { ...product, quantity: 1 }];

            dispatch(setCarts(updatedCarts));
            animateAddToCart(event);
        }

       
    };

    const confirmRemoval = async () => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "question",
            iconColor: "#1f2937",
            showCancelButton: true,
            confirmButtonColor: "#1f2937",
            cancelButtonColor: "#1f2937",
            confirmButtonText: "Confirm",
        });

        return result.isConfirmed;
    };

    const animateAddToCart = (event: MouseEvent<HTMLButtonElement>) => {
        // Get the image element and its position
        const imgElement = event.currentTarget
            .closest(".product-card")
            ?.querySelector("img") as HTMLImageElement;
        if (!imgElement) return;

        const imgRect = imgElement.getBoundingClientRect();

        // Clone the image and set its initial position
        const clonedImg = imgElement.cloneNode(true) as HTMLImageElement;
        clonedImg.style.position = "fixed";
        clonedImg.style.top = `${imgRect.top}px`;
        clonedImg.style.left = `${imgRect.left}px`;
        clonedImg.style.width = `${imgRect.width}px`;
        clonedImg.style.height = `${imgRect.height}px`;
        clonedImg.style.transition = "all 0.5s ease";
        clonedImg.style.zIndex = "1000"; // Ensure it's above other elements

        document.body.appendChild(clonedImg);

        // Set the target position (e.g., cart icon position)
        const cartIcon = document.querySelector(".cart-icon");
        const cartBtnInfo = cartIcon?.getBoundingClientRect();

        const keyframe = [
            {
                top: imgRect?.top + "px",
                left: imgRect?.left + "px",
            },
            {
                top: cartBtnInfo?.top + "px",
                left: cartBtnInfo?.left + "px",
                width: 10 + "px",
                height: 10 + "px",
                rotate: "2turn",
            },
        ];

        const options: KeyframeAnimationOptions = {
            duration: 700,
            iterations: 1,
            fill: "both",
        };

        const animation = clonedImg.animate(keyframe, options);

        // Remove the cloned image after the animation
        animation.addEventListener("finish", () => {
            clonedImg.remove();
        });
    };

    return (
        <Fade>
            <div
                className=" group product-card"
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                <img
                    ref={imgRef}
                    src={product.image}
                    className=" h-32 -mb-16 ms-5 group-hover:-rotate-6 duration-300"
                    alt=""
                />
                
                <div
                    className=" shadow group-hover:shadow-2xl duration-300 rounded-lg p-5 "
                    style={{ transform: isHover ? "rotateX(25deg)" : "" }}
                >
                    <div className=" flex flex-col gap-2 pt-16">
                        <p className=" font-bold font-roboto_condensed line-clamp-1">
                            {product.title}
                        </p>
                        <p className=" text-xs line-clamp-3">
                            {product.description}
                        </p>
                        <div className=" flex justify-between mt-3">
                            <div className=" flex gap-1 items-center">
                                {Array.from({ length: 5 }, (_, i) =>
                                    i < Math.ceil(product.rating.rate) ? (
                                        <FaStar key={i} />
                                    ) : (
                                        <FaRegStar key={i} />
                                    )
                                )}
                            </div>
                            <div>
                                (<span>{product.rating.rate}</span>/
                                <span>{product.rating.count}</span>)
                            </div>
                        </div>
                    </div>
                    <hr className=" border-gray-700 my-5" />
                    <div className=" flex justify-between items-center">
                        <p className=" font-bold text-lg">
                            $<span>{product.price}</span>
                        </p>
                        <div>
                            <Button
                                // disabled={product.isInCart}
                                onClick={e => handleAddToCartBtnClick(e, product)}
                                size={"sm"}
                                variant={
                                    product.isInCart ? "default" : "outline"
                                }
                                className=" text-xs"
                            >
                                Add To Cart
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Fade>
    );
};

export default Product;
