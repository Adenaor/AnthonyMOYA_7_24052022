import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UidContext } from "./AppContext";
import LogOut from "./Log/LogOut";

const Navbar = () => {
  const uid = useContext(UidContext);
  const userData = useSelector((state) => state.userReducer);
  return (
    <nav>
      <div className="nav-container">
        <div className="logo">
          <NavLink exact to="/home">
            <div className="logo">
              <img
                src="./img/logo/icon-left-font-monochrome-black.svg"
                alt="icon"
              />
            </div>
          </NavLink>
        </div>
        {uid ? (
          <ul>
            <li className="welcome">
              <h5>Bienvenue {userData.pseudo}</h5>
            </li>
            <li>
              <NavLink exact to="/profil">
                <img src="./img/icons/user.svg" alt="profil" />
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/home">
                <img src="./img/icons/home.svg" alt="home" />
              </NavLink>
            </li>
            <LogOut />
          </ul>
        ) : (
          <ul>
            <li></li>
            <li>
              <NavLink exact to="/home">
                <img src="./img/icons/login.svg" alt="login" />
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
