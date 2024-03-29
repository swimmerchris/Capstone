/* This Reducer handles the global cart state, it also handles 
The local storage by adding the cart information to a local storage object.
This also provides the mechanism for handling the cart total. 
*/
import { createSlice } from "@reduxjs/toolkit";

// Below items get carts and cartTotal from local storage. 
const productCarts = localStorage.getItem("carts") !== null ? JSON.parse(localStorage.getItem("carts")) : [];

const cartTotal = localStorage.getItem("cartTotal") !== null ? JSON.parse(localStorage.getItem("cartTotal")) : 0;

// function to handle the updating of local storage items as they change. 
function updateStorage(cartProducts, cartTotal) {
    localStorage.setItem("carts", JSON.stringify(cartProducts));
    localStorage.setItem("cartTotal", JSON.stringify(cartTotal))
}

const initialState = {
    cartProducts: productCarts.products,
    cartTotal,
};

// Slice to manage cart state.
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        updateCart(state, action) {
            const payload = action.payload
            state.cartProducts = payload;
            state.cartTotal = state.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0)

            updateStorage(state.cartProducts, state.cartTotal)
        },

        addProduct(state, action) {
            const productItem = action.payload;
            const exsitingProduct = state.cartProducts.find((product) => productItem.id === product.id);

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
            const productItem = action.payload;
            const exsitingProduct = state.cartProducts.find((product) => productItem.id === product.id);

            if (exsitingProduct.quantity === 1) {
                state.cartProducts = state.cartProducts.filter((currentProduct) => currentProduct.id != productItem.id);
            } else {
                exsitingProduct.quantity--;
                exsitingProduct.totalCost = exsitingProduct.totalPrice - exsitingProduct.price;
            }

            state.cartTotal = state.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0)

            updateStorage(state.cartProducts, state.cartTotal)

        },
        deleteProduct(state, action) {
            const productItem = action.payload;
            const exsitingProduct = state.cartProducts.find((product) => productItem.id === product.id);

            if (exsitingProduct) {
                state.cartProducts = state.cartProducts.filter((currentProduct) => currentProduct.id != productItem.id);
            }

            state.cartTotal = state.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0)

            updateStorage(state.cartProducts, state.cartTotal)

        }
    }
})

export const { addProduct, reduceProduct, deleteProduct, updateCart } = cartSlice.actions

export const productsCart = (state) => state.cart.cartProducts
export const total = (state) => state.cart.cartTotal

export default cartSlice.reducer;