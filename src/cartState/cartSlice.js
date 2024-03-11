import { createSlice } from "@reduxjs/toolkit";

const productCarts = localStorage.getItem("carts") !== null ? JSON.parse(localStorage.getItem("carts")) : [];

const cartTotal = localStorage.getItem("cartTotal") !== null ? JSON.parse(localStorage.getItem("cartTotal")) : 0;

function updateStorage(cartProducts, cartTotal) {
    localStorage.setItem("carts", JSON.stringify(cartProducts));
    localStorage.setItem("cartTotal", JSON.stringify(cartTotal))
}

const initialState = {
    cartProducts: productCarts.products,
    cartTotal,
};

const cartSlice = createSlice({
    name: "cartUpdates",
    initialState,
    reducers: {
        addProduct(state, action) {
            const productItem = action.payload;
            const exsitingProduct = cartProducts.find((product) => productItem.id === product.id);

            if (!exsitingProduct) {
                state.cartProducts.push({
                    id: productItem.id,
                    title: productItem.title,
                    price: productItem.price,
                    description: productItem.description,
                    catergory: productItem.catergory,
                    image: productItem.image,
                    rating: productItem.rating,
                    quantity: 1,
                    totalCost: productItem.price,
                })
            } else {
                exsitingProduct.quantity++;
                exsitingProduct.totalPrice = exsitingProduct.totalCost + productItem.price;
            }

            state.cartTotal = state.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0)

            updateStorage(state.cartProducts, state.cartTotal)

        },
        reduceProduct(state, action) {
            const productId = action.payload;
            const exsitingProduct = cartProducts.find((product) => productItem.id === product.id);

            if (exsitingProduct.quantity === 1) {
                state.cartProducts = state.cartProducts.filter((currentProduct) => currentProduct.id != productId);
            } else {
                exsitingProduct.quantity--;
                exsitingProduct.totalCost = exsitingProduct.totalPrice - exsitingProduct.price;
            }

            state.cartTotal = state.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0)

            updateStorage(state.cartProducts, state.cartTotal)

        },
        deleteProduct(state, action) {
            const productId = action.payload;
            const exsitingProduct = cartProducts.find((product) => productItem.id === product.id);

            if (exsitingProduct) {
                state.cartProducts = state.cartProducts.filter((currentProduct) => currentProduct.id != productId);
            }

            state.cartTotal = state.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0)

            updateStorage(state.cartProducts, state.cartTotal)

        }
    }
})

export const { addProduct, reduceProduct, deleteProduct } = cartSlice.actions

export default cartSlice.reducer;