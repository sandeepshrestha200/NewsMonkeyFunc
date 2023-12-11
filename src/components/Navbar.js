import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            News Monkey
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>
                  Home
                </Link>
              </li>

              <li className="classname">
                <Link to="/business" className={`nav-link ${location.pathname === "/business" ? "active" : ""}`}>
                  Business
                </Link>
              </li>
              <li className="classname">
                <Link to="/entertainment" className={`nav-link ${location.pathname === "/entertainment" ? "active" : ""}`}>
                  Entertainment
                </Link>
              </li>
              <li className="classname">
                <Link to="/general" className={`nav-link ${location.pathname === "/general" ? "active" : ""}`}>
                  General
                </Link>
              </li>
              <li className="classname">
                <Link to="/health" className={`nav-link ${location.pathname === "/health" ? "active" : ""}`}>
                  Health
                </Link>
              </li>
              <li className="classname">
                <Link to="/science" className={`nav-link ${location.pathname === "/science" ? "active" : ""}`}>
                  Science
                </Link>
              </li>
              <li className="classname">
                <Link to="/sports" className={`nav-link ${location.pathname === "/sports" ? "active" : ""}`}>
                  Sports
                </Link>
              </li>
              <li className="classname">
                <Link to="/technology" className={`nav-link ${location.pathname === "/technology" ? "active" : ""}`}>
                  Technology
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
