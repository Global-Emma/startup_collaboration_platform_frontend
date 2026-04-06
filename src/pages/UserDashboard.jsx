import React, { useState } from "react";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Settings,
  Menu,
  X,
  ChevronUp,
  ChevronDown,
  MessageCircle,
} from "lucide-react";
import Navbar from "../components/Navbar";
import { Link, useResolvedPath } from "react-router-dom";

const navlinks = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard size={18} />,
    link: "/dashboard",
  },
  {
    name: "Projects",
    icon: <Briefcase size={18} />,
    link: "/user-projects",
  },
  {
    name: "Applications",
    icon: <FileText size={18} />,
    link: "/user-applications",
  },
  {
    name: "Messages",
    icon: <MessageCircle size={18} />,
    link: "/user-messages",
  },
  {
    name: "Settings",
    icon: <Settings size={18} />,
    link: "/user-settings",
  },
];

const UserDashboard = ({ user }) => {
  const pathname = useResolvedPath().pathname;
  const projects = user.projects || [];
  const applications = user.applications || [];
  const [activeProjects, setActiveProjects] = useState(0);
  const [completedProjects, setCompletedProjects] = useState(0);
  const [cancelledProjects, setCancelledProjects] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(true);

  projects.forEach((project) => {
    if (project.status === "active") setActiveProjects((prev) => prev + 1);
    else if (project.status === "completed")
      setCompletedProjects((prev) => prev + 1);
    else if (project.status === "cancelled")
      setCancelledProjects((prev) => prev + 1);
  });

  return (
    <>
      <section className="dashboard">
        {/* SIDEBAR */}
        <aside className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
          <div
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </div>

          <nav>
            <div className="logo">
              {sidebarOpen && (
                <Link to="/">
                  <img src="/images/logo.png" alt="logo" />
                </Link>
              )}
            </div>

            {navlinks.map((link, i) => {
              const isActive = pathname === link.link;
              return (
                <Link key={i}
                  className={isActive ? "active link" : "link"}
                  to={link.link}
                >
                  {link.icon}
                  {sidebarOpen && <span>{link.name}</span>}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* MAIN */}
        <div className="dashboard-main">
          {/* HEADER */}
          <div className="dashboard-header">
            <h1>Dashboard</h1>
            <p>{`Welcome back, ${user.username || user.firstname || "there"}! Here's your activity overview.`}</p>
          </div>

          {/* STATS */}
          <div className="stats">
            <div className="stat-card">
              <h3>{activeProjects}</h3>
              <p>Active Projects</p>
            </div>
            <div className="stat-card">
              <h3>{user.applications?.length || 0}</h3>
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
                  <div key={p.id} className="list-item">
                    <div>
                      <h4>{p.name}</h4>
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
                  <div key={a.id} className="list-item">
                    <div>
                      <h4>{a.project?.title}</h4>
                      <span>{a.status}</span>
                    </div>
                    <button>Details</button>
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
    </>
  );
};

export default UserDashboard;
