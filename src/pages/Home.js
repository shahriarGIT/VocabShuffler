import { Fragment } from "react";
import Layout from "../container/ui/Layout";

import "./Home.css";
import quoteImg from "../assets/bg-pattern-quotation.svg";

const Home = () => {
  return (
    <div className="home__container">
      <div className="home__element__container">
        <img className="home__image1" src={quoteImg} alt="Image of Quotation" />
        <h1 className="home__heading"> Welcome to Vocab Shuffler</h1>
        <p className="home__text">
          This App will help you to move your vocab stack <br /> from temporary
          memory to permanent memory.
        </p>
        <img className="home__image2" src={quoteImg} alt="Image of Quotation" />
      </div>
    </div>
  );
};

export default Home;
