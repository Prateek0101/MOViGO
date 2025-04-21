import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.scss";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Password do not match");
      return;
    }

    const response = await fetch("http://localhost:5000/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password, tel, name}),
    });
    const data = await response.json();
    if(response.ok){
      alert("User added successfully");
      navigate("/");
    }
  }

  return (
    <div className="signup-container">
      <img
        className="background-image"
        src="src/assets/bg.jpg"
        alt="Background"
      />
      <div className="overlay"></div>

      <form onSubmit={handleSubmit}>
        <div className="signup-box">
          <img
            className="logo"
            src="src/assets/Logo.png" 
            alt="Logo"
          />
          <h2 className="title">Sign Up</h2>

          <input
            type="text"
            placeholder="Name"
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)} 
            required
          />
          <input
            type="email"
            placeholder="Email address"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
          <input
            type="tel"
            placeholder="Mobile Number"
            className="input-field"
            value={tel}
            onChange={(e) => setTel(e.target.value)} 
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="input-field"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required
          />

          <button type="submit" className="signup-btn">
            Sign Up
          </button>

          <div className="signin-link">
            Already have an Account?{" "}
            <Link to="/">Sign In Now</Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
