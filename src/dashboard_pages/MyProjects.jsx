import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardNav from "../components/DashboardNav";

const MyProjects = ({ user, allProjects }) => {
  const [filter, setFilter] = useState("all");

  const projects = allProjects.filter((p) => p?.user?._id === user?._id);

  const filteredEmployerProjects =
    filter === "all" ? projects : projects.filter((p) => p.status === filter);

  const [search, setSearch] = useState("");
  const [serviceFilter, setServiceFilter] = useState("all");

  const activeProjects = user?.projects || [];

  const services = [
    "all",
    ...new Set(activeProjects.map((p) => p.service?.name || p.service)),
  ];

  const filteredFreelancerProjects = activeProjects.filter((p) => {
    const matchSearch = p?.project?.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const projectService = p.project?.service?.name;
    const matchService =
      serviceFilter === "all" || projectService === serviceFilter;

    return matchSearch && matchService;
  });

  if (!user) {
    return <p>Error loading user. Please try again.</p>;
  }

  return (
    <div className="project">
      <DashboardNav user={user} />

      {user.role === "employer" ? (
        <section className="my-projects">
          {/* HEADER */}
          <div className="projects-header-box">
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
                      {project.price} • {project.duration}
                    </p>

                    <span className="apps">
                      {project.applications?.length || 0} Applicants
                    </span>

                    <div className="action-btns">
                      <Link to={`/projects/${project._id}`}>
                        <button>View</button>
                      </Link>

                      <button className="edit">Edit</button>
                      <button className="delete">Delete</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      ) : (
        <div className="user-projects">
          {/* HEADER */}
          <div className="projects-header">
            <h1>Projects</h1>
            <p>View your past and present projects</p>
          </div>

          {/* FILTERS */}
          <div className="projects-filters">
            <input
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
            >
              {services.map((s, i) => (
                <option key={i} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* GRID */}
          <div className="projects-grid">
            {filteredFreelancerProjects.length === 0 ? (
              <div className="empty">No projects found</div>
            ) : (
              filteredFreelancerProjects.map((project) => (
                <div className="project-card" key={project._id}>
                  <img
                    src={
                      project?.project?.image ||
                      "https://placeholderimage.co/600x400/ccc/22c55e?text=Project+Image"
                    }
                    alt=""
                  />

                  <div className="project-content">
                    <Link to={`/services/${project?.project.service._id}`}>
                      <span className="project-service">
                        {project.project?.service?.name}
                      </span>
                    </Link>

                    <Link to={`/projects/${project?.project?._id}`}>
                      <h3>{project?.project?.title}</h3>
                    </Link>

                    <p>
                      {project?.project?.price} • {project?.project?.duration}
                    </p>

                    <div className="project-user">
                      <img
                        src={
                          project?.project?.user?.avatar ||
                          "/images/default-avatar.png"
                        }
                        alt=""
                      />
                      <p>{project?.project?.user?.username}</p>
                    </div>

                    <div className="project-actions">
                      <Link to={`/projects/${project?.project?._id}`}>
                        <button>View</button>
                      </Link>
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
