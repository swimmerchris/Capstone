/* pull in a cart for a logged in user 
    if no cart exsist and local storage for cart is empty I will render a cart empty
    if cart exsist I will pull and populate data into local storage.
    if local storage has cart items I will loop through items and populate them. 
    I need to pull products by id and push objects into array. 
    local storage should pull active date a userId and products (array of objects).  
*/
import Checkout from "./Checkout";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  addProduct,
  reduceProduct,
  deleteProduct,
  productsCart,
  total,
} from "../cartState/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Cart({ token }) {
  const currentCart = useSelector(productsCart);
  const currentTotal = useSelector(total);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(currentCart);
  return (
    <div>
      <h2>Hello Welcome to the Cart</h2>
      {currentCart ? (
        <div>
          <div>
            {currentCart.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-card-container">
                  <h3> {product.title} </h3>
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-image-card"
                  />
                  <button onClick={() => dispatch(reduceProduct(product))}>
                    -
                  </button>
                  <p>QTY: {product.quantity}</p>
                  <button onClick={() => dispatch(addProduct(product))}>
                    +
                  </button>
                  <button onClick={() => dispatch(deleteProduct(product))}>
                    Delete
                  </button>

                  <button
                    onClick={() => navigate(`/products/${product.id}`)}
                    className="product-button"
                  >
                    <span>Product Details </span>
                  </button>
                  <span>Total: ${product.price * product.quantity}</span>
                </div>
              </div>
            ))}
          </div>
          <span>Current Total: ${currentTotal}</span>
          <button
            onClick={() => {
              if (token) {
                navigate("/checkout");
              } else {
                toast.error("Please log in to Checkout");
              }
            }}
          >
            Checkout
          </button>
        </div>
      ) : (
        <div>Your Cart is Empty, Please Log in and Add to Cart</div>
      )}
    </div>
  );
}
