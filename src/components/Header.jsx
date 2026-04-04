import React from "react";

const Header = ({header}) => {
  return (
    <div className="projects-header-box">
      <h1>{header.text}</h1>
      <p>
        {header.subText}
      </p>
    </div>
  );
};

export default Header;
