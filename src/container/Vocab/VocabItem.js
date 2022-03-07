import "./VocabItem.css";
import { FaBeer } from "react-icons/fa";

const VocabItem = (props) => {
  return (
    <div className="item__container">
      <p className="item__text">
        <span>{props.word} : </span>
        <span>{props.meaning}</span>
      </p>
      <div className="btn_container">
        <button className="fvt__button">BTN</button>
      </div>
    </div>
  );
};

export default VocabItem;
