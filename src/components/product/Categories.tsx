import { useGetProductCategoriesQuery } from "@/app/services/product/productApi";
import Category from "./Category";
import { Skeleton } from "../ui/skeleton";
import { Fade } from "react-awesome-reveal";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { setProducts } from "@/app/features/product/productSlice";

type Props = {};

const Categories = (props: Props) => {
    const { data: allCategories, isLoading: isCategoryLoading } =
        useGetProductCategoriesQuery();

    const { allProducts } = useAppSelector(state => state.product);

    const dispatch = useAppDispatch();

    const [selectedCategory, setSelectedCategory] = useState<string>("");

    const handleSelectedAllBtn = (): void => {
        setSelectedCategory("");
        dispatch(setProducts(allProducts));
    };

    return (
        <div className=" mb-10 flex justify-center gap-3">
            {isCategoryLoading ? (
                <>
                    {Array.from({ length: 5 }, (_, i) => i).map((_, i) => (
                        <Skeleton key={i} className=" w-[100px] h-6" />
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
