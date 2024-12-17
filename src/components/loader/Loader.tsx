import React from "react";
import './style.css'
const Loader = () => {
  return (
    <div className="loader flex items-center justify-center">
      <div className="loader__circle"></div>
      <p>Loading Members...</p>
    </div>
  );
};

export default Loader;
