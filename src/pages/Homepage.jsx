import Navbar from "../components/Navbar";
import Projects from "../components/Projects";
import Services from "../components/Services";
import Footer from "../components/Footer";

const Homepage = ({ user, services, projects }) => {
  return (
    <>
      <title>Homepage</title>
      <Navbar user={user} />

      <section className="hero">
        <div className="hero-container">
          <div className="hero-left">
            <h1 className="hero-title">
              Find Your Startup Team. Build the Future Together.
            </h1>

            <p className="hero-subtext">
              Connect with founders, join real startup projects, and collaborate
              with talented builders to bring ideas to life.
            </p>

            <div className="hero-search">
              <input
                type="text"
                placeholder="Search projects, skills, or roles..."
              />
              <button>Search</button>
            </div>
          </div>

          <div className="hero-right">
            <div className="image-grid">
              <img
                style={{ borderRadius: "10px 10px 0px 0px" }}
                src="https://images.unsplash.com/photo-1551434678-e076c223a692"
              />
              <img
                style={{ borderRadius: "0px 0px 0px 10px" }}
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
              />
              <img
                style={{ borderRadius: "0px 0px 10px 0px" }}
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="services">
        <div className="services-header">
          <h2>Browse projects by services</h2>

          <a href="/services" className="services-btn">
            All Services →
          </a>
        </div>

        <div className="services-container">
          {services.map((service) => {
            return <Services key={service._id} service={service} />;
          })}
        </div>
      </section>

      <section className="projects">
        <div className="projects-header">
          <h2>Recent Projects</h2>

          <a href="/projects" className="projects-btn">
            All Projects →
          </a>
        </div>

        <div className="projects-container">
          {[...projects]
            .reverse()
            .slice(0, 5)
            .map((project) => {
              return (
                <Projects key={project._id} project={project} />
              );
            })}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Homepage;
