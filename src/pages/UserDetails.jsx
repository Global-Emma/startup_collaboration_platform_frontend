import "../styles/user-details.css";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../utils/axios";
import Navbar from "../components/Navbar";

const UserDetails = ({ loggedInUser, allProjects }) => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      const response = await api.get("/api/auth/users");
      if (response.data.success) {
        setUsers(response.data.data);
      }
    };
    getAllUsers();
  }, []);
  const { id } = useParams();

  const user = users.find((u) => u._id === id);

  const projects = allProjects?.filter((project) => {
    return project.user._id === id;
  });

  const navigate = useNavigate();

  const handleStartConversation = async (receiverId) => {
    try {
      const response = await api.post("/api/chat", {
        receiverId,
      });

      if (response.data.success) {
        navigate("/dashboard/messages", {
          state: {
            conversationId: response.data.data._id,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    return (
      <div className="view-user-page">
        <h2>User Not Found</h2>
      </div>
    );
  }

  return (
    <div className="view-user-page">
      <Navbar user={loggedInUser} />

      {/* HERO */}
      <div className="profile-hero">
        <div className="profile-cover"></div>

        <div className="profile-main">
          <img
            src={user.avatar || "/images/default-avatar.png"}
            alt=""
            className="profile-avatar"
          />

          <div className="profile-info">
            <h1>{user.username}</h1>

            <p>
              {user.firstname} {user.lastname}
            </p>

            <span className="role-badge">{user.role}</span>
          </div>

          <button
            onClick={() => handleStartConversation(user._id)}
            className="message-btn"
          >
            Message User
          </button>
        </div>
      </div>

      {/* BODY */}
      <div className="profile-body">
        {/* LEFT */}
        <div className="profile-left-box">
          <div className="profile-card-box">
            <h3>About</h3>

            <p>{user.bio || "This user has not added a bio yet."}</p>
          </div>

          {user.role === "freelancer" && (
            <div className="profile-card">
              <h3>Skills</h3>

              <div className="skills-wrap">
                {user.skills?.map((skill, i) => (
                  <span key={i}>{skill}</span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT */}
        <div className="profile-right">
          <div className="profile-card-box">
            <h3>Stats</h3>

            <div className="stats-grid">
              <div>
                <h4>{user.projects?.length || 0}</h4>
                <p>
                  {user.role === "employer"
                    ? "Projects Posted"
                    : "Projects Worked"}
                </p>
              </div>

              <div>
                <h4>{user.rating || "5.0"}</h4>
                <p>Rating</p>
              </div>

              <div>
                <h4>{new Date(user.createdAt).getFullYear()}</h4>
                <p>Joined</p>
              </div>
            </div>
          </div>

          <div className="profile-card-box">
            <h3>Recent Projects</h3>

            <div className="recent-projects">
              {projects?.length > 0 ? (
                projects.slice(0, 4).map((project) => (
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/projects/${project._id}`}
                    key={project._id}
                  >
                    <div className="recent-project-item">
                      <h4>{project?.title}</h4>

                      <span>{project.status}</span>
                    </div>
                  </Link>
                ))
              ) : (
                <p>No projects available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
