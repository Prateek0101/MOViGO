import React from "react";
import "./style.scss";

const Signin = () => {
  return (
    <div className="signin-container">
      {/* Background Image */}
      <img className="background-image" src="https://placehold.co/1920x1024" alt="Background" />

      {/* Dark Overlay */}
      <div className="overlay"></div>

      {/* Logo */}
      <img className="logo" src="https://placehold.co/170x81" alt="Logo" />

      {/* Sign In Box */}
      <div className="signin-box">
        <h2 className="title">Sign In</h2>

        {/* Input Fields */}
        <input type="email" placeholder="Email or mobile number" className="input-field" />
        <input type="password" placeholder="Password" className="input-field" />

        {/* Sign In Button */}
        <button className="signin-btn">Sign In</button>

        {/* New User */}
        <div className="signup-link">
          New to MOViGO? <a href="/signup">Sign up now</a>
        </div>
      </div>
    </div>
  );
};

export default Signin;
