import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/product/productSlice";
import { productApi } from "./services/product/productApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        product: productSlice,
        [productApi.reducerPath]: productApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat([productApi.middleware]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch)
