/* pull in a cart for a logged in user 
    if no cart exsist and local storage for cart is empty I will render a cart empty
    if cart exsist I will pull and populate data into local storage.
    if local storage has cart items I will loop through items and populate them. 
    I need to pull products by id and push objects into array. 
    local storage should pull active date a userId and products (array of objects).  
*/

import { useState, useEffect } from "react";
import {
  useGetCartByUserMutation,
  useGetAllCartsQuery,
  useGetAllProductsQuery,
} from "../api/api";

export default function Cart({ multiCart }) {
  //   const [multiCart, setMultiCart] = useState([]);
  //   const { data: cartData = {}, error, isLoading } = useGetCartByUserQuery(userId);
  //   const {
  //     data: productsData = {},
  //     error2,
  //     isLoading2,
  //   } = useGetAllProductsQuery();

  //   if (user === null) {
  //     return <p>Please Log in</p>;
  //   }

  //   if (isLoading) {
  //     return <p>Loading....</p>;
  //   }

  //   if (error) {
  //     return <h3>Something went wrong!</h3>;
  //   }

  //   if (cartData && multiCart.length === 0) {
  //     const newArray = cartData.map((cart) => {
  //       console.log("New cart");
  //       const cartProducts = cart.products;
  //       const cartDetails = cartProducts.map((product) => {
  //         const prodId = product.productId;
  //         const prodQty = product.quantity;
  //         console.log(product);
  //         const productDetails = productsData.find((p) => p.id === prodId);
  //         const newProdObj = { ...productDetails, quantity: prodQty };
  //         return newProdObj;
  //       });
  //       const newCartObj = { ...cart, products: cartDetails };
  //       return newCartObj;
  //     });
  //     // console.log(multiCart);
  //     console.log(newArray);

  //     const singleCart = newArray.shift();
  //     console.log(singleCart);
  //     const combinedCart = newArray.map((cart) => {
  //       const extraCartProducts = cart.products;
  //       extraCartProducts.map((product) => {
  //         const foundProduct = singleCart.products.find((o, i) => {
  //           if (o.id === product.id) {
  //             console.log(singleCart.products[i]);
  //             const newQuantity = o.quantity + product.quantity;
  //             singleCart.products[i] = { ...o, quantity: newQuantity };
  //             return true;
  //           }
  //         });
  //         if (!foundProduct) {
  //           singleCart.products.push(product);
  //         }
  //       });
  //     });

  //     console.log(singleCart);

  //     localStorage.setItem("carts", JSON.stringify(singleCart));
  //   const localCart = JSON.parse(localStorage.getItem("carts"));
  //   console.log(localCart);
  //   setMultiCart([localCart]);
  //   //   console.log(multiCart);
  return (
    <div>
      <h2>Hello Welcome to the Cart</h2>
      <div>
        {multiCart.products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-card-container">
              <h3> {product.title} </h3>
              <img
                src={product.image}
                alt={product.title}
                className="product-image-card"
              />
              <p>QTY: {product.quantity}</p>
              <button
                onClick={() => navigate(`/products/${product.id}`)}
                className="product-button"
              >
                <span>Product Details </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
