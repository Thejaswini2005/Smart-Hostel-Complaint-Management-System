import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { registerUser } from "../services/authService";
import "./register.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    password: '',
    confirmPassword: ''
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

  if (formData.password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  const payload = {
    name: formData.name,
    email: formData.email,
    password: formData.password,
    role: formData.role,
  };

  try {
  const response = await registerUser(payload);

  alert(response.data.message);

} catch (error) {
  alert(
    error.response?.data?.message ||
    "Registration Failed"
  );
}

  

  setFormData({
    name: "",
    email: "",
    role: "",
    password: "",
    confirmPassword: "",
  });
};
  return (
    <div className="register-container">
      {/* Register Left */}
            <div className="register-left">
              <div className="register-content">
                  <div className="logo">🏢</div>

          <h1>Join HostelCare</h1>

          <p>
            Create your account and start managing hostel complaints
            efficiently. Whether you're a student or warden, we've got
            you covered.
          </p>

          <ul>
            <li>Simple and intuitive interface</li>
            <li>Real-time complaint tracking</li>
            <li>Secure and reliable platform</li>
          </ul>
              </div>
            </div>
      
      {/* Register Right */ }
      <div  className="register-right">
        <div className="register-form">
          <h2>HostelCare</h2>
          <h1>Create  Account</h1>
          <p>Get started with your hostel management account </p>

          <form onSubmit={handleSubmit}>


            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select your role</option>
              <option value="student">Student</option>
              <option value="warden">Warden</option>
            </select>


            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Create your password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <button type="submit">Create Account</button>
   
            <p className="login-link"> Already have an account? 
              <Link to="/login">Sign In</Link>
            </p>
          </form>
        </div>

      </div>


    </div>
  );
};

export default Register