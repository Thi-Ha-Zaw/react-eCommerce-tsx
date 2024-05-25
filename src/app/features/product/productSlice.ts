import { Product } from "@/app/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ProductState {
    products: Product[];
    isTrue: boolean;
}

const initialState: ProductState = {
    products: [],
    isTrue : false
};

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
        },

        setTrue: (state, {payload}) => {
            state.isTrue = payload;
        }
    },
});

// Action creators are generated for each case reducer function
export const {setProducts,setTrue} = productSlice.actions;

export default productSlice.reducer;
