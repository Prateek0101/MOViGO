import React from "react";
import "./style.scss";

const Signup = () => {
  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      {/* Background Image */}
      <img
        className="absolute w-full h-full object-cover"
        src="https://placehold.co/1920x1024"
        alt="Background"
      />

      {/* Dark Overlay */}
      <div className="absolute w-full h-full bg-black bg-opacity-70"></div>

      {/* Logo */}
      <img
        className="absolute top-10 left-10 w-40"
        src="https://placehold.co/168x80"
        alt="Logo"
      />

      {/* Sign Up Box */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[450px] p-8 bg-black bg-opacity-70 rounded-lg text-white">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

        {/* Input Fields */}
        <input
          type="text"
          placeholder="Name"
          className="w-full p-3 mb-4 bg-black bg-opacity-30 border border-white border-opacity-70 rounded focus:outline-none text-white"
        />
        <input
          type="email"
          placeholder="Email address"
          className="w-full p-3 mb-4 bg-black bg-opacity-30 border border-white border-opacity-70 rounded focus:outline-none text-white"
        />
        <input
          type="tel"
          placeholder="Mobile Number"
          className="w-full p-3 mb-4 bg-black bg-opacity-30 border border-white border-opacity-70 rounded focus:outline-none text-white"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 bg-black bg-opacity-30 border border-white border-opacity-70 rounded focus:outline-none text-white"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full p-3 mb-4 bg-black bg-opacity-30 border border-white border-opacity-70 rounded focus:outline-none text-white"
        />

        {/* Sign Up Button */}
        <button className="w-full p-3 bg-red-600 hover:bg-red-700 rounded font-bold">
          Sign Up
        </button>

        {/* Already have an account */}
        <div className="text-center mt-4 text-sm text-white text-opacity-70">
          Already have an Account?{" "}
          <a href="/signin" className="text-red-500 font-bold hover:underline">
            Sign In Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
