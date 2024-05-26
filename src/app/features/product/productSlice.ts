import { Product } from "@/app/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ProductState {
    products: Product[];
    allProducts: Product[];
}

const initialState: ProductState = {
    products: [],
    allProducts: [],
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProducts: (state, { payload}: PayloadAction<Product[]>) => {
            state.products = payload;
        },
        setAllProducts: (state, { payload}: PayloadAction<Product[]>) => {
            state.allProducts = payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setProducts,setAllProducts } = productSlice.actions;

export default productSlice.reducer;
