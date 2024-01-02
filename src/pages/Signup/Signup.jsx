import React, { useState } from "react";
import "./Signup.css"; // Import the CSS file
import { Link, Navigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    heardAbout: [],
    city: "",
    state: "",
  });

  const [isSignup, setisSignup] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    const updatedHeardAbout = checked
      ? [...formData.heardAbout, value]
      : formData.heardAbout.filter((item) => item !== value);

    setFormData({ ...formData, heardAbout: updatedHeardAbout });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    try {
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Signup successful:", data);
        alert("Signup successful:");
        setisSignup(true);
        // Optionally, redirect the user to a success page or perform other actions
      } else {
        const errorData = await response.json();
        console.error("Signup error:", errorData);

        // Optionally, display the error message to the user
        alert(errorData.error || "An error occurred during signup");
      }
    } catch (error) {
      console.error("Error during signup:", error);

      // Optionally, display a generic error message to the user
      alert("An unexpected error occurred");
    }
  };

  if (isSignup) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="root">
      <div className="container">
        <h2>Signup</h2>
        <div className="form">
          <form>
            <div>
              <input
                className="input"
                type="text"
                placeholder="Name"
                name="name"
                pattern="[A-Za-z ]+"
                title="Alphabets only"
                required
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                className="input"
                type="text"
                placeholder="Email"
                name="email"
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                title="Alphanumeric only"
                required
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                className="input"
                type="password"
                placeholder="Password"
                name="password"
                required
                onChange={handleInputChange}
              />
            </div>
            <div>
              <input
                className="input"
                type="text"
                placeholder="Phone"
                name="phone"
                pattern="[0-9]+"
                title="Number only"
                required
                onChange={handleInputChange}
              />
            </div>
            <div>
              <h4>Gender</h4>
              <div className="radioGroup">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    onChange={handleInputChange}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    onChange={handleInputChange}
                  />
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Others"
                    onChange={handleInputChange}
                  />
                  Others
                </label>
              </div>
            </div>
            <div>
              <h4>How did you hear about this?</h4>
              <div className="checkboxGroup">
                <label>
                  <input
                    type="checkbox"
                    name="heardAbout"
                    value="LinkedIn"
                    onChange={handleCheckboxChange}
                  />
                  LinkedIn
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="heardAbout"
                    value="Friends"
                    onChange={handleCheckboxChange}
                  />
                  Friends
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="heardAbout"
                    value="JobPortal"
                    onChange={handleCheckboxChange}
                  />
                  Job Portal
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="heardAbout"
                    value="Others"
                    onChange={handleCheckboxChange}
                  />
                  Others
                </label>
              </div>
            </div>
            <div>
              <select
                className="dropdown"
                name="city"
                onChange={handleInputChange}
              >
                <option value="">Select City</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Pune">Pune</option>
                <option value="Ahmedabad">Ahmedabad</option>
              </select>
            </div>
            <div>
              <input
                className="input"
                type="text"
                placeholder="State"
                name="state"
                required
                onChange={handleInputChange}
              />
            </div>
            <button className="button" onClick={handleSave}>
              Save
            </button>
          </form>
        </div>
        <p className="footerText">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
