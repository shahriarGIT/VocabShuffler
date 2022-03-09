import "./VocabItem.css";
import { AiOutlineHeart } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";

const VocabItem = (props) => {
  const fvtVocab = () => {
    alert("Fvt");
  };

  return (
    <div className="item__container">
      <p className="item__text">
        <span className="word">{props.word} : </span>
        <span className="meaning">{props.meaning}</span>
      </p>
      <div className="btn_container">
        <button className="fvt__button">
          <FiHeart onClick={fvtVocab} className="fvt_icon" size={20} />
        </button>
      </div>
    </div>
  );
};

export default VocabItem;
