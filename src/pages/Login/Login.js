
import React, { useState, useContext } from "react";
import { loginendpoint } from "services/AuthService";
import { AuthContext } from "context/AuthContext"; 
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Login.css"; 
import loginimg from "assets/login.jpg"
import { jwtDecode } from "jwt-decode";
const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ username: "", password: "", email: "" });

  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginendpoint(formData);
      if (response.data.token) {
        login(response.data.user, response.data.token); 
        const decoded = jwtDecode(response.data.token)
        console.log("Decoded Token : ",decoded)
        alert("Login Successful.");
          navigate("/dashboard")
        
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Invalid Credentials");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-illustration">
          <img src={loginimg} alt="Workspace illustration" />
          <h2>Welcome !</h2>
          <p>Manage your workspaces efficiently and effortlessly</p>
        </div>

        <div className="login-form-container">
          <form onSubmit={handleSubmit} className="login-form">
            <h2 className="form-title">Login</h2>

            <div className="form-group">
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                required
              /> <br /><br />
            </div>

            <div className="form-group">
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              /> <br /><br />
            </div>

            <div className="form-group">
              <input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              /> <br /> <br />
            </div>

            <button type="submit" className="btn btn-primary btn-login">
              Login
            </button>

            <div className="divider">
              OR
            </div>

            <button type="button" className="btn-google">
              Sign in with Google
            </button>
            <br /> <br />
            <p className="signup-text">
              Don't have an account? &nbsp;
              <Link to="/signup"><button className="btn btn-primary">Sign Up</button></Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;