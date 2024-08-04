import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./register.css";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/register", {
        username,
        email,
        password,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="register">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Create an account</h2>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="What shall we call you?"
            required
          />
        </div>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@domain.com"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Must be at least 8 characters"
            required
          />
        </div>
        <button type="submit" className="create-account">
          Create account
        </button>
        <p>
          Been here before? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
