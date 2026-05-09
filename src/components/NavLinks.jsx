import { useResolvedPath } from "react-router-dom";

const NavLinks = ({ user, mobile }) => {
  const path = useResolvedPath();

  const pathname = path.pathname;

  const navlinks = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Browse Projects",
      link: "/projects",
    },
    {
      name: user?.role ? (user.role === "freelancer" ? "Employers" : "Freelancers") : "Users",
      link: "/users",
    },
    {
      name: "Contact Us",
      link: "/contact-us",
    },
    {
      name: "About Us",
      link: "/about-us",
    },
  ];

  return (
    <div className="navlinks-container">
      <ul className="nav-links">
      {navlinks.map((navlink, i) => {
        return (
          <li className={pathname === navlink.link ? "active" : ""} key={i}>
            <Link to={navlink.link}>{navlink.name}</Link>
          </li>
        );
      })}
    </ul>

      <ul className={"mobile-nav-links" + (mobile ? "" : " hidden")}>
      {navlinks.map((navlink, i) => {
        return (
          <li className={pathname === navlink.link ? "active" : ""} key={i}>
            <Link to={navlink.link}>{navlink.name}</Link>
          </li>
        );
      })}
    </ul>
    </div>
  );
};

export default NavLinks;
