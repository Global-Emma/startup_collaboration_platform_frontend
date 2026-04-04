import { Link} from "react-router-dom";

const Projects = ({ project }) => {
  return (
    <>
      <div className="project-card">
        <img src={project.image} alt={project.title} className="project-img" />

        <div className="project-content">
          <Link to={`/services/${project.service._id}`} className="service">
            {project.service.name}
          </Link>

          <Link to={`/projects/${project._id}`}>
            <h3 className="project-title">{project.title}</h3>
          </Link>

          <p className="price">${project.price}</p>

          <div className="meta">
            <span>{(project.level).charAt(0).toUpperCase() + project.level.slice(1)}</span>
            <span>•</span>
            <span>{project.user.firstname + " " + project.user.lastname}</span>
          </div>

          <div className="project-user">
            <img src={project.user?.avatar} alt={project.user?.firstname + " " + project.user?.lastname} />
            <p>{project.user?.firstname + " " + project.user?.lastname}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Projects;
