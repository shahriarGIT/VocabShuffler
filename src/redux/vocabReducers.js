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
        ...state,
        vocab: action.payload,
      };
    case vocabActionTypes.FETCH_VOCAB_FAILED:
      return {
        ...state,
        error: action.payload,
        start: false,
      };
    case vocabActionTypes.FETCH_VOCAB_LOADING:
      return {
        ...state,
        vocabLoading: action.payload,
        start: false,
      };

    case vocabActionTypes.START_FLASHCARD:
      return {
        ...state,
        start: true,
      };

    case vocabActionTypes.END_FLASHCARD:
      return {
        ...state,
        start: false,
      };

    case vocabActionTypes.ADD_FVT_VOCAB: {
      const vocabIndex = state.vocab.findIndex(
        (item) => item.id === action.payload
      );
      const newVocabs = [...state.vocab];
      newVocabs[vocabIndex].fvt = true;
      return {
        ...state,
        vocab: newVocabs,
      };
    }

    case vocabActionTypes.REMOVE_FVT_VOCAB: {
      const vocabIndex = state.vocab.findIndex(
        (item) => item.id === action.payload
      );
      const newVocabs = [...state.vocab];
      newVocabs[vocabIndex].fvt = false;
      return {
        ...state,
        vocab: newVocabs,
      };
    }

    default:
      return state;
  }
};

export default VOCABREDUCER;
