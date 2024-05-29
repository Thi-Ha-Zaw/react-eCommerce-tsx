import { Product } from "@/app/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";


export interface ProductState {
    products: Product[];
    allProducts: Product[];
    category: string;
    searchedKeyword: string;
    
}

const initialState: ProductState = {
    products: [],
    allProducts: [],
    category: "",
    searchedKeyword: "",
   
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
        
    },
});

// Action creators are generated for each case reducer function
export const {
    setProducts,
    setAllProducts,
    setCategory,
    setSearchedKeyword,
    
} = productSlice.actions;

export default productSlice.reducer;
