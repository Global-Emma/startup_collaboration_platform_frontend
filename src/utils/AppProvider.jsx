import { useState, useEffect } from "react";
import api from "./axios";
import { AppContext } from "./AppContext";


const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  

  // Load user on refresh
  useEffect(() => {
    setLoading(true)
        // Simulate an API call to fetch user data
        const fetchUser = async () => {
          try {
            const response = await api.get("/api/auth/profile");
            setUser(response.data.data);
          } catch (error) {
            console.error(
              "Error fetching user:",
              error.response?.data || error.message,
            );
          } finally{
            setLoading(false)
          }
        };

        const fetchProjects = async () => {
          try {
            const response = await api.get("/api/projects");
            setProjects(response.data.data);
          } catch (error) {
            console.error(
              "Error fetching projects:",
              error.response?.data || error.message,
            );
          } finally{
            setLoading(false)
          }
        };

        // Simulate an API call to fetch services
        const fetchServices = async () => {
          try {
            const response = await api.get("/api/services");
            const data = response.data.data;
            setServices(data);
          } catch (error) {
            console.error(
              "Error fetching services:",
              error.response?.data || error.message,
            );
          } finally{
            setLoading(false)
          }
        };

        fetchUser();
        fetchServices();
        fetchProjects();
  }, []);

  // LOGIN
  const login = async (data) => {
    setLoading(true)
    try {
          const response = await api.post("/api/auth/login", data);
          if (response.data.success) {
            localStorage.setItem(
              "accessToken",
              JSON.stringify(response.data.accessToken),
            );
    
            localStorage.setItem("login", "true");
            window.location.href = '/'
          }
        } catch (error) {
          console.error("Login error:", error.response?.data || error.message);
        } finally{
          setLoading(false)
        }
  };

  // LOGOUT
  const logout = async() => {
    setLoading(true)
    try {
      const response = await api.post("/api/auth/logout");
      if (response.data.success) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("login");
        setUser(null);
        window.location.href = "/sign-in";
        alert("User Logged Out Successfully");
      }
    } catch (error) {
      console.log(error.response?.data || error.message)
    } finally{
      setLoading(false)
    }
  };

  return (
    <AppContext.Provider value={{ user, projects, services, login, logout, loading }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider

