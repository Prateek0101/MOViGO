import React, { useState } from "react";
import "./style.scss";
import { Link , useNavigate} from "react-router-dom";
import { useDispatch } from "react-redux";
import { setWishlistItems } from "../../store/slices/wishlistSlice";

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate()
  const [error, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await fetch("http://localhost:5000/api/signin",{
        method: "POST",
        headers: {
          "Content-Type" : "application/json"
        },
        body: JSON.stringify({email, password})
      });
      const data = await response.json();

      if(response.ok && data.user){
        localStorage.setItem("movigoUser",JSON.stringify(data.user));
        const wishlistRes = await fetch(`http://localhost:5000/api/wishlist/${data.user.id}`);
        const wishlist = await wishlistRes.json();
        dispatch(setWishlistItems(wishlist));
        navigate("/home");
      }
      else{
        setErrorMessage(data.message || "Login Failed. Please try again.");
      }
    }
    catch(error){
      setErrorMessage("An error occured. Please try agian");
    }

  };

  return (  
    <form onSubmit={handleSubmit}>
      <div className="signin-container">
        {/* Background Image */}
        <img className="background-image" src="src/assets/bg.jpg" alt="Background" />

        {/* Dark Overlay */}
        <div className="overlay"></div>

        {/* Logo */}
        <img className="logo" src="src/assets/Logo.png" alt="Logo" />

        {/* Sign In Box */}
        
        <div className="signin-box">
          <h2 className="title">Sign In</h2>

          {/* Input Fields */}
          <input type="emails" placeholder="Email or mobile number" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          <input type="password" placeholder="Password" className="input-field" value={password}  onChange={(e) => setPassword(e.target.value)} required/>

          {/* Sign In Button */}
          <button type="submit" className="signin-btn" >Sign In</button>

          {/* New User */}
          <div className="signup-link">
            New to MOViGO? <Link to="/signup">Sign up now</Link>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Signin;
