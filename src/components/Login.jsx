import { useState, useEffect } from "react";
import { useLoginMutation } from "../api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../index.css";

export default function Login({ token, setToken, setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [displayPasword, setDisplayPassword] = useState(false);
  const [loginUser] = useLoginMutation();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const body = {
        username: username,
        password: password,
      };
      //   jsonBody = JSON.stringify(body);
      const result = await loginUser(body);
      console.log(result);
      setToken(result.data.token);
      setUser(username);
      if (result.data.message === "Login successful!") {
        setSuccess(result.data.message);
      }
    } catch (error) {
      console.log(error);
      setError(error);
      toast.error("Login Failed");
    }
  }

  useEffect(() => {
    if (success) {
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
          <label id="email">
            Email:{" "}
            <input
              placeholder="Enter Email"
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
