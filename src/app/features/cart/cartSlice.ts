import { Product } from "@/app/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartState {
    carts: Required<Product>[];
    allCarts: Required<Product>[];
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
        setCarts: (state, { payload }: PayloadAction<Required<Product>[]>) => {
            state.carts = payload;
        },
        setAllCarts: (
            state,
            { payload }: PayloadAction<Required<Product>[]>
        ) => {
            state.allCarts = payload;
        },
        setCartSheetOpen: (state, { payload }: PayloadAction<boolean>) => {
            state.isCartSheetOpen = payload;
        },
        increaseQuantity: (
            state,
            { payload }: PayloadAction<Required<Product>>
        ) => {
            const currentCart = state.carts.find(ct => ct.id == payload.id);
            if (currentCart) {
                currentCart.quantity += 1;
                currentCart.price = parseFloat(
                    (
                        currentCart.price +
                        currentCart.price / (currentCart.quantity - 1)
                    ).toFixed(2)
                );
            }
        },
        decreaseQuantity: (
            state,
            { payload }: PayloadAction<Required<Product>>
        ) => {
            const currentCart = state.carts.find(ct => ct.id == payload.id);

            if (currentCart && currentCart.quantity > 1) {
                currentCart.quantity -= 1;
                currentCart.price = parseFloat(
                    (
                        currentCart.price -
                        currentCart.price / (currentCart.quantity + 1)
                    ).toFixed(2)
                );
            }
        },
        removCart: (state, { payload }: PayloadAction<Required<Product>>) => {
            state.carts = state.carts.filter(ct => ct.id != payload.id);
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    setCarts,
    setAllCarts,
    setCartSheetOpen,
    increaseQuantity,
    decreaseQuantity,
    removCart,
} = cartSlice.actions;

export default cartSlice.reducer;
