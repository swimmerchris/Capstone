import React from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/Navbar";
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";
import Login from "./components/Login";
import Account from "./components/Account";
import "./App.css";
import Cart from "./components/Cart";
import Home from "./components/Home";
import Checkout from "./components/Checkout";

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [multiCart, setMultiCart] = useState([]);

  return (
    <div id="app">
      <ToastContainer position="top-center" />
      <NavBar token={token} setToken={setToken} setUserId={setUserId} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products/" element={<Products />}></Route>
        <Route
          path="/products/:id"
          element={<ProductDetail token={token} />}
        ></Route>
        <Route
          path="/login"
          element={
            <Login
              token={token}
              setToken={setToken}
              setUser={setUser}
              setUserId={setUserId}
              userId={userId}
              user={user}
              multiCart={multiCart}
              setMultiCart={setMultiCart}
            />
          }
        ></Route>
        <Route
          path="/account"
          element={
            <Account
              token={token}
              setToken={setToken}
              user={user}
              setUseruser={setUser}
              setUserId={setUserId}
              userId={userId}
            />
          }
        ></Route>
        <Route
          path="/cart"
          element={
            <Cart
              token={token}
              user={user}
              setUserId={setUserId}
              userId={userId}
              multiCart={multiCart}
              setMultiCart={setMultiCart}
            />
          }
        ></Route>
        <Route
          path="/checkout"
          element={<Checkout user={user} token={token} />}
        ></Route>
      </Routes>
      <footer>
        <div>eHub a Website Where Your Dreams Come True!!!!</div>
        <a href="https://www.freepik.com/icon/user_149071#fromView=keyword&page=1&position=9&uuid=f914c7ca-ab99-48f3-ada2-3cd5ed86a68a">
          Icon by Smashicons
        </a>
        <a href="https://www.freepik.com/icon/trolley_12894030#fromView=search&page=1&position=15&uuid=c8bc4c6a-9d56-436e-8f1b-571787102f95">
          Icon by Mihimihi
        </a>
      </footer>
    </div>
  );
}

export default App;
