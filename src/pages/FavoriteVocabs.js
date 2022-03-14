import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import VocabItem from "../container/Vocab/vocabitem/VocabItem";
import FvtVocabItem from "../container/Vocab/fvtvocabitem/FvtVocabItem";

import Clip from "../assets/clip.png";
import Man from "../assets/chairman.png";
import "./FavoriteVocabs.css";
import { fetchVocabs } from "../redux/vocabActionsCreators.js";
import { removeFvtVocab } from "../redux/vocabActionsCreators";

const FavoriteVocabs = () => {
  const items = useSelector((state) => state);
  const arr = items.vocab.filter((item) => item.fvt === true);

  const dispatch = useDispatch();
  useEffect(() => {
    if (items.vocab.length === 0) {
      dispatch(fetchVocabs());
    }

    console.log(items, "from reducer");
  }, []);
  console.log(arr);

  const deleteFvtVocab = (id) => {
    dispatch(removeFvtVocab(id));
  };

  return (
    <div className="container__div">
      <h2 className="container__headline">Fvt Vocabs</h2>
      <img className="clip__image" src={Clip} />
      <img className="man__image" src={Man} />
      {arr.map((item) => {
        return (
          <FvtVocabItem
            remove={deleteFvtVocab}
            id={item.id}
            key={item.id}
            word={item.word}
            meaning={item.meaning}
          />
        );
      })}
    </div>
  );
};

export default FavoriteVocabs;
