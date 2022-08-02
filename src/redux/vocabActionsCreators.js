import * as actionTypes from "./vocabActionTypes";
import data from "../../src/vocabshuffler-lastest.json";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  onSnapshot,
  getDocs,
  getDoc,
  query,
  orderBy,
  updateDoc,
  addDoc,
  doc,
  limit,
  startAfter,
  startAt,
  arrayUnion,
  setDoc,
  deleteDoc,
  FieldValue,
  arrayRemove,
  where,
} from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { firebaseConfig } from "../utils/config.js";

import { successMessage, errorMessage } from "../utils/messages";

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Auth
export const authSuccess = () => {
  return {
    type: actionTypes.AUTH_SUCCESS,
  };
};

export const authLoading = (status) => {
  return {
    type: actionTypes.AUTH_LOADING,
    payload: status,
  };
};

export const authError = (error) => {
  return {
    type: actionTypes.AUTH_ERROR,
    payload: error,
  };
};

const firebaseStatus = async (registerEmail, registerPassword, option) => {
  let user = null;
  let err = null;

  if (option === "signUp") {
    try {
      user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
    } catch (error) {
      err = error.message;
    }
  }

  if (option === "signIn") {
    try {
      user = await signInWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
    } catch (error) {
      err = error.message;
    }
  }

  return await { user, err };
};

export const register = (registerEmail, registerPassword) => {
  return (dispatch) => {
    dispatch(authLoading(true));
    const status = firebaseStatus(registerEmail, registerPassword, "signUp");
    if (status.user) {
      dispatch(authSuccess());

      dispatch(authLoading(false));
    } else {
      dispatch(authError(status.err));
    }
  };
};

export const login = (registerEmail, registerPassword) => {
  return (dispatch) => {
    dispatch(authLoading(true));
    const status = firebaseStatus(registerEmail, registerPassword, "signIn");
    if (status.user) {
      dispatch(authLoading(false));
      dispatch(authSuccess());
    } else {
      dispatch(authError(status.err));
    }
  };
};

const resetStore = () => {
  return {
    type: actionTypes.RESET_STORE,
  };
};

export const logout = () => {
  return async (dispatch) => {
    await signOut(auth);
    dispatch(resetStore());
  };
};

///// Auth End

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

let lastVisible = "";
let vocabAscendingQuery = query(
  vocabRef,
  orderBy("word"),
  startAt(lastVisible || ""),
  limit(50)
);

const vocabs = [];

export const fetchVocabs = () => {
  return (dispatch) => {
    dispatch(fetchVocabLoading(true));
    getDocs(vocabAscendingQuery)
      .then((snapshot) => {
        dispatch(fetchVocabLoading(false));
        snapshot.docs.forEach((doc) => {
          vocabs.push({ id: doc.id, ...doc.data() });
        });
        lastVisible =
          snapshot.docs[snapshot.docs.length - 1]._document.data.value.mapValue
            .fields.word.stringValue;

        vocabAscendingQuery = query(
          vocabRef,
          orderBy("word"),
          startAfter(lastVisible || ""),
          limit(50)
        );
        dispatch(fetchVocabSuccess(vocabs));
      })
      .catch((error) => {
        dispatch(fetchVocabFailed(error));
      });
  };
};

// start or end vocab flashcard
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

// add fvt vocab
const addFvtVocabToStore = (newArray) => {
  return {
    type: actionTypes.FETCH_FVT_VOCAB,
    payload: newArray,
  };
};

export const getFvtVocabs = (uid) => {
  return async (dispatch) => {
    await onSnapshot(doc(db, "favoriteVocabs", uid), (res) => {
      dispatch(addFvtVocabToStore([...res.data().fvtV]));
    });
  };
};

export const addFvtVocab = (uid, value) => {
  return (dispatch) => {
    // dispatch(fetchVocabLoading(true))

    const docRef = doc(db, "favoriteVocabs", uid);
    getDoc(docRef)
      .then((res) => {
        if (res.exists()) {
          updateDoc(docRef, {
            fvtV: arrayUnion(value),
          })
            .then(() => {
              // dispatch(fetchVocabLoading(false));
              // dispatch(addFvtVocabToStore(value));
            })
            .catch(() => {});
          // console.log("exist");
        } else {
          // console.log("does not exist");
          setDoc(doc(db, "favoriteVocabs", uid), {
            fvtV: arrayUnion(value),
          }).then(() => {});
        }
      })
      .catch((error) => {});

    console.log(doc(db, "favoriteVocabs", uid));
  };
};

//  Remove fvt vocabs
const removeFvtFromStore = (id) => {
  return {
    type: actionTypes.REMOVE_FVT_VOCAB,
    payload: id,
  };
};

export const removeFvtVocab = (id, uid) => {
  return (dispatch) => {
    const docRef = doc(db, "favoriteVocabs", uid);
    const fvtArray = [];
    // const filteredArray = [];
    getDoc(docRef).then((res) => {
      res._document.data.value.mapValue.fields.fvtV.arrayValue.values.forEach(
        (val) => {
          fvtArray.push(val.mapValue.fields);
        }
      );
      const filteredArray = fvtArray.filter(
        (item) => item._id.stringValue !== id
      );

      const convertArray = [];
      filteredArray.forEach((item) => {
        let newObj = {
          meaning: item.meaning.stringValue,
          word: item.word.stringValue,
          _id: item._id.stringValue,
        };
        convertArray.push(newObj);
      });

      updateDoc(docRef, {
        fvtV: [...convertArray],
      })
        .then(() => {})
        .catch(() => {});
    });
  };
};

// add vocab to firebase

export const addNewVocabToFirebase = (values) => {
  const newRef = collection(db, "vocabs");

  addDoc(newRef, {
    word: values.word,
    meaning: values.meaning,
  }).then(() => {});
};
