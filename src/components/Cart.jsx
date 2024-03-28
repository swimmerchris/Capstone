// This Component handles the cart, updating, deleting and checking out.
import { useNavigate } from "react-router-dom";
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
  //   grabbing the cart info and cart total from global state
  const currentCart = useSelector(productsCart);
  const currentTotal = parseFloat(useSelector(total));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function totalPerProduct(price, quantity) {
    const total = price * quantity;
    return total.toFixed(2);
  }

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
                  Total:{" "}
                  <div>${totalPerProduct(product.price, product.quantity)}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="checkout-total">
            <div id="cart-total">Sub-Total: ${currentTotal.toFixed(2)}</div>
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
          <h3>Your Cart is Empty, Please Log in and Add to Cart</h3>
        </div>
      )}
    </div>
  );
}
