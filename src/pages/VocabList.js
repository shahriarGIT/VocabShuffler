import "./VocabList.css";
import Curve from "../container/ui/VocabListCurve.js";
import CurveUp from "../container/ui/VocabListUpCurve";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../container/loader/Loader.js";

import typetImg from "../assets/typet.png";
import pencilImg from "../assets/pencil.png";
import clipImg from "../assets/clip.png";

import { fetchVocabs } from "../redux/vocabActionsCreators.js";
import VocabItem from "../container/Vocab/VocabItem";

const VocabList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state);
  useEffect(() => {
    if (items.vocab.length === 0) {
      dispatch(fetchVocabs());
    }

    console.log(items, "from reducer");
  }, []);

  console.log(items, "from outside useeffect");
  return (
    <div className="list__container">
      <h2>Vocab List</h2>
      <img className="list_t_img" src={typetImg} />
      <img className="list_pencil_img" src={pencilImg} />
      {items.vocabLoading && <Loader />}
      {items.vocab &&
        items.vocab.map((item) => {
          return (
            <VocabItem key={item.id} word={item.word} meaning={item.meaning} />
          );
        })}
    </div>
  );
};

export default VocabList;
