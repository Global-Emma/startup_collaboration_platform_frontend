import React, { useEffect, useState } from "react";
import NavLinks from "./NavLinks";
import UserNav from "./UserNav";
import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
  const [scroll, setScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <header className={scroll ? "navbar scrolled" : "navbar"}>
      <nav className="nav-container">
        <div className="logo">
          <img src="images/logo.png" alt="logo" />
        </div>
        
        <NavLinks />

        <Link to="/become-seller" className="seller">
          Become a Seller
        </Link>

        {user || localStorage.getItem("login") ? (
          <UserNav
            user={user}
            onLogout={() => {
              localStorage.removeItem("login");
              window.location.href = "/sign-in";
            }}
          />
        ) : (
          <div className="nav-actions">
            <Link to="/sign-in" className="signin">
              Sign In
            </Link>
            <Link to="/sign-up" className="signup">
              Register
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
