import * as vocabActionTypes from "./vocabActionTypes";

const INITIAL_STATE = {
  vocab: [],
  error: "",
  start: false,
  arrayCounter: 0,
  vocabLoading: true,
};

export const vocabReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case vocabActionTypes.LOAD_VOCAB:
      return {};
    default:
      return state;
  }
};
