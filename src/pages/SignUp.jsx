import React, { useState } from "react";
import { Eye, EyeOff, ArrowUpRight } from "lucide-react";
import api from "../utils/axios";

const SignUp = () => {
  const [role, setRole] = useState("freelancer");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    skills: "",
    terms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Submit form data to backend
      const response = await api.post("/api/auth/register", {
        ...formData,
        role,
      });
      if (response.data.success) {
        alert("Registration successful! Please log in.");
        console.log("Registration successful:", response.data);
        // window.location.href = "/sign-in";
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <>
      <div className="register-header">
        <h1>Register</h1>
        <p>
          Join VentureLink and start collaborating with founders and builders on
          real startup projects.
        </p>
      </div>

      <section className="register">
        <div className="register-container">
          {/* Role Toggle */}
          <div className="role-toggle">
            <button
              className={role === "freelancer" ? "active" : ""}
              onClick={() => setRole("freelancer")}
            >
              Freelancer
            </button>

            <button
              className={role === "employer" ? "active" : ""}
              onClick={() => setRole("employer")}
            >
              Employer
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="register-form">
            <input
              required
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
            />

            <div className="row">
              <input
                required
                type="text"
                name="firstname"
                placeholder="First Name"
                onChange={handleChange}
              />
              <input
                required
                type="text"
                name="lastname"
                placeholder="Last Name"
                onChange={handleChange}
              />
            </div>

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

            {/* Confirm Password */}
            <div className="password-field">
              <input
                required
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={handleChange}
              />
              <span onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </span>
            </div>

            {/* Skills (ONLY for freelancer) */}
            {role === "freelancer" && (
              <select name="skills" onChange={handleChange}>
                <option value="">Select Skill</option>
                <option>Web Development</option>
                <option>AI Automation</option>
                <option>App Development</option>
                <option>Design</option>
                <option>Cyber Security</option>
                <option>Data Analysis</option>
                <option>DevOps</option>
              </select>
            )}

            {/* Terms */}
            <label className="terms">
              <input type="checkbox" name="terms" onChange={handleChange} />I
              agree to the terms and conditions
            </label>

            {/* Submit */}
            <button type="submit" className="register-btn">
              Register <ArrowUpRight size={18} />
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUp;
