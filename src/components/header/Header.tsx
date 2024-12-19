import React from "react";
import "./style.css";

const Header = () => {
  return (
    <div className="header flex items-center">
      <div className="flex items-center header__left">
        <div className="header__left__logo">
          <img src="/icons/app-logo.svg" alt="app-logo" className="app-logo" />
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
  );
};

export default Header;
