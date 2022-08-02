import * as vocabActionTypes from "./vocabActionTypes";

const INITIAL_STATE = {
  vocab: [],
  fvtVocab: [],
  vocabLoading: false,
  error: "",
  success: "",
  start: false,
  arrayCounter: 0,
  loading: false,
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

    case vocabActionTypes.FETCH_FVT_VOCAB: {
      // console.log(action.payload, "from reducer ---");
      const newVocabs = action.payload;
      return {
        ...state,
        success: true,
        fvtVocab: newVocabs,
      };
    }

    case vocabActionTypes.REMOVE_FVT_VOCAB: {
      const newFvtArray = state.fvtVocab.filter(
        (item) => item._id !== action.payload
      );
      return {
        ...state,
        fvtVocab: newFvtArray,
      };
    }

    case vocabActionTypes.AUTH_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }

    case vocabActionTypes.AUTH_ERROR: {
      return {
        ...state,
        error: action.payload,
      };
    }

    case vocabActionTypes.AUTH_SUCCESS: {
      return {
        ...state,
        success: true,
      };
    }

    case vocabActionTypes.RESET_STORE: {
      return INITIAL_STATE;
    }

    default:
      return state;
  }
};

export default VOCABREDUCER;
