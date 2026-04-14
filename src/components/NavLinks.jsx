import { useResolvedPath } from "react-router-dom";

const NavLinks = ({ user }) => {
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
    <ul className="nav-links">
      {navlinks.map((navlink, i) => {
        return (
          <li className={pathname === navlink.link ? "active" : ""} key={i}>
            <a href={navlink.link}>{navlink.name}</a>
          </li>
        );
      })}
    </ul>
  );
};

export default NavLinks;
