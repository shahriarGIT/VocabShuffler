import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import FvtVocabItem from "../container/Vocab/fvtvocabitem/FvtVocabItem";

import Clip from "../assets/clip.png";
import Man from "../assets/chairman.png";
import "./FavoriteVocabs.css";
import {
  fetchVocabs,
  removeFvtVocab,
  getFvtVocabs,
} from "../redux/vocabActionsCreators.js";
import useStatus from "../hooks/useStatus";

const FavoriteVocabs = () => {
  const items = useSelector((state) => state);
  const { user: loggedUser } = useStatus();
  const dispatch = useDispatch();
  useEffect(() => {
    if (items.fvtVocab.length === 0) {
      dispatch(getFvtVocabs(loggedUser?.uid));
    }
  }, [loggedUser]);

  const deleteFvtVocab = (id, uid) => {
    dispatch(removeFvtVocab(id, uid));
  };

  return (
    <div className="container__div">
      <h2 className="container__headline">Fvt Vocabs</h2>
      <img className="clip__image" src={Clip} />
      <img className="man__image" src={Man} />
      {items.fvtVocab.map((item) => {
        return (
          <FvtVocabItem
            remove={deleteFvtVocab}
            id={item._id}
            UID={loggedUser?.uid}
            key={item._id}
            word={item.word}
            meaning={item.meaning}
          />
        );
      })}
    </div>
  );
};

export default FavoriteVocabs;
