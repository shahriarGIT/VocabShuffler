import React, { useEffect } from "react";
import "./VocabFlashCard.css";
import Button from "../container/ui/Button.js";
import { useState } from "react";
import { useSelector } from "react-redux";
import { startFlashCard, endFlashCard } from "../redux/vocabActionsCreators.js";
import { useDispatch } from "react-redux";

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const shuffleArray = (vocab) => {
  const aRR = [];
  for (let i = 0; i < vocab.length; i++) {
    let randInt = getRandomInt(Math.floor(vocab.length / 2), vocab.length - 1);
    let temp = vocab[randInt];
    aRR[i] = temp;
    aRR[randInt] = vocab[i];
  }

  console.log(aRR);
};

let swap = (vocab) => {
  for (let i = 0; i < vocab.length; i++) {
    let ran = Math.floor(Math.random() * vocab.length);
    let temp = vocab[ran];
    vocab[ran] = vocab[i];
    vocab[i] = temp;
  }

  console.log(vocab);
};

const VocabFlashCard = () => {
  const dispatch = useDispatch();
  const [toggleText, setToggleText] = useState("OFF");
  const [counter, setCounter] = useState(0);
  const items = useSelector((state) => state);

  const arr = items.vocab;
  console.log(arr);
  console.log(items);
  //shuffleArray(arr);
  console.log(counter);

  const toggleTextHandler = () => {
    setToggleText((state) => (state === "ON" ? "OFF" : "ON"));
  };

  const incrementCounter = () => {
    if (counter < arr.length - 1) {
      setCounter((state) => state + 1);
    } else {
      setCounter(0);
    }
  };

  const decrementCounter = () => {
    if (counter > 0) {
      setCounter((state) => state - 1);
    } else {
      setCounter(arr.length - 1);
    }
  };

  const hoverMeaningHandler = () => {
    document
      .querySelector(".vocab__card__meaning")
      .classList.toggle("vocab--card--meaning");
  };

  const startHandler = () => {
    dispatch(startFlashCard());
  };

  const endtHandler = () => {
    swap(items.vocab);

    document
      .querySelector(".vocab__card")
      .classList.add("vocab--card--animateout");

    setTimeout(() => {
      dispatch(endFlashCard());
    }, 300);
  };

  return (
    <div className="container__div">
      <div className="navigate__container">
        <Button
          disabled={items.start}
          onClick={startHandler}
          className="start__button"
        >
          Start
        </Button>
        <Button onClick={endtHandler} className="end__button">
          End
        </Button>
        <label className="switch">
          <input type="checkbox" onClick={toggleTextHandler} />
          <span className="slider round"></span>
        </label>
        <p className="toggle_text">{toggleText}</p>
      </div>
      <>
        {items.start && (
          <div className="vocab__card">
            <div className="vocab__card__heading">Vocab Card</div>
            <div className="vocab__card__body">
              <div>
                <p className="vocab__card__word">
                  {toggleText === "ON"
                    ? arr[counter].meaning
                    : arr[counter].word}
                </p>
              </div>
              <div
                onMouseOver={hoverMeaningHandler}
                onMouseLeave={hoverMeaningHandler}
              >
                <p className="vocab__card__hover">
                  Hover Here To View Meaning :
                </p>
              </div>
              <div>
                <p className="vocab__card__meaning">
                  {toggleText === "ON"
                    ? arr[counter].word
                    : arr[counter].meaning}
                </p>
              </div>
            </div>
            <div className="vocab__card__button">
              <Button
                onClick={decrementCounter}
                className="vocab__next__button"
              >
                Previous
              </Button>
              <Button
                onClick={incrementCounter}
                className="vocab__previous__button"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default VocabFlashCard;
