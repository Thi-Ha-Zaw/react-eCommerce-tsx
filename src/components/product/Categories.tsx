import { useGetProductCategoriesQuery } from "@/app/services/product/productApi";
import Category from "./Category";
import { Skeleton } from "../ui/skeleton";
import { Fade } from "react-awesome-reveal";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setCategory, setProducts } from "@/app/features/product/productSlice";



const Categories = () => {
    const { data: allCategories, isLoading: isCategoryLoading } =
        useGetProductCategoriesQuery();

    const { allProducts, searchedKeyword } = useAppSelector(
        state => state.product
    );

    const dispatch = useAppDispatch();

    const [selectedCategory, setSelectedCategory] = useState<string>("");

    const handleSelectedAllBtn = (): void => {
        setSelectedCategory("");
        const filterProducts = allProducts.filter(
            product =>
                product.description.toLowerCase().includes(searchedKeyword) ||
                product.title.toLowerCase().includes(searchedKeyword)
        );
        searchedKeyword ? dispatch(setProducts(filterProducts)) : dispatch(setProducts(allProducts));
    };

    useEffect(() => {
        dispatch(setCategory(selectedCategory));
    }, [selectedCategory]);

    return (
        <div className=" mb-10 flex justify-center gap-3 flex-wrap">
            {isCategoryLoading ? (
                <>
                    {Array.from({ length: 5 }, (_, i) => i).map((_, i) => (
                        <Skeleton key={i} className=" w-[120px] h-6" />
                    ))}
                </>
            ) : (
                <Fade>
                    <button
                        onClick={handleSelectedAllBtn}
                        className={` px-8 py-1 shadow-sm border ${
                            selectedCategory
                                ? "hover:bg-gray-800 hover:text-gray-50"
                                : "bg-gray-800 text-gray-50"
                        }  duration-300 active:scale-75 rounded text-sm`}
                    >
                        All
                    </button>

                    {allCategories?.map((category, index) => (
                        <Category
                            allProducts={allProducts}
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            key={index}
                            category={category}
                        />
                    ))}
                </Fade>
            )}
        </div>
    );
};

export default Categories;
