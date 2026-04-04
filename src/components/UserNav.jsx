import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

const NavbarUser = ({ user, onLogout }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();
  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
 
  return (
    <div className="nav-user-wrapper" ref={dropdownRef} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      
      {/* USER */}
      <div className="nav-user">
        <img src={user?.avatar} alt={user?.name} />
        <div className="user-info">
          <p className="username">{user?.firstname} {user?.lastname}</p>
          <span className="user-role">{user?.role}</span>
        </div>
      </div>

      {/* DROPDOWN */}
      <div className={`user-dropdown ${open ? "show" : ""}`}>

        {/* PROFILE PREVIEW */}
        <div className="dropdown-profile">
          <img src={user?.avatar ? user.avatar : "https://randomuser.me/api/portraits/men/32.jpg"} alt={user?.name} />
          <div className="profile-info">
            <p>{user?.firstname} {user?.lastname}</p>
            <span>{user?.role}</span>
          </div>
        </div>

        <Link className="link" to="/profile">User Profile</Link>
        <Link className="link" to="/dashboard">Dashboard</Link>
        <Link className="link" to="/projects">My Projects</Link>
        <Link className="link" to="/saved">Saved Projects</Link>
        <Link className="link" to="/settings">Settings</Link>

        <div className="dropdown-divider"></div>

        <button onClick={onLogout} className="logout-btn">
          Logout
        </button>

      </div>
    </div>
  );
};

export default NavbarUser;