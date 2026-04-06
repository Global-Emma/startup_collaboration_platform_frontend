import './styles/homepage.css'
import './styles/signup.css'
import './styles/signin.css'
import './styles/projects.css'
import './styles/project-details.css'
import './styles/services.css'
import './styles/about.css'
import './styles/contact.css'
import './styles/user-dashboard.css'
import './styles/user-profile.css'
import './styles/service-details.css'
import './styles/create-project.css'
import './styles/application.css'
import {Routes, Route} from 'react-router-dom'
import Homepage from './pages/Homepage'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ProjectsPage from './pages/ProjectsPage'
import ProjectDetails from './pages/ProjectDetails'
import ServicesPage from './pages/ServicesPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import UserDashboard from './pages/UserDashboard'
import UserProfile from './pages/UserProfile'
import { useEffect, useState } from 'react'
import api from './utils/axios'
import ServiceDetails from './pages/ServiceDetails'
import CreateProjectPage from './pages/CreateProjectPage'
import ApplicationPage from './pages/ApplicationPage'

function App() {

  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);

    useEffect(() => {
      // Simulate an API call to fetch user data
      const fetchUser = async () => {
        try {
          const response = await api.get("/api/auth/profile");
          setUser(response.data.data);
        } catch (error) {
          console.error("Error fetching user:", error.response?.data || error.message);
        }
      };

      const fetchProjects = async () => {
        try {
          const response = await api.get("/api/projects");
          setProjects(response.data.data);
        } catch (error) {
          console.error("Error fetching projects:", error.response?.data || error.message);
        }
      };                                    

      // Simulate an API call to fetch services
    const fetchServices = async () => {
      try {
        const response = await api.get('/api/services');
        const data = response.data.data;
        setServices(data);
      } catch (error) {
        console.error("Error fetching services:", error.response?.data || error.message);
      }
    };

    fetchUser();
    fetchServices();
    fetchProjects()
    }, []);

  return (
    
      <Routes>
        <Route path='/' element={<Homepage user={user} services={services} projects={projects} />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} /> 
        <Route path='/projects' element={<ProjectsPage projects={projects} user={user} />} /> 
        <Route path='/projects/:id' element={<ProjectDetails />} /> 
        <Route path='/projects/create-project' element={<CreateProjectPage services={services}/>} /> 
        <Route path='/services' element={<ServicesPage services={services} user={user}/>} /> 
        <Route path='/services/:id' element={<ServiceDetails user={user}/>} /> 
        <Route path='/about-us' element={<AboutPage />} /> 
        <Route path='/contact-us' element={<ContactPage />} /> 
        <Route path='/projects/apply/:id' element={<ApplicationPage user={user} />} />
        <Route path='/dashboard' element={<UserDashboard />} /> 
        <Route path='/profile' element={<UserProfile user={user} />} /> 
      </Routes>
  
  )
}

export default App
