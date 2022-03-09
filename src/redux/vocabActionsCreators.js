import axios from "axios";
import * as actionTypes from "./vocabActionTypes";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";

import { firebaseConfig } from "../utils/config.js";

// const firebaseConfig = {
//   apiKey: "AIzaSyAPAjWVrfbXmXAPDIfMLE_850QSiydDEBw",
//   authDomain: "vocab-shuffler-v2.firebaseapp.com",
//   projectId: "vocab-shuffler-v2",
//   storageBucket: "vocab-shuffler-v2.appspot.com",
//   messagingSenderId: "752821228477",
//   appId: "1:752821228477:web:107034f0e719041b0478d4",
// };

initializeApp(firebaseConfig);

const db = getFirestore();

export const fetchVocabLoading = (status) => {
  return {
    type: actionTypes.FETCH_VOCAB_LOADING,
    payload: status,
  };
};

export const fetchVocabSuccess = (vocabs) => {
  return {
    type: actionTypes.FETCH_VOCAB_SUCCESS,
    payload: vocabs,
  };
};

export const fetchVocabFailed = (error) => {
  return {
    type: actionTypes.FETCH_VOCAB_FAILED,
    payload: error,
  };
};

const vocabRef = collection(db, "vocabs");

const vocabAscendingQuery = query(vocabRef, orderBy("meaning"));

export const fetchVocabs = () => {
  return (dispatch) => {
    dispatch(fetchVocabLoading(true));

    getDocs(vocabAscendingQuery)
      .then((snapshot) => {
        dispatch(fetchVocabLoading(false));

        const vocabs = [];
        snapshot.docs.forEach((doc) => {
          // vocabs.push({ id: doc.id, ...doc.data() });
          // vocabs.push({ doc.data()});

          vocabs.push({ id: doc.id, ...doc.data() });
          //console.log(vocabs);
        });
        dispatch(fetchVocabSuccess(vocabs));
        //console.log(vocabs, "from action craetors");
        // console.log(snapshot.docs);
      })
      .catch((error) => {
        dispatch(fetchVocabFailed(error));
      });
  };
};

export const startFlashCard = () => {
  return {
    type: actionTypes.START_FLASHCARD,
  };
};

export const endFlashCard = () => {
  return {
    type: actionTypes.END_FLASHCARD,
  };
};
