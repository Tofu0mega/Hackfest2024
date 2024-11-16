import React, { useState } from "react";
import './CSS/LoginSignup.css';

const LoginSignup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);

  const handleSignup = () => {
    if (!name || !email || !password) {
      alert("Please fill out all fields!");
      return;
    }
    if (!agree) {
      alert("Please agree to the terms and conditions!");
      return;
    }
    // Simulating a signup process
    console.log("Signup successful with details:", { name, email, password });
    alert("Signup successful!");
  };

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>Sign Up</h1>
        <div className="loginsignup-fields">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleSignup}>
          Continue
        </button>
        <p className="loginsignup-login">
          Already have an account? <span>Login</span>
        </p>
        <div className="loginsignup-agree">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          <label>I agree to the terms and conditions</label>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
