import { setProducts } from "@/app/features/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Product } from "@/app/types";
import { Dispatch, SetStateAction } from "react";

type Props = {
    category: string;
    selectedCategory: string;
    setSelectedCategory: Dispatch<SetStateAction<string>>;
    allProducts: Product[];
};

const Category = ({
    category,
    selectedCategory,
    setSelectedCategory,
    allProducts,
}: Props) => {
    const { searchedKeyword } = useAppSelector(state => state.product);

    const dispatch = useAppDispatch();
    const handleSelectedCategory = (category: string): void => {
        const filterProducts = allProducts.filter(product =>
            searchedKeyword
                ? (product.description
                      .toLowerCase()
                      .includes(searchedKeyword) ||
                      product.title.toLowerCase().includes(searchedKeyword)) &&
                  product.category.toLowerCase() == category
                : product.category.toLowerCase() == category
        );
        dispatch(setProducts(filterProducts));
        setSelectedCategory(category);
    };
    return (
        <button
            onClick={() => handleSelectedCategory(category)}
            className={` px-8 py-1 shadow-sm border ${
                selectedCategory == category
                    ? "bg-gray-800 text-gray-50"
                    : " hover:bg-gray-800 hover:text-gray-50"
            } duration-300 active:scale-75 rounded text-sm`}
        >
            {category}
        </button>
    );
};

export default Category;
