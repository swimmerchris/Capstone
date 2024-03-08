import { useState, useEffect } from "react";
import {
  useLoginMutation,
  useGetUserQuery,
  useGetCartByUserQuery,
  useGetAllProductsQuery,
} from "../api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../index.css";

export default function Login({
  token,
  setToken,
  setUser,
  setUserId,
  user,
  userId,
  multiCart,
  setMultiCart,
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(null);
  const [error1, setError] = useState(null);
  const [displayPasword, setDisplayPassword] = useState(false);
  const [loginUser] = useLoginMutation();
  const { data = {}, error, isLoading } = useGetUserQuery();
  const {
    data: cartData = {},
    error3,
    isLoading3,
  } = useGetCartByUserQuery(userId);
  const {
    data: productsData = {},
    error2,
    isLoading2,
  } = useGetAllProductsQuery();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const body = {
        username: username,
        password: password,
      };
      const result = await loginUser(body);
      setToken(result.data.token);
      console.log(result);
      setUser(username);
      if (result.data.token) {
        const userInfo = data.filter((currentUser) => {
          return currentUser.username === username;
        });
        console.log(userInfo[0].id);
        setUserId(userInfo[0].id);
        setSuccess("Login In Successful");
      }
    } catch (error1) {
      console.log(error1);
      setError(error1);
      toast.error("Login Failed");
    }
  }

  useEffect(() => {
    if (success) {
      if (user === null) {
        return <p>Please Log in</p>;
      }

      if (isLoading3) {
        return <p>Loading....</p>;
      }

      if (error3) {
        return <h3>Something went wrong!</h3>;
      }

      if (cartData && multiCart.length === 0) {
        const newArray = cartData.map((cart) => {
          console.log("New cart");
          const cartProducts = cart.products;
          const cartDetails = cartProducts.map((product) => {
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

        const singleCart = newArray.shift();
        console.log(singleCart);
        const combinedCart = newArray.map((cart) => {
          const extraCartProducts = cart.products;
          extraCartProducts.map((product) => {
            const foundProduct = singleCart.products.find((o, i) => {
              if (o.id === product.id) {
                console.log(singleCart.products[i]);
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

        console.log(singleCart);

        localStorage.setItem("carts", JSON.stringify(singleCart));
        const localCart = JSON.parse(localStorage.getItem("carts"));
        console.log(localCart);
        setMultiCart([localCart]);
      }
      toast.success("Login successful");
      navigate("/products");
    }
  }, [success]);

  return (
    <div className="login-body">
      <div className="login">
        <h2>Login</h2>
        {success && !error && <p id="successMessage">{success}</p>}
        {/* {error && <p id="error">Unable to find User, Please try again!</p>} */}
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
          <button id="formButton">Submit</button>
        </form>
      </div>
    </div>
  );
}
