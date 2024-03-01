import { NavLink, useNavigate } from "react-router-dom";

function NavBar({ token, setToken }) {
  const navigate = useNavigate();

  const logoutUser = () => {
    setToken(null);
    navigate("/");
  };

  if (token) {
    return (
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/account">Account</NavLink>
        <NavLink to="/cart">Cart</NavLink>
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
    </nav>
  );
}

export default NavBar;
