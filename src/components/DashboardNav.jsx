import { useState } from "react";
import { Link, useResolvedPath } from "react-router-dom";
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Settings,
  Menu,
  X,
  MessageCircle,
  Bookmark,
} from "lucide-react";

const userNavlinks = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard size={18} />,
    link: "/dashboard",
  },
  {
    name: "Projects",
    icon: <Briefcase size={18} />,
    link: "/dashboard/projects",
  },
  {
    name: "Applications",
    icon: <FileText size={18} />,
    link: "/dashboard/applications",
  },
  {
    name: "Messages",
    icon: <MessageCircle size={18} />,
    link: "/dashboard/messages",
  },
  {
    name: "Saved Projects",
    icon: <Bookmark size={18} />,
    link: "/dashboard/saved-projects",
  },
  {
    name: "Settings",
    icon: <Settings size={18} />,
    link: "/dashboard/settings",
  },
];

const employerNavlinks = [
  {
    name: "Dashboard",
    icon: <LayoutDashboard size={18} />,
    link: "/dashboard",
  },
  {
    name: "My Projects",
    icon: <Briefcase size={18} />,
    link: "/dashboard/projects",
  },
  {
    name: "Applicants",
    icon: <FileText size={18} />,
    link: "/dashboard/applications",
  },
  {
    name: "Messages",
    icon: <MessageCircle size={18} />,
    link: "/dashboard/messages",
  },
  {
    name: "Settings",
    icon: <Settings size={18} />,
    link: "/dashboard/settings",
  },
];


const DashboardNav = ({ user }) => {
  const pathname = useResolvedPath().pathname;
  const [sidebarOpen, setSidebarOpen] = useState(true);
  return (
    <>
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

              {user?.role === 'employer' ? (
                employerNavlinks.map((link, i) => {
                const isActive = pathname === link.link;
                return (
                  <Link
                    key={i}
                    className={isActive ? "active link" : "link"}
                    to={link.link}
                  >
                    {link.icon}
                    {sidebarOpen && <span>{link.name}</span>}
                  </Link>
                );
              }) ): (
              userNavlinks.map((link, i)=>{
                const isActive = pathname === link.link;
                return (
                  <Link
                    key={i}
                    className={isActive ? "active link" : "link"}
                    to={link.link}
                  >
                    {link.icon}
                    {sidebarOpen && <span>{link.name}</span>}
                  </Link>
                );
              })
              )}
            </nav>
          </aside>
    </>
  )
}

export default DashboardNav