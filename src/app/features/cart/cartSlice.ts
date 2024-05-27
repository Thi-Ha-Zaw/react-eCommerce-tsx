import { Product } from "@/app/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
    carts: Product[];
    allCarts: Product[];
    isCartSheetOpen: boolean;
}

const initialState: CartState = {
    carts: [],
    allCarts: [],
    isCartSheetOpen: false,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCarts: (state, { payload }: PayloadAction<Product[]>) => {
            state.carts = payload;
        },
        setAllCarts: (state, { payload }: PayloadAction<Product[]>) => {
            state.allCarts = payload;
        },
        setCartSheetOpen: (state, { payload }: PayloadAction<boolean>) => {
            state.isCartSheetOpen = payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setCarts, setAllCarts, setCartSheetOpen } = cartSlice.actions;

export default cartSlice.reducer;
