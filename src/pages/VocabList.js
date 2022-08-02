import "./VocabList.css";
import Curve from "../container/ui/VocabListCurve.js";
import CurveUp from "../container/ui/VocabListUpCurve";
import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../container/loader/Loader.js";

import typetImg from "../assets/typet.png";
import pencilImg from "../assets/pencil.png";
import clipImg from "../assets/clip.png";

import { fetchVocabs, getFvtVocabs } from "../redux/vocabActionsCreators.js";
import VocabItem from "../container/Vocab/vocabitem/VocabItem";
import { addFvtVocab } from "../redux/vocabActionsCreators";
import {
  removeFvtVocab,
  fetchVocabLoading,
} from "../redux/vocabActionsCreators";
import { successMessage, errorMessage } from "../utils/messages";
import useStatus from "../hooks/useStatus";

const VocabList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state);
  const { user: loggedUser } = useStatus();

  useEffect(() => {
    if (items.vocab.length === 0) {
      dispatch(fetchVocabs());
    }
    if (items.fvtVocab.length === 0) {
      dispatch(getFvtVocabs(loggedUser?.uid));
    }
    console.log(items);
  }, [loggedUser]);
  const addVocab = (uid, value) => {
    dispatch(addFvtVocab(uid, value));
  };

  const removeVocab = (id, uid) => {
    dispatch(removeFvtVocab(id, uid));
  };

  const observer = useRef();
  const lastVocabRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        dispatch(fetchVocabs());
        // console.log("Seen");
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  return (
    <div className="list__container">
      <h2>Vocab List</h2>
      <img className="list_t_img" src={typetImg} />
      <img className="list_pencil_img" src={pencilImg} />
      {/* {successMessage(items.success, "Vocab Added")} */}
      {items.vocab &&
        items.vocab.map((item, index) => {
          if (items.vocab.length === index + 1) {
            return (
              <>
                <VocabItem
                  ref={lastVocabRef}
                  add={addVocab}
                  remove={removeVocab}
                  id={item.id}
                  key={item.id}
                  word={item.word}
                  meaning={item.meaning}
                  fvtVocabList={items.fvtVocab}
                />
              </>
            );
          } else {
            return (
              <VocabItem
                add={addVocab}
                remove={removeVocab}
                id={item.id}
                key={item.id}
                word={item.word}
                meaning={item.meaning}
                fvtVocabList={items.fvtVocab}
              />
            );
          }
        })}
      {items.vocabLoading && <Loader />}
    </div>
  );
};

export default VocabList;
