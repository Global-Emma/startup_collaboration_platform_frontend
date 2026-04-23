import React, { useEffect, useState } from "react";

import "../styles/edit-user.css";
import api from "../utils/axios";
import { isAxiosError } from "axios";
import ErrorMessage from "../components/ErrorMessage";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ user }) => {
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    bio: "",
    role: "",
    avatar: "",
    skills: [],
  });

  const [skillInput, setSkillInput] = useState("");

  /* =========================
     FILL DATA ON LOAD / REFRESH
  ========================== */
  useEffect(() => {
    const update = () => {
      if (user) {
        setFormData({
          username: user.username || "",
          firstname: user.firstname || "",
          lastname: user.lastname || "",
          email: user.email || "",
          phone: user.phone || "",
          bio: user.bio || "",
          role: user.role || "",
          avatar: user.avatar || "",
          skills: user.skills || [],
        });
      }
    };

    update();
  }, [user]);

  /* =========================
     HANDLE INPUT CHANGE
  ========================== */
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "avatar") {
      setFormData({
        ...formData,
        avatar: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  /* =========================
     ADD SKILL
  ========================== */
  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput],
      });

      setSkillInput("");
    }
  };

  /* =========================
     REMOVE SKILL
  ========================== */
  const removeSkill = (skill) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    });
  };

  /* =========================
     SUBMIT UPDATE
  ========================== */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.put(`/api/auth/update-profile`, formData);

      alert(`${res.data.data.username}'s Profile updated successfully!`);

      navigate("/profile");
    } catch (err) {
      if(isAxiosError(err)){
        setError(err.response?.data.message || err.message);
      }
    }
  };

  if (error) {
    return <ErrorMessage error={error} />;
  }

  return (
    <div className="edit-profile-page">
      <div className="edit-profile-container">
        <h1>Edit Profile</h1>
        <p>Update your personal information</p>

        <form onSubmit={handleSubmit}>
          {/* AVATAR */}
          <div className="avatar-section">
            <img
              src={
                typeof formData.avatar === "string"
                  ? formData.avatar
                  : URL.createObjectURL(formData.avatar)
              }
              alt="avatar"
            />

            <input type="file" name="avatar" onChange={handleChange} />
          </div>

          {/* USERNAME */}
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
          />

          {/* FIRSTNAME */}
          <input
            type="text"
            name="firstname"
            placeholder="First Name"
            value={formData.firstname}
            onChange={handleChange}
          />

          {/* LASTNAME */}
          <input
            type="text"
            name="lastname"
            placeholder="Last Name"
            value={formData.lastname}
            onChange={handleChange}
          />

          {/* EMAIL */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          {/* PHONE */}
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
          />

          {/* BIO */}
          <textarea
            name="bio"
            placeholder="Write something about you..."
            value={formData.bio}
            onChange={handleChange}
          />

          {/* ROLE (readonly usually) */}
          <input type="text" name="role" value={formData.role} disabled />

          {/* SKILLS (only freelancer useful) */}
          {formData.role === "freelancer" && (
            <div className="skills-box">
              <div className="skills-input">
                <input
                  type="text"
                  placeholder="Add skill"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                />

                <button type="button" onClick={addSkill}>
                  Add
                </button>
              </div>

              <div className="skills-list">
                {formData.skills.map((skill, i) => (
                  <span key={i}>
                    {skill}
                    <button type="button" onClick={() => removeSkill(skill)}>
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* SUBMIT */}
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
