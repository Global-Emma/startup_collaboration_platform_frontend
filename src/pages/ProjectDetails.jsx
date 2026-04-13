import { ArrowUpRight } from "lucide-react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import api from "../utils/axios";
import { useState } from "react";

const ProjectDetails = () => {
  const { id } = useParams();

  const [project, setProject] = useState();
  useEffect(() => {
    const fetchProject = async () => {
      const response = await api.get(`/api/projects/${id}`);
      const data = response.data.data;

      // API returns an array for single project endpoint, keep single object
      setProject(Array.isArray(data) ? data[0] : data);
    };

    fetchProject();
  }, [id]);

  const header = {
    text: project?.title,
    subText: "",
  };

  if (!project) {
    return <h2>Project not found</h2>;
  }

  return (
    <section className="project-details">
      <Navbar user={project?.user} />

      <Header header={header} />

      {/* TOP SECTION */}
      <div className="details-top">
        <img src={project?.image} alt={project?.title} />

        <div className="details-info">
          <Link style={{textDecoration: 'none'}} to={`/services/${project.service._id}`}>
            <span className="service">
              {project?.service?.name || project?.service}
            </span>
          </Link>
          <p className="description">{project?.description}</p>

          <div className="meta">
            <span>${project?.price}</span>
            <span>{project?.level}</span>
            <span>{project?.duration}</span>
            <span>{project?.location}</span>
          </div>

          <div className="skills">
            {project?.skills.map((skill, i) => (
              <span key={i}>{skill}</span>
            ))}
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="details-bottom">
        {/* LEFT */}
        <div className="details-main">
          <h2>Project Overview</h2>
          <p>{project?.description}</p>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="details-sidebar">
          <div className="poster">
            <img src={project?.user?.avatar} />
            <p>{project?.user?.firstname}</p>
          </div>

          <Link to={`/projects/apply/${project._id}`} className="">
            <button className="apply-btn">
              Apply Now <ArrowUpRight size={18} />
            </button>
          </Link>

          <button className="save-btn">Save Project</button>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetails;
