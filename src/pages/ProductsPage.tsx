import {
    setAllProducts,
    setProducts,
} from "@/app/features/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useEffect } from "react";
import { useGetProductsQuery } from "@/app/services/product/productApi";

import ProductCardLoader from "@/components/loader/ProductCardLoader";
import Categories from "@/components/product/Categories";
import Product from "@/components/product/Product";
import emptyProduct from "../images/emptyCart.svg";
import CartSheet from "@/components/cart/CartSheet";

type Props = {};

const ProductsPage = (props: Props) => {
    const { data, isLoading } = useGetProductsQuery();

    const dispatch = useAppDispatch();

    const { products } = useAppSelector(state => state.product);


    useEffect(() => {
        if (data) {
            
            const productsArr = data.map(pd => ({ ...pd, isInCart: false }));
            dispatch(setProducts(productsArr));
            dispatch(setAllProducts(productsArr));
        }
    }, [data]);

    return (
        <div className=" container mx-auto my-10">
            <Categories />
            <div
                className={` grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 justify-items-center ${
                    isLoading ? " gap-y-5 sm:gap-5" : " gap-y-5 sm:gap-8"
                }`}
            >
                {isLoading && (
                    <>
                        {Array.from({ length: 8 }, (_, i) => i).map((_, i) => (
                            <ProductCardLoader key={i} />
                        ))}
                    </>
                )}
                {products.length > 0 ? (
                    products?.map(product => (
                        <Product key={product.id} product={product} />
                    ))
                ) : (
                    <>
                        <div className=" col-span-1 sm:col-span-2 lg:col-span-4 flex justify-center items-center mt-20">
                            <div className=" flex flex-col gap-7 sm:shadow rounded-lg px-5 sm:px-40 py-10">
                                <img
                                    className=" w-full sm:w-64"
                                    src={emptyProduct}
                                    alt=""
                                />
                                <p className=" text-lg ">
                                    Not Found ! There is no products
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <CartSheet />
        </div>
    );
};

export default ProductsPage;
