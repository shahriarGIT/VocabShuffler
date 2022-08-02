import { NavLink, Link } from "react-router-dom";
import MobileNav from "./MobileNav.js";
import { useEffect, useState } from "react";
import { FcGenericSortingAsc, FcTimeline } from "react-icons/fc";
import { IoMdResize } from "react-icons/io";

import "./Navigation.css";
import useStatus from "../../hooks/useStatus.js";
import { logout } from "../../redux/vocabActionsCreators.js";
import { useDispatch, useSelector } from "react-redux";
// onClick={props.hideMenu}

const Navigation = (props) => {
  const { user: loggedUser } = useStatus();
  const dispatch = useDispatch();
  const userLogout = () => {
    dispatch(logout());
  };
  return (
    <header>
      <div className="nav__container">
        <nav className="nav">
          <div className="nav__logo">
            <a href="/Home">Vocab Shuffler</a>
          </div>
          <ul className="nav__list">
            <li className="list__item">
              <NavLink className="nav__item" to="/Home">
                Home
              </NavLink>
            </li>
            <li className="list__item">
              <NavLink className="nav__item" to="/Vocab-Flashcard">
                Vocab Flash Card
              </NavLink>
            </li>
            <li className="list__item">
              <NavLink className="nav__item" to="/Vocab-List">
                Vocab List
              </NavLink>
            </li>
            {loggedUser && (
              <li className="list__item">
                <NavLink className="nav__item" to="/Input-Vocab">
                  Input Vocab
                </NavLink>
              </li>
            )}

            {!loggedUser && (
              <li className="list__item">
                <NavLink className="nav__item" to="/login">
                  Login
                </NavLink>
              </li>
            )}

            {/* {!loggedUser ? (
              !loading ? (
                <li className="list__item">
                  <NavLink className="nav__item" to="/login">
                    Login
                  </NavLink>
                </li>
              ) : (
                ""
              )
            ) : (
              ""
            )} */}
            {loggedUser && (
              <li className="list__item">
                <NavLink
                  className="nav__item"
                  to="/Favorite-Vocab
"
                >
                  Fvt Vocabs
                </NavLink>
              </li>
            )}
            {loggedUser && (
              <li className="list__item">
                <NavLink onClick={userLogout} className="nav__item" to="/">
                  Logout
                </NavLink>
              </li>
            )}
          </ul>

          <button className="nav__button" onClick={props.showMenu}>
            <IoMdResize className="nav__button__logo" />
            <span className="nav__button__text">Menu</span>
          </button>
        </nav>
      </div>

      {props.menuStatus && <MobileNav hideMenu={props.hideMenu} />}
    </header>
  );
};

export default Navigation;
