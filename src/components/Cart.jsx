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
import "./css/Cart.css";

export default function Cart({ token }) {
  const currentCart = useSelector(productsCart);
  const currentTotal = useSelector(total);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log(currentCart);
  return (
    <div className="cart-container">
      <h2>Cart</h2>
      {currentCart ? (
        <div className="sub-cart-container">
          <div className="product-card">
            {currentCart.map((product) => (
              <div key={product.id} className="product-card-container">
                <img
                  src={product.image}
                  alt={product.title}
                  className="product-image-card"
                  onClick={() => navigate(`/products/${product.id}`)}
                />
                <div className="center">
                  <h3> {product.title} </h3>
                  <div className="quantity-card">
                    <div className="count-container">
                      <button
                        onClick={() => dispatch(reduceProduct(product))}
                        className="count-button"
                      >
                        -
                      </button>
                      <p id="quantity">{product.quantity}</p>
                      <button
                        onClick={() => dispatch(addProduct(product))}
                        className="count-button"
                      >
                        +
                      </button>
                    </div>
                    <p
                      onClick={() => dispatch(deleteProduct(product))}
                      id="delete"
                    >
                      Delete
                    </p>
                  </div>
                </div>
                <div className="total">
                  Total: <div>${product.price * product.quantity}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="checkout-total">
            <div id="cart-total">Sub-Total: ${currentTotal}</div>
            <button
              onClick={() => {
                if (token) {
                  navigate("/checkout");
                } else {
                  toast.error("Please log in to Checkout");
                }
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <div className="empty">
          Your Cart is Empty, Please Log in and Add to Cart
        </div>
      )}
    </div>
  );
}
