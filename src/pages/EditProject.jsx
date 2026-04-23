import "../styles/edit-project.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/axios";
import Header from "../components/Header";
import DashboardNav from "../components/DashboardNav";
import { isAxiosError } from "axios";
import ErrorMessage from "../components/ErrorMessage";

const EditProject = ({ user, services, allProjects }) => {

  const [error, setError] = useState(null);

  const { id } = useParams();
  const navigate = useNavigate()
  const currentProject = allProjects.find((project) => project._id === id);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    service: "",
    level: "",
    duration: "",
    location: "",
    skills: [],
    image: "",
  });

  const [skillInput, setSkillInput] = useState("");

  useEffect(() => {
    const update = () => {
      if (currentProject) {
        setFormData({
          title: currentProject.title || "",
          description: currentProject.description || "",
          price: currentProject.price || "",
          service: currentProject.service || "",
          level: currentProject.level || "",
          duration: currentProject.duration || "",
          location: currentProject.location || "",
          skills: currentProject.skills || [],
          // image: currentProject.image || "",
        });
      }
    };

    update();
  }, [currentProject]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData({
        ...formData,
        image: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput],
      });

      setSkillInput("");
    }
  };

  const removeSkill = (skill) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.put(`/api/projects/${id}`, formData);
      if (response.data.success) {
        alert("Project Updated Successfully");
        navigate('/dashboard/projects')
      }
    } catch (error) {
      if(isAxiosError(error)){
        setError(error.response?.data || error.message);
      }
    }
  };

  const header = {
    text:'Edit Project',
    subText: 'Update your project details below'
  }

  if (error) {
    setTimeout(() => {
      setError(null);
    }, 5000);

    return <ErrorMessage error={error} />;
  }


  return (
    <div className="edit-project-page">
      <DashboardNav user={user}/>
      <div className="edit-project-container">
        <Header header={header} />

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Project Title"
            value={formData.title}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
          />

          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
          >
            <option value="">Select Service</option>
          {services.map((service)=>{
            return <option key={service._id}>{service.name}</option>
          })}
          </select>

          <select name="level" value={formData.level} onChange={handleChange}>
            <option value="">Select Level</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Expert</option>
          </select>

          <input
            type="text"
            name="duration"
            placeholder="Duration"
            value={formData.duration}
            onChange={handleChange}
          />

          <input
            type="text"
            name="location"
            placeholder="Project Location"
            value={formData.location}
            onChange={handleChange}
          />

          {/* SKILLS */}
          <div className="skills-input-box">
            <input
              type="text"
              placeholder="Add Skill"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
            />

            <button type="button" onClick={addSkill}>
              Add
            </button>
          </div>

          <div className="skills-preview">
            {formData.skills.map((skill, i) => (
              <span key={i}>
                {skill}
                <button type="button" onClick={() => removeSkill(skill)}>
                  ×
                </button>
              </span>
            ))}
          </div>

          {/* IMAGE */}
          {/* <input type="file" name="image" onChange={handleChange} /> */}

          <button type="submit" className="submit-btn">
            Update Project
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProject;
