import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { build } from "vite";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://fakestoreapi.com/"
    }),
    tagTypes: ["User", "Product", "Cart"],
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (body) => ({
                url: "/users/",
                method: "POST",
                body,
            }),
            providesTags: ["User"],
        }),
        login: builder.mutation({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body,
            }),
            providesTags: ["User"],
        }),
        getUser: builder.query({
            query: (token) => ({
                url: "/users",
                headers: {
                    authorization: `Bearer ${token}`,
                }
            })
        }),
        getAllProducts: builder.query({
            query: () => ({
                url: "/products",
            })
        }),
        getProductsById: builder.query({
            query: ({ id }) => ({
                url: `/products/${id}`
            }),
            providesTags: ["Product"],
        }),
        getAllCategories: builder.query({
            query: () => ({
                url: `/products/categories`
            })
        }),
        getProductsByCategory: builder.query({
            query: (category) => ({
                url: `/products/category/${category}`
            })
        }),
        limitProductsBySelection: builder.query({
            query: (limitAmount) => ({
                url: `/products?limit=${limitAmount}`
            })
        }),
        sortProductsBySelection: build.query({
            query: (sortSelection) => ({
                url: `/products?sort=${sortSelection}`
            })
        }),
        updateProductById: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: "PUT",
                body
            })
        })




    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useGetUserQuery,
    useGetProductsByIdQuery
} = api;