import { useGetProductCategoriesQuery } from "@/app/services/product/productApi";
import Category from "./Category";
import { Skeleton } from "../ui/skeleton";
import { Fade } from "react-awesome-reveal";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setProducts } from "@/app/features/product/productSlice";

type Props = {};

const Categories = (props: Props) => {
    const { data: allCategories, isLoading: isCategoryLoading } =
        useGetProductCategoriesQuery();
    const { allProducts } = useAppSelector((state) => state.product);
    const dispatch = useAppDispatch();
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const handleSelectedAllBtn = (): void => {
        setSelectedCategory("");
        dispatch(setProducts(allProducts));
    };

    return (
        <div className="mb-10">
            <div className="no-scrollbar flex gap-3 overflow-x-auto text-nowrap md:justify-center">
                {isCategoryLoading ? (
                    <>
                        {Array.from({ length: 5 }, (_, i) => i).map((_, i) => (
                            <Skeleton key={i} className="h-6 w-[100px]" />
                        ))}
                    </>
                ) : (
                    <Fade>
                        <button
                            onClick={handleSelectedAllBtn}
                            className={`border px-8 py-1 shadow-sm ${
                                selectedCategory
                                    ? "hover:bg-gray-800 hover:text-gray-50"
                                    : "bg-gray-800 text-gray-50"
                            } rounded text-sm duration-300 active:scale-75`}
                        >
                            All
                        </button>

                        {allCategories?.map((category, index) => (
                            <Category
                                allProducts={allProducts}
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory}
                                key={index}
                                category={`${category[0].toUpperCase()}${category.slice(1)}`}
                            />
                        ))}
                    </Fade>
                )}
            </div>
        </div>
    );
};

export default Categories;
