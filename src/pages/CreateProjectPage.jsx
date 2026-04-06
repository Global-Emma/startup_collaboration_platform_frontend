import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import api from "../utils/axios";

const CreateProjectPage = ({services}) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    service: "",
    level: "",
    duration: "",
    location: "",
    image: null,
  });

  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");

  // Handle input
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Add skill
  const addSkill = (e) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(skillInput)) {
        setSkills([...skills, skillInput]);
      }
      setSkillInput("");
    }
  };

  // Remove skill
  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    

    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('price', form.price);
    formData.append('service', form.service);
    formData.append('level', form.level);
    formData.append('duration', form.duration);
    formData.append('location', form.location);

    if (form.image) {
      formData.append('file', form.image);
    }

    skills.forEach((skill) => {
      formData.append('skills', skill);
    });

    const response = await api.post('/api/projects', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const responseData = response.data.data;

    if(responseData) {
      alert("Project created successfully!");
      setForm({
        title: "",
        description: "",
        price: "",
        service: "",
        level: "",
        duration: "",
        location: "",
        image: null,
      });
      setSkills([]);
    }

  };

  const header = {
    text: "Create Project",
    subtext: "Post a new project and connect with top talents.",
  };

  return (
    <section className="create-project">
      <Navbar />
      {/* HEADER */}
      <Header header={header} />

      {/* FORM */}
      <form className="project-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Project Title"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Project Description"
          rows="4"
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
        />

        {/* SERVICE */}
        <select name="service" onChange={handleChange}>
          <option value="">Select Service</option>
          {services.map((service)=>{
            return <option key={service._id}>{service.name}</option>
          })}
          
        </select>

        {/* LEVEL */}
        <select name="level" onChange={handleChange}>
          <option value="">Select Level</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Expert</option>
        </select>

        <input
          type="text"
          name="duration"
          placeholder="Duration (e.g. 2 weeks)"
          onChange={handleChange}
        />

        <input
          type="text"
          name="location"
          placeholder="Project Location"
          onChange={handleChange}
        />

        {/* SKILLS INPUT */}
        <div className="skills-input">
          <input
            type="text"
            placeholder="Type a skill and press Enter"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={addSkill}
          />

          <div className="skills-list">
            {skills.map((skill, i) => (
              <span key={i} onClick={() => removeSkill(skill)}>
                {skill} ✕
              </span>
            ))}
          </div>
        </div>

        {/* IMAGE */}
        <input type="file" name="image" onChange={handleChange} />

        <button type="submit" className="submit-btn">
          Create Project →
        </button>
      </form>
    </section>
  );
};

export default CreateProjectPage;
