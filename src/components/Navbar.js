import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink } from "react-router-dom";
import Profile from "pages/Profile/Profile";
import { AuthContext } from "context/AuthContext";

const Navbar = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };
    if (showProfile) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfile]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <NavLink className="navbar-brand" to="/">WorkspaceApp</NavLink>
          <div className="collapse navbar-collapse" id="navbarNav">
            {isLoggedIn && (
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink
                    to="/workspace"
                    className={({ isActive }) =>
                      "btn btn-primary" + (isActive ? " active" : "")
                    }
                  >
                    Workspaces
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      "btn btn-primary" + (isActive ? " active" : "")
                    }
                  >
                    Dashboard
                  </NavLink>
              
                </li>
                <li className="nav-item">
                  <button
                    className={`btn btn-primary ${showProfile ? "active" : ""}`} 
                    onClick={() => setShowProfile((prev) => !prev)}
                  >
                    Profile
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>

      {showProfile && (
        <div ref={profileRef}>
          <Profile />
        </div>
      )}
    </>
  );
};

export default Navbar;