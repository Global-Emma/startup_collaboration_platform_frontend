import "../styles/applicants.css";
import { useState } from "react";
import DashboardNav from "../components/DashboardNav";
import api from "../utils/axios";
import { Link, useNavigate } from "react-router-dom";

const Applications = ({ user, allProjects }) => {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const navigate = useNavigate()

  // Get employer projects
  const projects = allProjects.filter((p) => p?.user?._id === user?._id);

  // Get selected project
  const selectedProject = projects.find((p) => p._id === selectedProjectId);

  const applicants = selectedProject?.applications || [];

  /* ACTION HANDLERS (connect backend later) */
  const handleAccept = async (id) => {
    try {
      const response = await api.put(`/api/apply/accept/${id}`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async (id) => {
    try {
      const response = await api.put(`/api/apply/reject/${id}`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await api.delete(`/api/apply/${id}`);
      if (response.data.success) {
        navigate("/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [filter, setFilter] = useState("all");

  const applications = user?.applications || [];

  const filteredApplications =
    filter === "all"
      ? applications
      : applications.filter((app) => app.status === filter);

  if (!user || !user.role) {
    return <p>Error loading user. Please try again.</p>;
  }

  return (
    <div className="applicant-box">
      <DashboardNav user={user} />

      {user.role === "employer" ? (
        <section className="applicants-page">
          {/* HEADER */}
          <div className="header-box">
            <h1>Applicants</h1>
            <p>View and manage applicants for your projects</p>
          </div>

          <div className="applicants-layout">
            {/* LEFT - PROJECT LIST */}
            <div className="project-sidebar">
              <h3>Your Projects</h3>

              {projects.map((project) => (
                <div
                  key={project._id}
                  className={`project-item ${
                    selectedProjectId === project._id ? "active" : ""
                  }`}
                  onClick={() => setSelectedProjectId(project._id)}
                >
                  <p>{project.title}</p>
                  <span>{project.applications?.length || 0} applicants</span>
                </div>
              ))}
            </div>

            {/* RIGHT - APPLICANTS */}
            <div className="applicants-content">
              {!selectedProject ? (
                <div className="empty">
                  <p>Select a project to view applicants</p>
                </div>
              ) : (
                <>
                  {/* PROJECT INFO */}
                  <div className="project-info">
                    <h2>{selectedProject.title}</h2>
                    <p>{selectedProject.description}</p>
                  </div>

                  {/* APPLICANTS LIST */}
                  <div className="applicants-list">
                    {applicants.length === 0 ? (
                      <p>No applicants yet.</p>
                    ) : (
                      applicants.map((app, i) => (
                        <div className="applicant-card" key={i}>
                          <div className="applicant-left">
                            <Link to={`/users/profile/${app?.applicant?._id}`}>
                              <img
                                src={
                                  app?.applicant?.avatar ||
                                  "/images/default-avatar.png"
                                }
                                alt=""
                              />
                            </Link>

                            <div>
                              <h4>{app?.applicant?.username}</h4>

                              <div className="skills">
                                {app?.applicant?.skills?.map((skill, idx) => (
                                  <span key={idx}>{skill}</span>
                                ))}
                              </div>

                              <p className="cover">
                                {app.proposal?.slice(0, 100)}...
                              </p>
                            </div>
                          </div>

                          <div className="applicant-actions">
                            <button
                              className="accept"
                              onClick={() => handleAccept(app._id)}
                            >
                              Accept
                            </button>

                            <button
                              className="reject"
                              onClick={() => handleReject(app._id)}
                            >
                              Reject
                            </button>

                            <button
                              className="delete"
                              onClick={() => handleDelete(app._id)}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      ) : (
        <div className="applications-page">
          {/* HEADER */}
          <div className="applications-header">
            <div>
              <h1>My Applications</h1>
              <p>Track all applications you’ve submitted</p>
            </div>
          </div>

          {/* FILTER TABS */}
          <div className="application-filters">
            {["all", "pending", "accepted", "rejected"].map((status) => (
              <button
                key={status}
                className={filter === status ? "active" : ""}
                onClick={() => setFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>

          {/* APPLICATIONS LIST */}
          <div className="applications-grid">
            {filteredApplications.length === 0 ? (
              <div className="empty-state">
                <h3>No Applications Found</h3>
                <p>You haven't submitted any applications yet.</p>
              </div>
            ) : (
              filteredApplications.map((app) => {
                return (
                  <div className="application-card" key={app._id}>
                    <div className="application-top">
                      <span className={`status ${app.status}`}>
                        {app.status}
                      </span>

                      <small>
                        Applied on{" "}
                        {new Date(app.createdAt).toLocaleDateString()}
                      </small>
                    </div>

                    <h3>{app.project?.title}</h3>

                    <p className="company">{app.project.user.username}</p>

                    <p className="meta">
                      {app.project?.price} • {app.project?.duration}
                    </p>

                    <p className="description">
                      {app.proposal?.slice(0, 120)}...
                    </p>

                    <div className="application-actions">
                      <Link to={`/projects/${app.project?._id}`}>
                        <button>View Project</button>
                      </Link>

                      <button
                        className={
                          app.status === "accepted"
                            ? "withdraw-off"
                            : "withdraw-btn"
                        }
                        onClick={async () => {
                          try {
                            const response = await api.delete(
                              `/api/apply/${app._id}`,
                            );
                            if (response.data.success) {
                              window.location.reload();
                            }
                          } catch (error) {
                            console.log(error);
                          }
                        }}
                      >
                        Withdraw
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Applications;
