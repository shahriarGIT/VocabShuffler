import "./MobileNav.css";
import { Link, NavLink } from "react-router-dom";
import useStatus from "../../hooks/useStatus";
import { logout } from "../../redux/vocabActionsCreators";
import { useDispatch } from "react-redux";

const MobileNav = (props) => {
  const dispatch = useDispatch();
  const { user: loggedUser } = useStatus();
  const userLogout = () => {
    dispatch(logout());
  };
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
        {loggedUser && (
          <li className="mobile__nav__list">
            <Link className="mobile__nav__item" to="/Input-Vocab">
              Input Vocab
            </Link>
          </li>
        )}
        {loggedUser && (
          <li className="mobile__nav__list">
            <Link className="mobile__nav__item" to="/Favorite-Vocab">
              Fvt Vocabs
            </Link>
          </li>
        )}
        {!loggedUser && (
          <li className="mobile__nav__list">
            <NavLink className="mobile__nav__item" to="/login">
              Login
            </NavLink>
          </li>
        )}
        {loggedUser && (
          <li className="mobile__nav__list">
            <NavLink onClick={userLogout} className="mobile__nav__item" to="/">
              Logout
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default MobileNav;
