import React from "react";
import { Mail, MapPin, Briefcase } from "lucide-react";


const UserProfile = ({ user }) => {
  return (
    <section className="profile-modern">

      {/* TOP CARD */}
      <div className="profile-card">

        <div className="profile-left">
          <img src={user.avatar} alt={user.firstname} />

          <div>
            <h1>{user.firstname} {user.lastname}</h1>
            <p className="role">{user.role}</p>

            <div className="profile-meta">
              <span><MapPin size={14} /> {user.location}</span>
              <span><Mail size={14} /> {user.email}</span>
              <span><Briefcase size={14} /> Available for work</span>
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <button className="primary-btn">Edit Profile</button>
          <button className="secondary-btn">Message</button>
        </div>

      </div>

      {/* MAIN GRID */}
      <div className="profile-grid">

        {/* ABOUT */}
        <div className="profile-box">
          <h2>About</h2>
          <p>{user.bio}</p>
        </div>

        {/* SKILLS */}
        <div className="profile-box">
          <h2>Skills</h2>

          <div className="skills">
            {user.skills.map((skill, i) => (
              <span key={i}>{skill}</span>
            ))}
          </div>
        </div>

        {/* STATS */}
        <div className="profile-box stats-box">
          <div>
            <h3>12</h3>
            <p>Projects</p>
          </div>
          <div>
            <h3>8</h3>
            <p>Completed</p>
          </div>
          <div>
            <h3>4.8</h3>
            <p>Rating</p>
          </div>
        </div>

      </div>

    </section>
  );
};

export default UserProfile;