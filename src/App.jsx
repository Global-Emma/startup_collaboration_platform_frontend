import "./styles/homepage.css";
import "./styles/signup.css";
import "./styles/signin.css";
import "./styles/projects.css";
import "./styles/project-details.css";
import "./styles/services.css";
import "./styles/about.css";
import "./styles/contact.css";
import "./styles/user-dashboard.css";
import "./styles/user-profile.css";
import "./styles/service-details.css";
import "./styles/create-project.css";
import "./styles/application.css";
import "./styles/messages.css";
import "./styles/my_projects.css";
import "./styles/applicants.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetails from "./pages/ProjectDetails";
import ServicesPage from "./pages/ServicesPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import UserDashboard from "./dashboard_pages/UserDashboard";
import UserProfile from "./pages/UserProfile";
// import { useEffect, useState } from 'react'
// import api from './utils/axios'
import ServiceDetails from "./pages/ServiceDetails";
import CreateProjectPage from "./pages/CreateProjectPage";
import ApplicationPage from "./pages/ApplicationPage";
import { useApp } from "./utils/useApp";
import MessagesPage from "./dashboard_pages/Messages";
import MyProjects from "./dashboard_pages/MyProjects";
import Applications from "./dashboard_pages/Applications";

function App() {
  const { user } = useApp();
  const { services } = useApp();
  const { projects } = useApp();

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Homepage user={user} services={services} projects={projects} />
        }
      />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route
        path="/projects"
        element={<ProjectsPage projects={projects} user={user} />}
      />
      <Route path="/projects/:id" element={<ProjectDetails />} />
      <Route
        path="/projects/create-project"
        element={<CreateProjectPage services={services} />}
      />
      <Route
        path="/services"
        element={<ServicesPage services={services} user={user} />}
      />
      <Route path="/services/:id" element={<ServiceDetails user={user} />} />
      <Route path="/about-us" element={<AboutPage />} />
      <Route path="/contact-us" element={<ContactPage />} />
      <Route
        path="/projects/apply/:id"
        element={<ApplicationPage user={user} />}
      />
      <Route
        path="/dashboard"
        element={<UserDashboard user={user} allProjects={projects} />}
      />
      <Route path="/profile" element={<UserProfile user={user} />} />
      <Route
        path="/dashboard/messages"
        element={<MessagesPage user={user} />}
      />
      <Route
        path="/dashboard/projects"
        element={<MyProjects user={user} allProjects={projects} />}
      />
      <Route
        path="/dashboard/applications"
        element={<Applications user={user} allProjects={projects} />}
      />
    </Routes>
  );
}

export default App;
