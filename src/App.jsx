import React from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import NavBar from "./components/Navbar";
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";
// // import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import Account from "./components/Account";
import "./App.css";
import Cart from "./components/Cart";
import Home from "./components/Home";

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  return (
    <section>
      <NavBar token={token} setToken={setToken} setUserId={setUserId} />
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/products/" element={<Products />}></Route>
        <Route path="/products/:id" element={<ProductDetail />}></Route>
        <Route
          path="/login"
          element={
            <Login
              token={token}
              setToken={setToken}
              setUser={setUser}
              setUserId={setUserId}
              userId={userId}
            />
          }
        ></Route>
        <Route
          path="/register"
          element={<Register token={token} setToken={setToken} />}
        ></Route>
        <Route
          path="/account"
          element={
            <Account
              token={token}
              setToken={setToken}
              user={user}
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
            />
          }
        ></Route>
      </Routes>
    </section>
  );
}

export default App;
