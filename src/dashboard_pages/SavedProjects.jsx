import "../styles/saved-projects.css";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DashboardNav from "../components/DashboardNav";
import api from "../utils/axios";

const SavedProjects = ({ user }) => {
  const [update, setUpdate] = useState(0)
  const savedProjects = useMemo(() => {
    return user?.savedProjects || [];
  }, [user?.savedProjects]);

  const handleRemoveSaved = async(id) => {
    try {
      const response = await api.delete(`/api/projects/save/${id}`)
      if(response.success){
        setUpdate(update + 1)
      }
    } catch (error) {
      console.log(error)
    }
  };

  if (!user) {
    return <p>Error loading user. Please try again.</p>;
  }

  return (
    <div className="saved-projects">
      <DashboardNav user={user} />

      <div className="saved-projects-page">
        {/* HEADER */}
        <div className="saved-header">
          <div>
            <h1>Saved Projects</h1>
            <p>Manage and revisit projects you saved for later</p>
          </div>
        </div>

        {/* GRID */}
        <div className="saved-projects-grid">
          {savedProjects.length === 0 ? (
            <div className="empty-saved">
              <h3>No Saved Projects</h3>
              <p>You haven’t saved any projects yet.</p>
            </div>
          ) : (
            savedProjects.map((project) => (
              <div className="saved-project-card" key={project._id}>
                {/* IMAGE */}
                <img
                  src={
                    project.image ||
                    "https://placeholderimage.co/600x400/ccc/22c55e?text=Project+Image"
                  }
                  alt=""
                  className="saved-project-img"
                />

                <div className="saved-project-content">
                  {/* TOP */}
                  <div className="saved-top">
                    <Link
                      style={{ textDecoration: "none" }}
                      className="service"
                      to={`/services/${project.service?._id}`}
                    >
                      <span>
                        {typeof project.service === "object"
                          ? project.service?.name
                          : project.service}
                      </span>
                    </Link>
                    <button
                      className="remove-saved-btn"
                      onClick={() => handleRemoveSaved(project._id)}
                    >
                      ✕
                    </button>
                  </div>

                  {/* TITLE */}
                  <Link
                    className="project-title"
                    style={{ textDecoration: "none" }}
                    to={`/projects/${project._id}`}
                  >
                    <h3>{project.title}</h3>
                  </Link>

                  {/* META */}
                  <p className="saved-meta">
                    {project.price} • {project.duration}
                  </p>

                  {/* DESCRIPTION */}
                  <p className="saved-description">
                    {project.description?.slice(0, 90)}...
                  </p>

                  {/* USER */}
                  <div className="saved-user">
                    <img
                      src={project.user?.avatar || "/images/default-avatar.png"}
                      alt=""
                    />

                    <div>
                      <h4>{project.user?.username}</h4>
                      <p>Employer</p>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="saved-actions">
                    <Link to={`/projects/${project._id}`}>
                      <button>View</button>
                    </Link>

                    <Link to={`/projects/apply/${project._id}`}>
                      <button className="apply-btn"
                      >Apply</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedProjects;
