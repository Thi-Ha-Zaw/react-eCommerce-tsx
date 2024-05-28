import { DomRectInfo, Product } from "@/app/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


export interface ProductState {
    products: Product[];
    allProducts: Product[];
    category: string;
    searchedKeyword: string;
    cartBtnInfo: DomRectInfo | null;
}

const initialState: ProductState = {
    products: [],
    allProducts: [],
    category: "",
    searchedKeyword: "",
    cartBtnInfo: { width: 0, height: 0, top: 0, left: 0 },
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProducts: (state, { payload }: PayloadAction<Product[]>) => {
            state.products = payload;
        },
        setAllProducts: (state, { payload }: PayloadAction<Product[]>) => {
            state.allProducts = payload;
        },
        setCategory: (state, { payload }: PayloadAction<string>) => {
            state.category = payload;
        },
        setSearchedKeyword: (state, { payload }: PayloadAction<string>) => {
            state.searchedKeyword = payload;
        },
        setCartBtnInfo: (state, { payload }: PayloadAction<DomRectInfo | null>) => {
            state.cartBtnInfo = payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    setProducts,
    setAllProducts,
    setCategory,
    setSearchedKeyword,
    setCartBtnInfo,
} = productSlice.actions;

export default productSlice.reducer;
