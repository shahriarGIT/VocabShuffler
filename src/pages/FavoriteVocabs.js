import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import VocabItem from "../container/Vocab/VocabItem";

import Clip from "../assets/clip.png";
import Man from "../assets/chairman.png";
import "./FavoriteVocabs.css";
import { fetchVocabs } from "../redux/vocabActionsCreators.js";

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

  return (
    <div className="container__div">
      <h2 className="container__headline">Fvt Vocabs</h2>
      <img className="clip__image" src={Clip} />
      <img className="man__image" src={Man} />
      {arr.map((item) => {
        return (
          <VocabItem key={item.id} word={item.word} meaning={item.meaning} />
        );
      })}
    </div>
  );
};

export default FavoriteVocabs;
