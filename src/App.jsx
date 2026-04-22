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
import MyProjects from "./dashboard_pages/MyProjects";
import Applications from "./dashboard_pages/Applications";
import SavedProjects from "./dashboard_pages/SavedProjects";
import UsersPage from "./pages/UsersPage";
import UserDetails from "./pages/UserDetails";
import EditProject from "./pages/EditProject";
import MessagesPage from "./dashboard_pages/MessagesPage";
import { useEffect } from "react";
import socket from "./utils/socket";
import Loading from "./components/LoadingPage";

function App() {
  const { user } = useApp();
  const { services } = useApp();
  const { projects } = useApp();
  const { loading } = useApp();

  // Run Socket
  useEffect(() => {
    if (user) {
      socket.auth = {
        token: JSON.parse(localStorage.getItem("accessToken")),
      };

      socket.connect();
      console.log("Socket connected:", socket.connected);
    }

    return () => socket.disconnect();
  }, [user]);

  if(loading){
    return <Loading />
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Homepage user={user} services={services} projects={projects} loading={loading} />
        }
      />
      <Route path="/sign-up" element={<SignUp />} />
      <Route path="/sign-in" element={<SignIn />} />
      <Route
        path="/projects"
        element={<ProjectsPage projects={projects} user={user} />}
      />
      <Route path="/projects/:id" element={<ProjectDetails user={user} />} />
      <Route
        path="/projects/create-project"
        element={<CreateProjectPage services={services} />}
      />
      <Route
        path="/services"
        element={<ServicesPage services={services} user={user} />}
      />
      <Route path="/services/:id" element={<ServiceDetails user={user} />} />
      <Route path="/about-us" element={<AboutPage user={user} />} />
      <Route path="/contact-us" element={<ContactPage user={user} />} />
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
        path="/dashboard/projects/edit/:id"
        element={
          <EditProject user={user} allProjects={projects} services={services} />
        }
      />
      <Route
        path="/dashboard/applications"
        element={<Applications user={user} allProjects={projects} />}
      />
      <Route
        path="/dashboard/saved-projects"
        element={<SavedProjects user={user} allProjects={projects} />}
      />
      <Route
        path="/users"
        element={<UsersPage allProjects={projects} user={user} />}
      />
      <Route
        path="/users/profile/:id"
        element={<UserDetails allProjects={projects} loggedInUser={user} />}
      />
    </Routes>
  );
}

export default App;
