import "../styles/users-page.css";
import { useMemo, useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../utils/axios";
const UsersPage = ({ user, allProjects }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

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

  useEffect(() => {
    const getAllUsers = async () => {
      const response = await api.get("/api/auth/users");
      if (response.data.success) {
        setUsers(response.data.data);
      }
    };
    getAllUsers();
  }, []);

  const [search, setSearch] = useState("");
  const [skillFilter, setSkillFilter] = useState("all");

  // Only freelancers
  const freelancers = useMemo(() => {
    return users.filter((user) => user.role === "freelancer");
  }, [users]);

  // Extract all skills dynamically
  const allSkills = [
    "all",
    ...new Set(freelancers.flatMap((user) => user.skills || [])),
  ];

  // Filter logic
  const filteredUsers = freelancers.filter((user) => {
    const matchesSearch =
      user.username?.toLowerCase().includes(search.toLowerCase()) ||
      user.firstname?.toLowerCase().includes(search.toLowerCase()) ||
      user.lastname?.toLowerCase().includes(search.toLowerCase());

    const matchesSkill =
      skillFilter === "all" || user.skills?.includes(skillFilter);

    return matchesSearch && matchesSkill;
  });

  // Get only employers
  const employers = useMemo(() => {
    return users.filter((user) => user.role === "employer");
  }, [users]);

  // Search filter
  const filteredEmployers = employers.filter(
    (employer) =>
      employer.username?.toLowerCase().includes(search.toLowerCase()) ||
      employer.firstname?.toLowerCase().includes(search.toLowerCase()) ||
      employer.lastname?.toLowerCase().includes(search.toLowerCase()),
  );

  if (!user || !user.role) {
    return <p>Please Login to view Users.</p>;
  }

  return (
    <div className="users-page">
      <Navbar user={user} />
      {/* HEADER */}
      {!user && (
        <div className="freelancers-page">
          <div className="users-header">
            <div>
              <h1>Discover Talent</h1>
              <p>
                Browse skilled freelancers and find the right fit for your
                project
              </p>
            </div>
          </div>

          {/* FILTERS */}
          <div className="users-filters">
            <input
              type="text"
              placeholder="Search freelancers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
            >
              {allSkills.map((skill, i) => (
                <option key={i} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>

          {/* USERS GRID */}
          <div className="users-grid">
            {users.length === 0 ? (
              <div className="empty-users">
                <h3>No Freelancers Found</h3>
                <p>Try adjusting your search/filter</p>
              </div>
            ) : (
              users.map((user) => {
                return (
                  <div className="user-card" key={user._id}>
                    {/* TOP */}
                    <div className="user-top">
                      <img
                        src={user.avatar || "/images/default-avatar.png"}
                        alt=""
                      />

                      <div>
                        <h3>{user.username}</h3>
                        <p>
                          {user.firstname} {user.lastname}
                        </p>
                      </div>
                    </div>

                    {/* BIO */}
                    <p className="user-bio">
                      {user.bio?.slice(0, 90) ||
                        "Experienced freelancer available for work."}
                    </p>

                    {/* SKILLS */}
                    <div className="user-skills">
                      {user.skills?.slice(0, 4).map((skill, i) => (
                        <span key={i}>{skill}</span>
                      ))}
                    </div>

                    {/* STATS */}
                    <div className="user-stats">
                      <span>{user.projects?.length || 0} Projects</span>

                      <span>{user.rating || "5.0"} ⭐</span>
                    </div>

                    {/* ACTIONS */}
                    <div className="user-actions">
                      <Link to={`/users/profile/${user._id}`}>
                        <button>View Profile</button>
                      </Link>

                      <button
                        onClick={() => handleStartConversation(user._id)}
                        className="message-btn"
                      >
                        Message
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
      {user.role === "employer" ? (
        <div className="freelancers-page">
          <div className="users-header">
            <div>
              <h1>Discover Talent</h1>
              <p>
                Browse skilled freelancers and find the right fit for your
                project
              </p>
            </div>
          </div>

          {/* FILTERS */}
          <div className="users-filters">
            <input
              type="text"
              placeholder="Search freelancers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
            >
              {allSkills.map((skill, i) => (
                <option key={i} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
          </div>

          {/* USERS GRID */}
          <div className="users-grid">
            {filteredUsers.length === 0 ? (
              <div className="empty-users">
                <h3>No Freelancers Found</h3>
                <p>Try adjusting your search/filter</p>
              </div>
            ) : (
              filteredUsers.map((user) => {
                return (
                  <div className="user-card" key={user._id}>
                    {/* TOP */}
                    <div className="user-top">
                      <img
                        src={user.avatar || "/images/default-avatar.png"}
                        alt=""
                      />

                      <div>
                        <h3>{user.username}</h3>
                        <p>
                          {user.firstname} {user.lastname}
                        </p>
                      </div>
                    </div>

                    {/* BIO */}
                    <p className="user-bio">
                      {user.bio?.slice(0, 90) ||
                        "Experienced freelancer available for work."}
                    </p>

                    {/* SKILLS */}
                    <div className="user-skills">
                      {user.skills?.slice(0, 4).map((skill, i) => (
                        <span key={i}>{skill}</span>
                      ))}
                    </div>

                    {/* STATS */}
                    <div className="user-stats">
                      <span>{user.projects?.length || 0} Projects</span>

                      <span>{user.rating || "5.0"} ⭐</span>
                    </div>

                    {/* ACTIONS */}
                    <div className="user-actions">
                      <Link to={`/users/profile/${user._id}`}>
                        <button>View Profile</button>
                      </Link>

                      <button
                        onClick={() => handleStartConversation(user._id)}
                        className="message-btn"
                      >
                        Message
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      ) : (
        <div className="employers-page">
          {/* HEADER */}
          <div className="employers-header">
            <div>
              <h1>Discover Employers</h1>
              <p>Browse employers and connect with potential clients</p>
            </div>
          </div>

          {/* SEARCH */}
          <div className="employers-filters">
            <input
              type="text"
              placeholder="Search employers..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* GRID */}
          <div className="employers-grid">
            {filteredEmployers.length === 0 ? (
              <div className="empty-employers">
                <h3>No Employers Found</h3>
                <p>Try another search term</p>
              </div>
            ) : (
              filteredEmployers.map((employer) => {
                const projects = allProjects.filter((project) => {
                  return project.user._id === employer._id;
                });
                return (
                  <div className="employer-card" key={employer._id}>
                    {/* TOP */}
                    <div className="employer-top">
                      <img
                        src={employer.avatar || "/images/default-avatar.png"}
                        alt=""
                      />

                      <div>
                        <h3>{employer.username}</h3>
                        <p>
                          {employer.firstname} {employer.lastname}
                        </p>
                      </div>
                    </div>

                    {/* BIO */}
                    <p className="employer-bio">
                      {employer.bio?.slice(0, 100) ||
                        "Employer available for hiring talented freelancers."}
                    </p>

                    {/* STATS */}
                    <div className="employer-stats">
                      <span>{projects?.length || 0} Posted</span>

                      <span>{employer.rating || "5.0"} ⭐</span>
                    </div>

                    {/* ACTIONS */}
                    <div className="employer-actions">
                      <Link to={`/users/profile/${employer._id}`}>
                        <button>View Profile</button>
                      </Link>

                      <button
                        onClick={() => handleStartConversation(employer._id)}
                        className="message-btn"
                      >
                        Message
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

export default UsersPage;
