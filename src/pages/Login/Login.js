// import React, { useState, useContext } from "react";
// import { loginendpoint } from "services/AuthService";
// import { AuthContext } from "context/AuthContext"; 

// const Login = () => {
//   const { login } = useContext(AuthContext);
//   const [formData, setFormData] = useState({ username: "", password: "", email: "" });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await loginendpoint(formData);
//       if (response.data.token) {
//         login(response.data.user, response.data.token); 
//         alert("Login Successful.");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       alert("Invalid Credentials");
//     }
//   };

//   return (
//     <div className="login-container">
//       <form onSubmit={handleSubmit}>
//         <h2>Workspace Manager</h2>
//         <p>Get your workspaces booked...</p>
//         <input
//           type="text"
//           name="username"
//           placeholder="Username"
//           value={formData.username}
//           onChange={handleChange}
//         /> <br /> <br />
//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           value={formData.email}
//           onChange={handleChange}
//         /> <br /> <br />
//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           value={formData.password}
//           onChange={handleChange}
//         />
//         <br /><br />
//         <button className="btn btn-primary">Login</button><br />

//         <p>------------------ OR ------------------</p>
//         <button className="btn btn-primary">Sign in with google</button>
//         <br /><br />
//         <p>Dont have Account?</p>
//         <button className="btn btn-primary">Signup</button>
//       </form>
//     </div>
//   );
// };

// export default Login;






import React, { useState, useContext } from "react";
import { loginendpoint } from "services/AuthService";
import { AuthContext } from "context/AuthContext"; 
import { Link } from "react-router-dom";
import "./Login.css"; // updated CSS
import loginimg from "assets/login.jpg"
const Login = () => {
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({ username: "", password: "", email: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginendpoint(formData);
      if (response.data.token) {
        login(response.data.user, response.data.token); 
        alert("Login Successful.");
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