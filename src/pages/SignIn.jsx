import React, { useState } from "react";
import { Eye, EyeOff, ArrowUpRight } from "lucide-react";
import SignUp from "./SignUp";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/api/auth/login", formData);
      if (response.data.success) {
        localStorage.setItem(
          "accessToken",
          JSON.stringify(response.data.accessToken),
        );

        localStorage.setItem("login", true);
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
    }
  };

  const handleGoogleSignIn = () => {
    console.log("Google Sign In");
    // later connect to Firebase / OAuth
  };

  return (
    <section className="login">
      <div className="login-container">
        {/* Header */}
        <div className="login-header">
          <h1>Login</h1>
          <p>
            Welcome back! Sign in to continue building and collaborating on
            projects.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="login-form">
          <input
            required
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          {/* Password */}
          <div className="password-field">
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          {/* Submit */}
          <button type="submit" className="login-btn">
            Login <ArrowUpRight size={18} />
          </button>

          {/* Divider */}
          <div className="divider">
            <span>OR</span>
          </div>

          {/* Google Button */}
          <button
            type="button"
            className="google-btn"
            onClick={handleGoogleSignIn}
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
            />
            Sign in with Google
          </button>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
