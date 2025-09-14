import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupendpoint } from "services/AuthService"; // Make sure this exists

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await signupendpoint(formData);
      console.log(response.data);

      alert("Signup Successful. Please login.");
      navigate("/login"); 
    } catch (error) {
      console.error("Error:", error);
      alert("Signup Failed. Try again.");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <p>Create your account to book workspaces</p>

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <br /><br />
        <button className="btn btn-primary">Signup</button>
      </form>
    </div>
  );
};

export default Signup;