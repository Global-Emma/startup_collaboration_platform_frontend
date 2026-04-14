import "../styles/my_projects.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DashboardNav from "../components/DashboardNav";
import { useMemo } from "react";
import api from "../utils/axios";

const MyProjects = ({ user, allProjects }) => {
  const navigate = useNavigate()
  const [filter, setFilter] = useState("all");

  const projects = allProjects.filter((p) => p?.user?._id === user?._id);

  const filteredEmployerProjects =
    filter === "all" ? projects : projects.filter((p) => p.status === filter);

  // const [search, setSearch] = useState("");
  // const [serviceFilter, setServiceFilter] = useState("all");

  const workedProjects = useMemo(() => {
    return user?.projects || [];
  }, [user?.projects]);
  const filteredProjects =
    filter === "all"
      ? workedProjects
      : workedProjects.filter((project) => project.status === filter);

  const handleMarkCompleted = (id) => {
    console.log("Mark completed:", id);

    // Connect backend here later
  };

  if (!user || !user.role) {
    return <p>Error loading user. Please try again.</p>;
  }

  return (
    <div className="project">
      <DashboardNav user={user} />

      {user.role === "employer" ? (
        <section className="my-projects">
          {/* HEADER */}
          <div className="my-projects-header-box">
            <div>
              <h1>My Projects</h1>
              <p>Manage and track your projects</p>
            </div>

            <Link to="/projects/create-project">
              <button className="create-btn">+ New Project</button>
            </Link>
          </div>

          {/* FILTER */}
          <div className="filters">
            {["all", "active", "completed", "cancelled"].map((f) => (
              <button
                key={f}
                className={filter === f ? "active" : ""}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          {/* GRID */}
          <div className="projects-grid">
            {filteredEmployerProjects.length === 0 ? (
              <p className="empty">No projects found</p>
            ) : (
              filteredEmployerProjects.map((project) => (
                <div className="project-card" key={project._id}>
                  <img
                    src={
                      project.image ||
                      "https://images.unsplash.com/photo-1555066931-4365d14bab8c"
                    }
                    alt=""
                  />

                  <div className="content">
                    <span className="status">{project.status}</span>

                    <h3>{project.title}</h3>

                    <p>
                      ${project.price} • {project.duration}
                    </p>

                    <span className="apps">
                      {project.applications?.length || 0} Applicants
                    </span>

                    <div className="action-btns">
                      <Link to={`/projects/${project._id}`}>
                        <button>View</button>
                      </Link>

                      <button className="edit" onClick={()=> navigate(`/dashboard/projects/edit/${project._id}`)}>Edit</button>
                      <button className="delete" onClick={async()=>{
                        try {
                          const response = await api.delete(`/api/projects/${project._id}`)
                          if(response.data.success){
                            alert('Project Deleted Successfully')
                          }
                        } catch (error) {
                          console.log(error)
                        }
                      }}>Delete</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      ) : (
        <div className="freelancer-projects-page">
          {/* HEADER */}
          <div className="freelancer-projects-header">
            <div>
              <h1>Worked Projects</h1>
              <p>Track and manage all projects you've worked on</p>
            </div>
          </div>

          {/* FILTERS */}
          <div className="project-status-filters">
            {["all", "active", "completed", "cancelled"].map((status) => (
              <button
                key={status}
                className={filter === status ? "active" : ""}
                onClick={() => setFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>

          {/* GRID */}
          <div className="worked-projects-grid">
            {filteredProjects.length === 0 ? (
              <div className="empty-worked-projects">
                <h3>No Projects Found</h3>
                <p>You haven't worked on any projects yet.</p>
              </div>
            ) : (
              filteredProjects.map((p, i) => (
                <div className="worked-project-card" key={p?.project?._id || i}>
                  <img
                    src={
                      p?.project?.image ||
                      "https://placeholderimage.co/600x400/ccc/22c55e?text=Project+Image"
                    }
                    alt=""
                  />

                  <div className="worked-project-content">
                    {/* STATUS */}
                    <div className="worked-project-top">
                      <Link
                        style={{ textDecoration: "none" }}
                        className="service"
                        to={`/services/${p?.project?.service._id}`}
                      >
                        <p>
                          {typeof p?.project?.service === "object"
                            ? p?.project?.service?.name
                            : p?.project?.service}
                        </p>
                      </Link>
                      <span className={`status-badge ${p?.project?.status}`}>
                        {p?.project?.status}
                      </span>
                    </div>

                    {/* TITLE */}
                    <Link
                      style={{ textDecoration: "none" }}
                      className="project-title"
                      to={`/projects/${p?.project?._id}`}
                    >
                      <h3>{p?.project?.title}</h3>
                    </Link>

                    {/* META */}
                    <p className="worked-meta">
                      {p?.project?.price} • {p?.project?.duration}
                    </p>

                    {/* EMPLOYER */}
                    <div className="worked-user">
                      <img
                        src={
                          p?.project?.user?.avatar ||
                          "/images/default-avatar.png"
                        }
                        alt=""
                      />

                      <div>
                        <h4>{p?.project?.user?.username}</h4>
                        <p>Employer</p>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="worked-actions">
                      <Link to={`/projects/${p?.project?._id}`}>
                        <button>View</button>
                      </Link>

                      {p?.project?.status === "active" && (
                        <button
                          className="complete-btn"
                          onClick={() => handleMarkCompleted(p?.project?._id)}
                        >
                          Mark Completed
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProjects;
