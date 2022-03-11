import "./MobileNav.css";
import { Link } from "react-router-dom";

const MobileNav = (props) => {
  return (
    <nav className="container__nav swing-in-top-fwd">
      <ul onClick={props.hideMenu} className="mobile__nav__container">
        <li className="mobile__nav__list">
          <Link className="mobile__nav__item" to="/Home">
            Home
          </Link>
        </li>
        <li className="mobile__nav__list">
          <Link className="mobile__nav__item" to="/Vocab-Flashcard">
            Vocab Flashcard
          </Link>
        </li>
        <li className="mobile__nav__list">
          <Link className="mobile__nav__item" to="/Vocab-List">
            Vocab List
          </Link>
        </li>
        <li className="mobile__nav__list">
          <Link className="mobile__nav__item" to="/Input-Vocab">
            Input Vocab
          </Link>
        </li>
        <li className="mobile__nav__list">
          <Link className="mobile__nav__item" to="/Favorite-Vocab">
            Fvt Vocabs
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNav;
