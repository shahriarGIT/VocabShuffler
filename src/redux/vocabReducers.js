import * as vocabActionTypes from "./vocabActionTypes";

const INITIAL_STATE = {
  vocab: [],
  vocabLoading: false,
  error: "",
  start: false,
  arrayCounter: 0,
};

const VOCABREDUCER = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case vocabActionTypes.FETCH_VOCAB_SUCCESS:
      return {
        ...action.payload,
        vocab: action.payload,
      };
    case vocabActionTypes.FETCH_VOCAB_FAILED:
      return {
        ...action.payload,
        error: action.payload,
      };
    case vocabActionTypes.FETCH_VOCAB_LOADING:
      return {
        ...action.payload,
        vocabLoading: action.payload,
      };
    default:
      return state;
  }
};

export default VOCABREDUCER;
