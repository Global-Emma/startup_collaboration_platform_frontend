import "../styles/service-details.css";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import { useState } from "react";
import api from "../utils/axios";
import { useParams } from "react-router-dom";
import Projects from "../components/Projects";
import { isAxiosError } from "axios";
import ErrorMessage from "../components/ErrorMessage";

const ServiceDetails = ({ user }) => {
  const { id } = useParams();

  const [error, setError] = useState(null);

  const [service, setService] = useState([]);

  useEffect(() => {
    const fetchService = async () => {
      try {
        // Simulate an API call
        const response = await api.get(`/api/services/${id}`);
        const data = await response.data.data;

        setService(data);
      } catch (error) {
        if (isAxiosError(error)) {
          setError(error.response?.data || error.message);
        }
      }
    };

    fetchService();
  }, [id]);

  const header = {
    text: service.name,
    subText: "",
  };

  if (error) {
    setTimeout(() => {
      setError(null);
    }, 5000);

    return <ErrorMessage error={error} />;
  }

  return (
    <section className="single-service">
      <Navbar user={user} />
      {/* HEADER */}
      <Header header={header} />

      {/* PROJECTS */}
      <div className="service-projects">
        {service?.projects &&
          service.projects.map((project) => {
            return <Projects project={project} key={project._id} />;
          })}
      </div>
    </section>
  );
};

export default ServiceDetails;
