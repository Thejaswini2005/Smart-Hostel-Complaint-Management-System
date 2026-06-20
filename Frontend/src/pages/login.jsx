import React from 'react'
import { useState } from 'react'
import { Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import "./login.css";

const Login = () => {
     const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

const handleChange = (e) => {
    const { name, value } = e.target; 
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.email || !formData.password) {
    alert("Please fill all fields");
    return;
  }

  try {
    const response = await loginUser(formData);

    alert(response.data.message);

    console.log("Login Response:", response.data);

    // Save token
    localStorage.setItem(
      "token",
      response.data.token
    );

    // Save role
    localStorage.setItem(
      "role",
      response.data.user.role
    );

    // Save complete user data
    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );

    // Redirect based on role
    if (response.data.user.role === "student") {
      window.location.href = "/student/dashboard";
    } else if (response.data.user.role === "warden") {
      window.location.href = "/warden/dashboard";
    }

  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Login Failed"
    );
  }
};


  return (

    <div className="login-container">
      {/* Login Left */}
      <div className="login-left">
        <div className="login-content">
          <div className="logo">🏢</div>
           <h1>Welcome Back</h1>
          <p>
            Login to access your hostel complaint dashboard and manage
            complaints efficiently.
          </p>

          <ul>
            <li>Track complaint status in real-time</li>
            <li>Quick complaint management</li>
            <li>Secure and reliable platform</li>
          </ul>
        </div>
      </div>

      {/* Login Right */}
      <div className="login-right">
        <div className="login-form">
          <h2>HostelCare</h2>
          <h1>Sign In</h1>
          <p>Enter your credentials to access your account</p>

          <form onSubmit={handleSubmit}>

            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            

            <button type="submit">Sign In</button>

            <p className="register-link">
              Don't have an account?{" "}
              <Link to="/register">Register here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login