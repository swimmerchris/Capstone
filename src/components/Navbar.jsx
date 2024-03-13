import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { updateCart } from "../cartState/cartSlice";

function NavBar({ token, setToken, setUserId }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutUser = () => {
    setToken(null);
    setUserId(null);
    // dispatch(updateCart());
    localStorage.removeItem("carts");
    localStorage.removeItem("cartTotal");

    navigate("/");
  };

  if (token) {
    return (
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/account">Account</NavLink>
        <NavLink to="/cart">Cart</NavLink>
        {/* Temp till I get cart working as expected */}
        {/* <NavLink to="/checkout">Checkout</NavLink> */}
        <a onClick={logoutUser}>Logout</a>
      </nav>
    );
  }

  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/cart">Cart</NavLink>
      {/* Temp till I get cart working as expected */}
      {/* <NavLink to="/checkout">Checkout</NavLink> */}
    </nav>
  );
}

export default NavBar;
