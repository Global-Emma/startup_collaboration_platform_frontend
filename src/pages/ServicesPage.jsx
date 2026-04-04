import React from "react";
import { ArrowUpRight } from "lucide-react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Services from "../components/Services";

const ServicesPage = ({ user, services}) => {

  const header = {
    text: 'Our Services',
    subText: 'Explore the wide range of services our talented tech freelancers offer.'
  }

  return (
    <section className="services-page">
      <Navbar user={user} />
      {/* HEADER BOX */}
      <Header header={header} />

      {/* SERVICES GRID */}
      <div className="services-grid">
        {services.map((service) => (
          <Services service={service} key={service._id} />
        ))}
      </div>
    </section>
  );
};

export default ServicesPage;