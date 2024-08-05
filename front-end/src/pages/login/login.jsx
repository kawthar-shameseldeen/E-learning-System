import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import axios from "axios";
import {
  fetchingUsers,
  loadUsers,
  errorOccured,
} from "../../data-store/redux/userSlice/index.js";
import {jwtDecode} from "jwt-decode";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        toast.error("Please enter both email and password");
        return;
      }
      dispatch(fetchingUsers());
      const { data } = await axios.post(
        "http://localhost:3030/api/login",
        {
          email,
          password,
        }
      );
      dispatch(loadUsers(data));
      let token = data.token;
      
      
      localStorage.setItem("token", token);
      toast.success("Login successful");
      navigate("/home");
    } catch (error) {
      dispatch(errorOccured(error?.message));
      toast.error("Error logging in");
    }
  };

  return (
    <div className="login">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="you@domain.com"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
        <p>
          Don't have account? <Link to="/">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
