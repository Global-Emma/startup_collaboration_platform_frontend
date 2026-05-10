import React, { useEffect, useState } from "react";
import NavLinks from "./NavLinks";
import UserNav from "./UserNav";
import { Link } from "react-router-dom";
import { useApp } from "../utils/useApp";
import { LucideAlignCenterHorizontal, X } from "lucide-react";

const Navbar = ({ user }) => {
  const [scroll, setScroll] = useState(true);
  const [mobileMenu, setMobileMenu] = useState(false);
  const { logout } = useApp()

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
        <div className="menu-icon">
          {!mobileMenu ? <LucideAlignCenterHorizontal onClick={() => setMobileMenu(!mobileMenu)} /> : <X onClick={() => setMobileMenu(!mobileMenu)} />}
        </div>
        <div className="logo">
          <img src="/images/logo.png" alt="logo" />
        </div>
        
        <NavLinks user={user} mobile={mobileMenu} />

        {user ? (
          <UserNav
            user={user}
            onLogout={() => {
              logout()
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
