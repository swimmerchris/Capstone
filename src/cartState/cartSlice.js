import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const cartSlice = createSlice({
    name: "cartUpdates",
    initialState,
    reducers: {
        addProduct(state, action) {

        },
        removeProduct(state, action) {

        },
        deleteProduct(state, action) {

        }
    }
})

export const { } = cartSlice.actions

export default cartSlice.reducer;