import "./FvtVocabItem.css";
import { AiOutlineHeart } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";
import { TiDelete } from "react-icons/ti";
import { useSelector } from "react-redux";

const FvtVocabItem = (props) => {
  const items = useSelector((state) => state);

  return (
    <div className="item__container">
      <p className="item__text">
        <span className="word">{props.word} : </span>
        <span className="meaning">{props.meaning}</span>
      </p>
      <div className="btn_container">
        <button className="fvt__button">
          <TiDelete
            onClick={() => props.remove(props.id, props.UID)}
            className="fvt_icon_belete"
            size={21}
          />
        </button>
      </div>
    </div>
  );
};

export default FvtVocabItem;
