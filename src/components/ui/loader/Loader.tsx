"use client";
import React from "react";

const Loader = () => {
  return (
    <>
      <div className="loader flex items-center justify-center">
        <div className="loader__circle"></div>
        <p>Loading Members...</p>
      </div>
      <style jsx>{`
        .loader {
          gap: 8px;
          margin-bottom: 10px;
        }
        .loader__circle {
          border: 3px solid rgba(0, 0, 0, 0.2);
          border-top: 3px solid #0070f3;
          border-radius: 50%;
          width: 25px;
          height: 25px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

export default Loader;