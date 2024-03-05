import { useState, useEffect } from "react";
import { useLoginMutation, useGetUserQuery } from "../api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../index.css";

export default function Login({ token, setToken, setUser, setUserId }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(null);
  const [error1, setError] = useState(null);
  const [displayPasword, setDisplayPassword] = useState(false);
  const [loginUser] = useLoginMutation();
  const { data = {}, error, isLoading } = useGetUserQuery();
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
