"use client";
import React from "react";

const Header = () => {
  return (
    <>
      <div className="header flex items-center">
        <div className="flex items-center header__left">
          <div className="header__left__logo">
            <img
              src="/icons/app-logo.svg"
              alt="app-logo"
              className="app-logo"
            />
          </div>
          <div className="header__left__nav flex items-center">
            <a className="nav__option flex justify-center">
              <img src="/icons/home-deselected.svg" alt="home-page" />
              <p className="nav__option__label">Home</p>
            </a>
            <a className="nav__option flex justify-center">
              <img src="/icons/team.svg" alt="teams-page" />
              <p className="nav__option__label">Teams</p>
            </a>
            <a className="nav__option flex justify-center">
              <img src="/icons/members--selected.svg" alt="members-page" />
              <p className="nav__option__label" id="nav__option__label-member">
                Members
              </p>
            </a>
            <a className="nav__option flex justify-center">
              <img src="/icons/projects.svg" alt="projects-page" />
              <p className="nav__option__label">Projects</p>
            </a>
            <a className="nav__option flex justify-center">
              <img src="/icons/nav-calendar.svg" alt="irl-page" />
              <p className="nav__option__label">IRL Gatherings</p>
            </a>
          </div>
        </div>
        <div className="header__right flex">
          <button className="header__right__button p-10-14 radius-25 h-40">
            Sign up
          </button>
          <button className="header__right__button radius-25 p-10-14">
            Login
          </button>
        </div>
      </div>

      <style jsx>{`
        .header {
          height: 80px;
          width: 100%;
          gap: 120px;
          padding: 0px 12px 0 48px;
          background-color: #ffffff;
          box-shadow: 0px 0px 4px rgb(224, 224, 224);
          position: fixed;
        }
        .header__left {
          gap: 50px;
          width: 900px;
        }
        .header__left__logo {
          height: 100%;
        }
        .app-logo {
          width: 155px;
          height: 100%;
        }
        .header__left__nav {
          width: 750px;
          gap: 28px;
        }
        .nav__option {
          gap: 8px;
          padding: 8px;
          font-size: 16.5px;
          color: #475569;
          cursor: pointer;
        }
        .nav__option__label {
          padding-top: 3px;
          white-space: nowrap;
        }
        #nav__option__label-member {
          color: black;
        }
        .header__right {
          gap: 15px;
        }
        .radius-25 {
          border-radius: 25px;
        }
        .p-10-14 {
          padding: 10px 14px;
        }
        .header__right__button {
          height: 40px;
          white-space: nowrap;
          background: linear-gradient(
            135deg,
            rgb(66, 136, 246),
            rgb(68, 209, 190)
          );
          color: white;
          font-weight: 700;
          border: none;
          cursor: pointer;
          outline: none;
        }
        .header__right__button:hover {
          outline: 2px solid rgb(131, 175, 246);
        }
      `}</style>
    </>
  );
};

export default Header;
