import { setProducts } from "@/app/features/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useGetProductsQuery } from "@/app/services/product/productApi";
import ProductCardLoader from "@/components/loader/ProductCardLoader";
import Product from "@/components/product/Product";
import { useEffect } from "react";

type Props = {};

const ProductsPage = (props: Props) => {
    const { data, isLoading } = useGetProductsQuery();
    const dispatch = useAppDispatch();

    const { products } = useAppSelector(state => state.product);

    useEffect(() => { 
        data && dispatch(setProducts(data))
    },[data])
    
    return (
        <div className=" container mx-auto my-10">
            <div className={` grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ${isLoading ? ' gap-y-5 sm:gap-3' : ' gap-y-5 sm:gap-8'}`}>
                {isLoading && (
                    <>
                        <ProductCardLoader />
                        <ProductCardLoader />
                        <ProductCardLoader />
                        <ProductCardLoader />
                        <ProductCardLoader />
                        <ProductCardLoader />
                        <ProductCardLoader />
                        <ProductCardLoader />
                    </>
                )}
                {
                    products?.map(product => <Product key={product.id} product={product} /> )
                }
            </div>
        </div>
    );
};

export default ProductsPage;
