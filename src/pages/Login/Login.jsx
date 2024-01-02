import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./Login.css"; // Import the CSS file
import { BACKEND_URL } from "../../App";

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [isLoggedIn, setLoggedIn] = useState(false);
  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Data:", loginData);
    try {
      const response = await fetch(`${BACKEND_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful:", data);
        alert("Login successful");
        // setLoggedIn(true);
        // Store authentication token
        localStorage.setItem("authToken", data.token);

        // Redirect to the dashboard page
        window.location.href = "/dashboard";

        // Perform actions on successful login, e.g., store authentication token
      } else {
        const errorData = await response.json();
        console.error("Login error:", errorData);
        alert(errorData.error || "An error occurred during login");
        // Handle login error, e.g., display an error message
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An unexpected error occurred");

      // Handle other errors, e.g., network issues
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="root">
      <div className="container">
        <h2>Login</h2>
        <div className="form">
          <form onSubmit={handleLoginSubmit}>
            <div>
              <input
                className="input"
                type="text"
                placeholder="Email"
                name="email"
                required
                onChange={handleLoginChange}
              />
            </div>
            <div>
              <input
                className="input"
                type="password"
                placeholder="Password"
                name="password"
                required
                onChange={handleLoginChange}
              />
            </div>
            <button className="button" type="submit">
              Login
            </button>
          </form>
          <p className="footerText">
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
