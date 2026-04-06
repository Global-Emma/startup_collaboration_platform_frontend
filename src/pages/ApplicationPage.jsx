import React, { useState } from "react";
import api from "../utils/axios";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

const ApplicationPage = ({user}) => {
  const { id } = useParams();

  const [project, setProject] = useState();
  useEffect(() => {
    const fetchProject = async () => {
      const response = await api.get(`/api/projects/${id}`);
      const data = response.data.data;

      // API returns an array for single project endpoint, keep single object
      setProject(Array.isArray(data) ? data[0] : data);
    };

    fetchProject();
  }, [id]);

  const [form, setForm] = useState({
    proposal: "",
    bid: "",
    delivery: "",
    cv: null,
  });

  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "cv") {
      setForm({ ...form, cv: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("proposal", form.proposal);
    formData.append("bid", form.bid);
    formData.append("delivery", form.delivery);

    if (form.cv) {
      formData.append("file", form.cv);
    }

    const response = await api.post(`/api/apply/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.data.success) {
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      setForm({
        proposal: "",
        bid: "",
        delivery: "",
        cv: null,
      });
    }
  };

  const header ={
    text: `Apply for ${project?.title} Project`,
    subText: "",
  }

  return (
    <section className="app-page">
      <Navbar user={user} />
      <Header header={header} />
      <div className="app-container">
        {/* LEFT */}
        <div className="app-left">
          <div className="card project-card-modern">
            <h1>{project?.title}</h1>
            <p className="desc">{project?.description}</p>

            <div className="meta">
              <span>{project?.price}</span>
              <span>{project?.level}</span>
              <span>{project?.duration}</span>
            </div>

            <div className="skills">
              {project?.skills.map((s, i) => (
                <span key={i}>{s}</span>
              ))}
            </div>
          </div>

          <div className="card client-card">
            <h3>Client</h3>

            <div className="client">
              <img src={project?.user.avatar} alt="" />
              <div>
                <p>
                  {project?.user.firstname} {project?.user.lastname}
                </p>
                <span>{project?.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="app-right">
          <form className="card form-card" onSubmit={handleSubmit}>
            <h2>Apply</h2>

            <textarea
              name="proposal"
              placeholder="Write a strong proposal..."
              onChange={handleChange}
            />

            <div className="row">
              <input
                type="number"
                name="bid"
                placeholder="Your bid ($)"
                onChange={handleChange}
              />

              <input
                type="text"
                name="delivery"
                placeholder="Delivery time"
                onChange={handleChange}
              />
            </div>

            {/* CV Upload */}
            <label className="file-upload">
              Upload CV
              <input type="file" name="cv" onChange={handleChange} />
            </label>

            <button className="submit-btn">Submit Application →</button>
          </form>
        </div>
      </div>

      {/* TOAST */}
      {showToast && (
        <div className="toast">✅ Application submitted successfully!</div>
      )}
    </section>
  );
};

export default ApplicationPage;
