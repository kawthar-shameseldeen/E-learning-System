// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import "./register.css";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// const Register = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const Signup = async (name, email, password) => {
//     try {
//       if (!name || !email || !password) {
//         toast.error("Please fill all the fields");
//         return;
//       }
//       const response = await axios.post(
//         "http://localhost:3030/api/users/register",
//         {
//           name: name,
//           email: email,
//           password: password,
//         }
//       );
//       toast.success("Signup successful");
//       console.log(response);
//       navigate("/home");
//     } catch (error) {
//       toast.error("Error signing up");
//       console.log("Error signing up", error);
//     }
//   };

//   return (
//     <div className="register">
//       <form className="register-form" onSubmit={Signup}>
//         <h2>Create an account</h2>
//         <div className="form-group">
//           <label>Name</label>
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="What shall we call you?"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Email address</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             placeholder="you@domain.com"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Must be at least 8 characters"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="create-account"
//           onClick={() => Signup(username, email, password)}
//         >
//           Create account
//         </button>
//         <p>
//           Been here before? <Link to="/login">Login</Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const Signup = async (e) => {
    e.preventDefault();
    try {
      if (!username || !email || !password) {
        toast.error("Please fill all the fields");
        return;
      }
      const response = await axios.post(
        "http://localhost:3030/api/users/register",
        {
          name: username,
          email: email,
          password: password,
        }
      );
      toast.success("Signup successful");
      console.log(response);
      navigate("/home");
    } catch (error) {
      toast.error("Error signing up");
      console.log("Error signing up", error);
    }
  };

  return (
    <div className="register">
      <form className="register-form" onSubmit={Signup}>
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
