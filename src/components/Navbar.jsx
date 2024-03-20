import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { updateCart } from "../cartState/cartSlice";
import "./css/Navbar.css";

function NavBar({ token, setToken, setUserId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutUser = () => {
    setToken(null);
    setUserId(null);
    dispatch(updateCart([]));
    localStorage.removeItem("carts");
    localStorage.removeItem("cartTotal");

    navigate("/");
  };

  if (token) {
    return (
      <nav className="navbar">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/account">Account</NavLink>
        <NavLink to="/cart">Cart</NavLink>
        <a onClick={logoutUser}>Logout</a>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/cart">Cart</NavLink>
    </nav>
  );
}

export default NavBar;
