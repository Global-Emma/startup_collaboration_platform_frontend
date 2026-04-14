import "../styles/user-dashboard.css";
import { useState, useMemo } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import DashboardNav from "../components/DashboardNav";

const UserDashboard = ({ user, allProjects }) => {
  const navigate = useNavigate()
  const projects = useMemo(() => user?.projects || [], [user?.projects]);
  const applications = user?.applications || [];
  const [notificationsOpen, setNotificationsOpen] = useState(true);

  const activeProjects = useMemo(() => {
   return projects.filter(
      (project) => project.status === "active"
   ).length;
}, [projects]);

const completedProjects = useMemo(() => {
   return projects.filter(
      (project) => project.status === "completed"
   ).length;
}, [projects]);

const cancelledProjects = useMemo(() => {
   return projects.filter(
      (project) => project.status === "cancelled"
   ).length;
}, [projects]);

  const empProjects =
    allProjects?.filter((p) => p?.user?._id === user?._id) || [];

  const applicants = empProjects.reduce(
    (total, p) => total + (p.applications?.length || 0),
    0,
  );

  const active = empProjects.filter((p) => p.status === "active").length;
  if (!user)
    return "Some Error Occured Please Check to the Internet and try again";
  return (
    <>
      {user?.role === "employer" ? (
        <div className="emp-dashboard">
          {/* SIDEBAR */}
          <DashboardNav user={user} />

          {/* MAIN */}
          <main className="emp-main">
            {/* TOPBAR */}
            <div className="emp-topbar">
              <input placeholder="Search..." />

              <div className="top-actions">
                <span>🔔</span>

                <div className="user">
                  <img src={user.avatar} alt="employer_image" />
                  <p>{user.username}</p>
                </div>
              </div>
            </div>

            {/* STATS */}
            <div className="emp-stats">
              <div className="stat-card">
                <h3>{empProjects.length}</h3>
                <p>Projects Posted</p>
              </div>

              <div className="stat-card">
                <h3>{applicants}</h3>
                <p>Total Applicants</p>
              </div>

              <div className="stat-card">
                <h3>{active}</h3>
                <p>Active Projects</p>
              </div>
            </div>

            {/* PROJECTS */}
            <section className="emp-section">
              <div className="section-header">
                <h2>Recent Projects</h2>
                <Link to={"/projects/create-project"}>
                  <button>+ New Project</button>
                </Link>
              </div>

              <div className="projects-list">
                {empProjects.slice(0, 3).map((project) => (
                  <div className="project-item" key={project._id}>
                    <h3>{project.title}</h3>
                    <p>
                      ${project.price} • {project.duration}
                    </p>
                    <span>{project.applications?.length || 0} Applicants</span>
                  </div>
                ))}
              </div>
            </section>

            {/* APPLICANTS */}
            <section className="section">
              <h2>Recent Applicants</h2>

              <div className="list">
                {empProjects
                  .flatMap((p) => p.applications || [])
                  .slice(0, 5)
                  .map((app, i) => (
                    <div className="applicant" key={i}>
                      <img
                        src={
                          app?.applicant?.avatar || "/images/default-avatar.png"
                        }
                        alt=""
                      />

                      <div>
                        <p>{app?.applicant?.username}</p>
                        <div className="skills">
                          {app?.applicant?.skills?.map((s, idx) => (
                            <span key={idx}>{s}</span>
                          ))}
                        </div>
                      </div>

                      <button>View</button>
                    </div>
                  ))}
              </div>
            </section>
            {/* 🔔 NOTIFICATIONS */}
            <div
              className={`notifications ${notificationsOpen ? "open" : "closed"}`}
            >
              <div
                className="notifications-header"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
              >
                <h4>Notifications</h4>
                {notificationsOpen ? (
                  <ChevronDown size={16} />
                ) : (
                  <ChevronUp size={16} />
                )}
              </div>

              {notificationsOpen && (
                <div className="notifications-body">
                  <p>New project posted</p>
                  <p>Your application was viewed</p>
                  <p>You got a new message</p>
                </div>
              )}
            </div>
          </main>
        </div>
      ) : (
        <section className="dashboard">
          {/* SIDEBAR */}
          <DashboardNav user={user} />

          {/* MAIN */}
          <div className="dashboard-main">
            {/* HEADER */}
            <div className="dashboard-header">
              <h1>Dashboard</h1>
              <p>{`Welcome back, ${user?.username || user?.firstname || "there"}! Here's your activity overview.`}</p>
            </div>

            {/* STATS */}
            <div className="stats">
              <div className="stat-card">
                <h3>{activeProjects}</h3>
                <p>Active Projects</p>
              </div>
              <div className="stat-card">
                <h3>{user?.applications?.length || 0}</h3>
                <p>Applications Sent</p>
              </div>
              <div className="stat-card">
                <h3>{completedProjects}</h3>
                <p>Completed Projects</p>
              </div>
              <div className="stat-card">
                <h3>{cancelledProjects}</h3>
                <p>Cancelled Projects</p>
              </div>
            </div>

            {/* PROJECTS */}
            <div className="dashboard-section">
              <h2>Active Projects</h2>

              <div className="dashboard-list">
                {projects.length === 0 ? (
                  <p>No active projects.</p>
                ) : (
                  projects.map((p) => (
                    <div key={p?._id} className="list-item">
                      <div>
                        <h4>{p.project?.title}</h4>
                        <span>{p.status}</span>
                      </div>
                      <button>View</button>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* APPLICATIONS */}
            <div className="dashboard-section">
              <h2>Recent Applications</h2>

              <div className="dashboard-list">
                {applications.length === 0 ? (
                  <p>No applications sent.</p>
                ) : (
                  applications.map((a) => (
                    <div key={a._id} className="list-item">
                      <div>
                        <h4>{a.project?.title}</h4>
                        <span>{a.status}</span>
                      </div>
                      <button onClick={()=> navigate('/dashboard/applications')}>Details</button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* 🔔 NOTIFICATIONS */}
          <div
            className={`notifications ${notificationsOpen ? "open" : "closed"}`}
          >
            <div
              className="notifications-header"
              onClick={() => setNotificationsOpen(!notificationsOpen)}
            >
              <h4>Notifications</h4>
              {notificationsOpen ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronUp size={16} />
              )}
            </div>

            {notificationsOpen && (
              <div className="notifications-body">
                <p>New project posted</p>
                <p>Your application was viewed</p>
                <p>You got a new message</p>
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default UserDashboard;
