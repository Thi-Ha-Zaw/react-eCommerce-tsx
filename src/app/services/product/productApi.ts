// Need to use the React-specific entry point to import createApi
import { Product } from "@/app/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const productApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://fakestoreapi.com/" }),
    tagTypes: ["product"],
    endpoints: builder => ({
        getProducts: builder.query<Product[],void>({
            query: () => `products`,
            providesTags: ["product"],
        }),
        getProductCategories: builder.query<string[],void>({
            query: () => `products/categories`,
            providesTags: ["product"],
        }),
    }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetProductsQuery,useGetProductCategoriesQuery} = productApi;
