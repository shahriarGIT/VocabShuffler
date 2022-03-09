import { Fragment } from "react";
import Layout from "../container/ui/Layout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchVocabs } from "../redux/vocabActionsCreators.js";

import "./Home.css";
import quoteImg from "../assets/bg-pattern-quotation.svg";

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchVocabs());
  }, []);

  return (
    <div className="home__container">
      <div className="home__element__container">
        <img className="home__image1" src={quoteImg} alt="Image of Quotation" />
        <h1 className="home__heading tracking-in-expand-fwd">
          Welcome to Vocab Shuffler
        </h1>
        <p className="home__text tracking-in-expand-fwd-bottom">
          This App will help you to move your vocab stack <br /> from temporary
          memory to permanent memory.
        </p>
        <img className="home__image2" src={quoteImg} alt="Image of Quotation" />
      </div>
    </div>
  );
};

export default Home;
