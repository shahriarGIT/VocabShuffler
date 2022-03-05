import { NavLink, Link } from "react-router-dom";

import { FcGenericSortingAsc, FcTimeline } from "react-icons/fc";
import { IoMdResize } from "react-icons/io";

import "./Navigation.css";

const Navigation = () => {
  return (
    <header>
      <nav className="nav">
        <div className="nav__logo">
          <a href="#">Vocab Shuffler</a>
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
            <NavLink className="nav__item" to="/Favourite-Vocab">
              Fvt Vocab
            </NavLink>
          </li>
          <a className="nav__button">
            <IoMdResize className="nav__button__logo" />
            <span className="nav__button__text">Menu</span>
          </a>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
