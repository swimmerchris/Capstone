import { useState, useEffect } from "react";
import { useRegisterMutation } from "../api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../index.css";

export default function Register({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [displayPasword, setDisplayPassword] = useState(false);
  const [usernameError, setUsernameError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [registerUser] = useRegisterMutation();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.length < 8) {
      setUsernameError(
        "INPUT ERROR: Your Email needs to be longer than 8 characters"
      );
    } else if (password.length < 8) {
      setUsernameError(null);
      setPasswordError(
        "INPUT ERROR: Your Password needs to be longer than 8 characters"
      );
    } else {
      try {
        const body = {
          firstname: firstName,
          lastname: lastName,
          email: username,
          password: password,
        };
        const response = await registerUser(body);
        console.log(response);
        setToken(response.data.token);
        setUsernameError(null);
        setPasswordError(null);
        if (response.data.message === "Registration successful") {
          setSuccess(response.data.message);
        }
      } catch (error) {
        setError(error);
        toast.error("Registration Failed! Please try again");
      }
    }
  }

  useEffect(() => {
    if (success) {
      toast.success("Registration successful! Welcome to BookBuddy");
      navigate("/login");
    }
  }, [success]);

  return (
    <div className="login-body">
      <div className="signup">
        <h2>Sign Up</h2>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            First Name:{" "}
            <input
              placeholder="Enter First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
          <label>
            Last Name:{" "}
            <input
              placeholder="Enter Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
          <label>
            Email:{" "}
            <input
              placeholder="Enter Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label>
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
        {usernameError && <p id="error">{usernameError}</p>}
        {passwordError && <p id="error">{passwordError}</p>}
      </div>
    </div>
  );
}
