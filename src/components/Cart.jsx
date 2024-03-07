/* pull in a cart for a logged in user 
    if no cart exsist and local storage for cart is empty I will render a cart empty
    if cart exsist I will pull and populate data into local storage.
    if local storage has cart items I will loop through items and populate them. 
    I need to pull products by id and push objects into array. 
    local storage should pull active date a userId and products (array of objects).  
*/

import { useState, useEffect } from "react";
import {
  useGetCartByUserQuery,
  useGetAllCartsQuery,
  useGetAllProductsQuery,
} from "../api/api";

export default function Cart({ user, token, userId }) {
  const [multiCart, setMultiCart] = useState([]);
  const { data: data = {}, error, isLoading } = useGetCartByUserQuery(userId);
  const {
    data: productsData = {},
    error2,
    isLoading2,
  } = useGetAllProductsQuery();

  useEffect(() => {
    const carts = JSON.parse(localStorage.getItem("carts"));
    setMultiCart(carts);
  }, []);
  //   need to make the above a function that's imported
  if (user === null) {
    return <p>Please Log in</p>;
  }

  if (isLoading) {
    return <p>Loading....</p>;
  }

  if (error) {
    return <h3>Something went wrong!</h3>;
  }

  if (data && multiCart.length === 0) {
    const newArray = data.map((cart) => {
      console.log("New cart");
      const products = cart.products;
      const cartDetails = products.map((product) => {
        const prodId = product.productId;
        const prodQty = product.quantity;
        console.log(product);
        const productDetails = productsData.find((p) => p.id === prodId);
        const newProdObj = { ...productDetails, quantity: prodQty };
        return newProdObj;
      });
      const newCartObj = { ...cart, products: cartDetails };
      return newCartObj;
    });
    // console.log(multiCart);
    console.log(newArray);
    console.log(data);
    setMultiCart(newArray);
    localStorage.setItem("carts", JSON.stringify(newArray));
  }

  return (
    <div>
      <h2>Hello Welcome to the Cart</h2>
      {multiCart.map((currentCart) =>
        currentCart.products.map((product) => (
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
        ))
      )}
    </div>
  );
}
