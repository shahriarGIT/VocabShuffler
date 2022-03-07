import axios from "axios";
import * as actionTypes from "./vocabActionTypes";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  getDocs,
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

const vocabRef = collection(db, "vocabs");

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

export const getV = () => {};

export const fetchVocabs = () => {
  return (dispatch) => {
    dispatch(fetchVocabLoading(true));

    getDocs(vocabRef)
      .then((snapshot) => {
        dispatch(fetchVocabLoading(false));

        const vocabs = [];
        snapshot.docs.forEach((doc) => {
          vocabs.push({ id: doc.id, ...doc.data() });
        });
        dispatch(fetchVocabSuccess(vocabs));
        console.log(vocabs);
        // console.log(snapshot.docs);
      })
      .catch((error) => {
        dispatch(fetchVocabFailed(error));
      });
  };
};
