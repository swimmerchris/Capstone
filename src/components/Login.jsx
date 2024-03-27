import { useState, useEffect } from "react";
import {
  useLoginMutation,
  useGetUserQuery,
  useGetCartByUserMutation,
  useGetAllProductsQuery,
} from "../api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../index.css";
import { updateCart } from "../cartState/cartSlice";
import { useDispatch } from "react-redux";
import "./css/Login.css";

export default function Login({
  setToken,
  setUser,
  setUserId,
  user,
  multiCart,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(null);
  const [error1, setError] = useState(null);
  const [displayPasword, setDisplayPassword] = useState(false);
  const [loginUser] = useLoginMutation();
  const { data = {}, error, isLoading } = useGetUserQuery();
  const [getCartByUser] = useGetCartByUserMutation();
  const [cartData, setCartData] = useState();
  const { data: productsData = {} } = useGetAllProductsQuery();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const body = {
        username: username,
        password: password,
      };
      const result = await loginUser(body);
      setToken(result.data.token);
      if (result.data.token) {
        const userInfo = data.filter((currentUser) => {
          return currentUser.username === username;
        });

        setUser(userInfo[0]);

        setUserId(userInfo[0].id);
        setSuccess("Login In Successful");
        setCartData(getCartByUser(userInfo[0].id));
      }
    } catch (error1) {
      setError(error1);
      toast.error("Login Failed");
    }
  }

  useEffect(() => {
    if (success) {
      async function cartInfo() {
        const { data: newData, isLoading3, error3 } = await cartData;

        if (user === null) {
          return <p>Please Log in</p>;
        }

        if (isLoading3) {
          return <p>Loading....</p>;
        }

        if (error3) {
          return <h3>Something went wrong!</h3>;
        }

        if (newData && multiCart.length === 0) {
          const newArray = newData.map((cart) => {
            const cartProducts = cart.products;
            const cartDetails = cartProducts.map((product) => {
              const prodId = product.productId;
              const prodQty = product.quantity;

              const productDetails = productsData.find((p) => p.id === prodId);
              const newProdObj = { ...productDetails, quantity: prodQty };
              return newProdObj;
            });
            const newCartObj = { ...cart, products: cartDetails };
            return newCartObj;
          });

          const singleCart = newArray.shift();

          const combinedCart = newArray.map((cart) => {
            const extraCartProducts = cart.products;
            extraCartProducts.map((product) => {
              const foundProduct = singleCart.products.find((o, i) => {
                if (o.id === product.id) {
                  const newQuantity = o.quantity + product.quantity;
                  singleCart.products[i] = { ...o, quantity: newQuantity };
                  return true;
                }
              });
              if (!foundProduct) {
                singleCart.products.push(product);
              }
            });
          });

          dispatch(updateCart(singleCart.products));
        }
      }
      cartInfo();
      toast.success("Login successful");
      navigate("/products");
    }
  }, [success]);

  return (
    <div className="login-body">
      <div className="login">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label id="username">
            Username:{" "}
            <input
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label id="password">
            Password:{" "}
            <input
              type={displayPasword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label id="checkbox">
            <input
              type="checkbox"
              value={displayPasword}
              onChange={() =>
                setDisplayPassword((currentValue) => !currentValue)
              }
            />
            Show Password
          </label>
          <button id="formButton">Login</button>
        </form>
      </div>
    </div>
  );
}
