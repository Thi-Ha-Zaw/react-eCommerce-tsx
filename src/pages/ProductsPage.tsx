import {
    setAllProducts,
    setProducts,
} from "@/app/features/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useGetProductsQuery } from "@/app/services/product/productApi";
import ProductCardLoader from "@/components/loader/ProductCardLoader";
import Categories from "@/components/product/Categories";
import Product from "@/components/product/Product";
import { useEffect } from "react";

type Props = {};

const ProductsPage = (props: Props) => {
    const { data, isLoading } = useGetProductsQuery();

    const dispatch = useAppDispatch();

    const { products } = useAppSelector(state => state.product);

   
   

    useEffect(() => {
        data && dispatch(setProducts(data));
        data && dispatch(setAllProducts(data));
    }, [data]);

    return (
        <div className=" container mx-auto my-10">
            <Categories />
            <div
                className={` grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ${
                    isLoading ? " gap-y-5 sm:gap-3" : " gap-y-5 sm:gap-8"
                }`}
            >
                {isLoading && (
                    <>
                        {Array.from({ length: 8 }, (_, i) => i).map((_, i) => (
                            <ProductCardLoader key={i} />
                        ))}
                    </>
                )}
                {products?.map(product => (
                    <Product
                        
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </div>
    );
};

export default ProductsPage;
