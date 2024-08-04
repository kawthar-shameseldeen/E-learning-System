
import React, { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const login =async (email,password)=>{
    try{
      if(!email || ! password){
        toast.error("Please enter both email and password");
        return;
      }
      const response = await axios.post("http://localhost:3030/api/login",{
        email:email,
        password:password
      });
      toast.success("Login successful");
      console.log(response);
      navigate("/home");
    }
    catch (error){
      toast.error("Error logging in");
      console.log("Error logging in", error);
    }
  
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
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
        <button type="submit" className="login-button" 
        onClick={() => login(email, password)}
        >
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
