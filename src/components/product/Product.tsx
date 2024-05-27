import type { Product } from "@/app/types";
import { useState } from "react";
import { FaRegStar, FaStar } from "react-icons/fa";
import { Button } from "../ui/button";
import { Fade } from "react-awesome-reveal";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setCarts } from "@/app/features/cart/cartSlice";
import {
    setAllProducts,
    setProducts,
} from "@/app/features/product/productSlice";

type Props = {
    product: Product;
};

const Product = ({ product }: Props) => {
    const [isHover, setIsHover] = useState(false);

    const { carts } = useAppSelector(state => state.cart);
    const { products } = useAppSelector(state => state.product);

    const dispatch = useAppDispatch();

    const handleAddToCart = (): void => {
        const updatedProducts = products.map(pd =>
            pd.id == product.id ? { ...pd, isInCart: true } : pd
        );

        dispatch(setProducts(updatedProducts));
        dispatch(setAllProducts(updatedProducts));

        const updatedCarts = [...carts, product];

        dispatch(setCarts(updatedCarts));
    };

    return (
        <Fade>
            <div
                className=" group"
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
            >
                <img
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
                                (<span>{product.rating.rate}</span> /
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
                                disabled={product.isInCart}
                                onClick={handleAddToCart}
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
