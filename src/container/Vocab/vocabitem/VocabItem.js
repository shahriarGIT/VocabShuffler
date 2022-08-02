import React from "react";
import "./VocabItem.css";
import { AiOutlineHeart } from "react-icons/ai";
import { FiHeart } from "react-icons/fi";
import useStatus from "../../../hooks/useStatus";
import { useSelector } from "react-redux";
import { successMessage, errorMessage } from "../../../utils/messages.js";

const VocabItem = React.forwardRef((props, ref) => {
  const items = useSelector((state) => state);

  const { user: loggedUser } = useStatus();

  let iconFvt = "fvt_icon";
  iconFvt = props.fvtStatus ? "fvt_icon fvt--icon--active" : "fvt_icon";

  let flag = false;
  items.fvtVocab.forEach((item) => {
    if (item._id === props.id) {
      flag = true;
    }
  });

  iconFvt = flag ? "fvt_icon fvt--icon--active" : "fvt_icon";

  const toggle = (id) => {
    const value = { _id: props.id, word: props.word, meaning: props.meaning };
    const uid = loggedUser?.uid;

    if (uid) {
      if (flag) {
        props.remove(value._id, uid);
      } else {
        props.add(uid, value);
      }
    }
  };

  return (
    <div ref={ref} className="item__container">
      <p className="item__text">
        <span className="word">{props.word} : </span>
        <span className="meaning">{props.meaning}</span>
      </p>
      <div className="btn_container">
        <button className="fvt__button">
          <FiHeart
            onClick={() => toggle(props.id)}
            className={iconFvt}
            size={20}
          />
        </button>
      </div>
    </div>
  );
});

export default VocabItem;
