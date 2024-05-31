import { setProducts, setSearchedKeyword } from "@/app/features/product/productSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { ChangeEvent, useState } from "react";

type Props = {};

const SearchBar = (props: Props) => {
    const [keyword, setKeyword] = useState("");

    const { allProducts, category } = useAppSelector(state => state.product);

    const dispatch = useAppDispatch();

    const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setKeyword(e.target.value);
        dispatch(setSearchedKeyword(e.target.value.toLowerCase()))
        const searchKeyword = e.target.value.toLowerCase();
        const filterProducts = allProducts.filter(product =>
            category
                ? (product.description.toLowerCase().includes(searchKeyword) ||
                      product.title.toLowerCase().includes(searchKeyword)) &&
                  product.category == category
                : product.description.toLowerCase().includes(searchKeyword) ||
                  product.title.toLowerCase().includes(searchKeyword)
        );
        dispatch(setProducts(filterProducts));
    };

    return (
        <div>
            <input
                type="text"
                value={keyword}
                onChange={handleKeywordChange}
                className=" hidden sm:inline-block border-b-2 border-gray-500 outline-none px-3 py-1"
            />
        </div>
    );
};

export default SearchBar;
