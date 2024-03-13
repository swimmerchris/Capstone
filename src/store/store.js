import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api/api";
import cartSlice from "../cartState/cartSlice";

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        cart: cartSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})