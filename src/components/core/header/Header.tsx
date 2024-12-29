"use client";
import React from "react";

const Header = () => {
  return (
    <>
      <div className="header">
        <div className="header__left">
          <div className="header__left__logo">
            <img
              src="/icons/app-logo.svg"
              alt="app-logo"
              className="logo__app"
            />
          </div>
          <div className="header__left__nav">
            <a className="nav__option">
              <img src="/icons/home-deselected.svg" alt="home-page" />
              <p className="nav__option__label">Home</p>
            </a>
            <a className="nav__option">
              <img src="/icons/team.svg" alt="teams-page" />
              <p className="nav__option__label">Teams</p>
            </a>
            <a className="nav__option">
              <img src="/icons/members--selected.svg" alt="members-page" />
              <p className="nav__option__label" id="nav__option__label-member">
                Members
              </p>
            </a>
            <a className="nav__option">
              <img src="/icons/projects.svg" alt="projects-page" />
              <p className="nav__option__label">Projects</p>
            </a>
            <a className="nav__option">
              <img src="/icons/nav-calendar.svg" alt="irl-page" />
              <p className="nav__option__label">IRL Gatherings</p>
            </a>
          </div>
        </div>
        <div className="header__right">
          <button className="header__right__button">Sign up</button>
          <button className="header__right__button">Login</button>
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
          display: flex;
          align-items: center;
        }
        .header__left {
          gap: 50px;
          width: 900px;
          display: flex;
          align-items: center;
        }
        .header__left__logo {
          height: 100%;
        }
        .logo__app {
          width: 155px;
          height: 100%;
        }
        .header__left__nav {
          width: 750px;
          gap: 28px;
          display: flex;
          align-items: center;
        }
        .nav__option {
          gap: 8px;
          padding: 8px;
          font-size: 16.5px;
          color: #475569;
          cursor: pointer;
          display: flex;
          justify-content: center;
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
          display: flex;
        }
        .header__right__button {
          height: 40px;
          padding: 10px 14px;
          border-radius: 25px;
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
