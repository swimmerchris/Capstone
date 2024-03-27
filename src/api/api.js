import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// API slice that handles interactions with the fakestoreapi
export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: "https://fakestoreapi.com/"
    }),
    tagTypes: ["User", "Product", "Category", "Cart"],
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
            }),
            providesTags: ["User"]
        }),
        getAllProducts: builder.query({
            query: () => ({
                url: "/products",
            }),
            providesTags: ["Product"]
        }),
        getProductsById: builder.query({
            query: (id) => ({
                url: `/products/${id}`,
                method: "GET"
            }),
            providesTags: ["Product"],
        }),
        getAllCategories: builder.query({
            query: () => ({
                url: `/products/categories`
            }),
            providesTags: ["Category"]
        }),
        getProductsByCategory: builder.query({
            query: (category) => ({
                url: `/products/category/${category}`
            }),
            providesTags: ["Category"]
        }),
        limitProductsBySelection: builder.query({
            query: (limitAmount) => ({
                url: `/products?limit=${limitAmount}`
            }),
            providesTags: ["Product"],
        }),
        sortProductsBySelection: builder.query({
            query: (sortSelection) => ({
                url: `/products?sort=${sortSelection}`
            }),
            providesTags: ["Product"],
        }),
        updateProductById: builder.mutation({
            query: (id) => ({
                url: `/products/${id}`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["Product"],
        }),
        getAllCarts: builder.query({
            query: () => ({
                url: "/carts"
            }),
            providesTags: ["Cart"],
        }),
        getCartById: builder.mutation({
            query: (id) => ({
                url: `/carts/${id}`,
                method: "GET",
                body
            }),
            providesTags: ["Cart"],
        }),
        getCartByUser: builder.mutation({
            query: (userId) => ({
                url: `/carts/user/${userId}`,
                method: "GET",
            }),
            // providesTags: ["Cart"],
        }),
        addNewCart: builder.mutation({
            query: (body) => ({
                url: "/carts",
                method: "POST",
                body
            }),
            invalidatesTags: ["Cart"]
        }),
        updateCart: builder.mutation({
            query: ({ body, id }) => ({
                url: `/carts/${id}`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["Cart"]
        }),
        deleteCart: builder.mutation({
            query: (id) => ({
                url: `/carts/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Cart"]
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
    useGetCartByIdMutation,
    useGetCartByUserMutation,
    useAddNewCartMutation,
    useUpdateCartMutation,
    useDeleteCartMutation
} = api;