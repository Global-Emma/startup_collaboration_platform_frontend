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

const projects = [
  { id: 1, name: "SaaS Dashboard", status: "In Progress" },
  { id: 2, name: "AI Chatbot", status: "Pending" },
];

const applications = [
  { id: 1, project: "E-commerce Redesign", status: "Under Review" },
  { id: 2, project: "Mobile App", status: "Rejected" },
];

const UserDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(true);

  return (
    <>
      <Navbar />

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
            <a className="active">
              <LayoutDashboard size={18} />
              {sidebarOpen && <span>Dashboard</span>}
            </a>

            <a>
              <Briefcase size={18} />
              {sidebarOpen && <span>Projects</span>}
            </a>

            <a>
              <FileText size={18} />
              {sidebarOpen && <span>Applications</span>}
            </a>

            <a>
              <MessageCircle size={18} />
              {sidebarOpen && <span>Messages</span>}
            </a>

            <a>
              <Settings size={18} />
              {sidebarOpen && <span>Settings</span>}
            </a>
          </nav>
        </aside>

        {/* MAIN */}
        <div className="dashboard-main">
          {/* HEADER */}
          <div className="dashboard-header">
            <h1>Dashboard</h1>
            <p>Welcome back, here’s your activity overview.</p>
          </div>

          {/* STATS */}
          <div className="stats">
            <div className="stat-card">
              <h3>5</h3>
              <p>Active Projects</p>
            </div>
            <div className="stat-card">
              <h3>12</h3>
              <p>Applications Sent</p>
            </div>
            <div className="stat-card">
              <h3>3</h3>
              <p>Interviews</p>
            </div>
          </div>

          {/* PROJECTS */}
          <div className="dashboard-section">
            <h2>Active Projects</h2>

            <div className="dashboard-list">
              {projects.map((p) => (
                <div key={p.id} className="list-item">
                  <div>
                    <h4>{p.name}</h4>
                    <span>{p.status}</span>
                  </div>
                  <button>View</button>
                </div>
              ))}
            </div>
          </div>

          {/* APPLICATIONS */}
          <div className="dashboard-section">
            <h2>Recent Applications</h2>

            <div className="dashboard-list">
              {applications.map((a) => (
                <div key={a.id} className="list-item">
                  <div>
                    <h4>{a.project}</h4>
                    <span>{a.status}</span>
                  </div>
                  <button>Details</button>
                </div>
              ))}
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
