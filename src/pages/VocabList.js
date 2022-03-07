import "./VocabList.css";
import Curve from "../container/ui/VocabListCurve.js";
import CurveUp from "../container/ui/VocabListUpCurve";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../container/loader/Loader.js";

import { fetchVocabs } from "../redux/vocabActionsCreators.js";
import VocabItem from "../container/Vocab/VocabItem";

const VocabList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state);
  useEffect(() => {
    dispatch(fetchVocabs());
    console.log("vocablist");
    console.log(items, "from reducer");
  }, [fetchVocabs]);

  return (
    <div className="list__container">
      <h2>Vocab List</h2>
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
