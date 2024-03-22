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
      <div className="nav-div">
        <NavLink to="/">eHub</NavLink>
        <nav className="navbar">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/account">Account</NavLink>
          <a onClick={logoutUser}>Logout</a>
          <NavLink to="/cart">Cart</NavLink>
        </nav>
      </div>
    );
  }

  return (
    <div className="nav-div">
      <NavLink to="/">eHub</NavLink>
      <nav className="navbar">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/cart">Cart</NavLink>
      </nav>
    </div>
  );
}

export default NavBar;
