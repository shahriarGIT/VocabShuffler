import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import VOCABREDUCER from "./vocabReducers.js";

const store = createStore(VOCABREDUCER, applyMiddleware(thunk));

export default store;
