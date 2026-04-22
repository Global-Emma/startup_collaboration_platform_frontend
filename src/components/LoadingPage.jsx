import React from "react";
import "../styles/Loading.css"; 

const Loading = () => {
  return (
    <div className="loading-page">
      <div className="orbit-loader">
        <span className="dot dot1"></span>
        <span className="dot dot2"></span>
      </div>
    </div>
  );
};

export default Loading;