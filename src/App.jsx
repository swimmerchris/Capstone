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

function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  return (
    <section>
      <NavBar token={token} setToken={setToken} />
      <ToastContainer position="top-center" />
      <Routes>
        {/* <Route path="/" element={<Books />}></Route>*/}
        <Route path="/products/" element={<Products />}></Route>
        <Route path="/products/:id" element={<ProductDetail />}></Route>
        {/* <Route path="/cart/" element={<Cart token={token} />}></Route> */}
        <Route
          path="/login"
          element={
            <Login token={token} setToken={setToken} setUser={setUser} />
          }
        ></Route>
        <Route
          path="/register"
          element={<Register token={token} setToken={setToken} />}
        ></Route>
        <Route
          path="/account"
          element={<Account token={token} setToken={setToken} user={user} />}
        ></Route>
      </Routes>
    </section>
  );
}

export default App;
