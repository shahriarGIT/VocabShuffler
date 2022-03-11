import { NavLink, Link } from "react-router-dom";
import MobileNav from "./MobileNav.js";
import { useEffect, useState } from "react";
import { FcGenericSortingAsc, FcTimeline } from "react-icons/fc";
import { IoMdResize } from "react-icons/io";

import "./Navigation.css";

const Navigation = (props) => {
  return (
    <header>
      <div className="nav__container">
        <nav className="nav" onClick={props.hideMenu}>
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
            <li className="list__item">
              <NavLink className="nav__item" to="/Input-Vocab">
                Input Vocab
              </NavLink>
            </li>
            <li className="list__item">
              <NavLink className="nav__item" to="/Favorite-Vocab">
                Fvt Vocab
              </NavLink>
            </li>
          </ul>
        </nav>
        <button className="nav__button" onClick={props.showMenu}>
          <IoMdResize className="nav__button__logo" />
          <span className="nav__button__text">Menu</span>
        </button>
      </div>

      {props.menuStatus && <MobileNav hideMenu={props.hideMenu} />}
    </header>
  );
};

export default Navigation;
