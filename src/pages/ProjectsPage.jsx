import React, { useState } from "react";
import { Filter, ArrowUpRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Projects from "../components/Projects";
import Header from "../components/Header";


const ProjectsPage = ({projects, services, user}) => {
  const [showFilter, setShowFilter] = useState(false);

  const header = {
    text: 'Explore Projects',
    subText: 'Discover real startup project collaborate with founders, and build impactful products'
  }

  return (
    <section className="projects-page">
      <Navbar user={user} />
      {/* Header */}
      <Header header={header}/>

      {/* Mobile Filter Button */}
      <button className="filter-btn" onClick={() => setShowFilter(true)}>
        <Filter size={18} /> Filters
      </button>

      <div className="projects-layout">
        {/* Filter Sidebar */}
        <div className={`filter ${showFilter ? "active" : ""}`}>
          <h3>Filters</h3>

          <select>
            {services.map((service) => (
              <option key={service._id}>{service.name}</option>
            ))}
          </select>

          <select>
            <option>Experience Level</option>
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>

          <button onClick={() => setShowFilter(false)}>Apply</button>
        </div>

        {/* Overlay (mobile) */}
        {showFilter && (
          <div className="overlay" onClick={() => setShowFilter(false)}></div>
        )}

        {/* Projects Grid */}
        <div className="projects-grid">
          {projects.map((project) => {
            return (
              <Projects project={project} key={project._id} />
            )
          }
            
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsPage;
