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
        }),
        getAllCarts: builder.query({
            query: () => ({
                url: "/carts"
            })
        }),
        getCartById: builder.query({
            query: (id) => ({
                url: `/carts/${id}`
            })
        }),
        getCartByUser: builder.query({
            query: (userId) => ({
                url: `/carts/user/${userId}`
            })
        }),
        addNewCart: builder.mutation({
            query: (body) => ({
                url: "/carts",
                method: "POST",
                body
            })
        }),
        updateCart: builder.mutation({
            query: ({ body, id }) => ({
                url: `/carts/${id}`,
                method: "PUT",
                body
            })
        }),
        deleteCart: builder.mutation({
            query: (id) => ({
                url: `/carts/${id}`,
                method: "DELETE"
            })
        })
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useGetUserQuery,
    useGetAllProductsQuery,
    useGetProductsByIdQuery,
    useGetAllCategoriesQuery,
    useGetProductsByCategoryQuery,
    useLimitProductsBySelectionQuery,
    useSortProductsBySelectionQuery,
    useUpdateProductByIdMutation,
    useGetAllCartsQuery,
    useGetCartByIdQuery,
    useGetCartByUserQuery,
    useAddNewCartMutation,
    useUpdateCartMutation,
    useDeleteCartMutation
} = api;