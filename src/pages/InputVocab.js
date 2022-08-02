import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import {
  addNewVocabToFirebase,
  fetchVocabs,
} from "../redux/vocabActionsCreators";
import "./Login.css";

const initialValues = {
  word: "",
  meaning: "",
  code: "",
};

const onSubmit = (value) => {
  console.log(value);
  if (value.code === "code@vocab@") addNewVocabToFirebase(value);
};

const fetchLatestVocabs = (dispatch) => {
  dispatch(fetchVocabs());
};

const validate = (value) => {
  const errors = {};

  if (!value.word) {
    errors.word = "Required";
  }

  if (!value.meaning) {
    errors.meaning = "Required";
  }

  if (!value.code) {
    errors.code = "Required";
  }

  return errors;
};

const InputVocab = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <div className="login__input__container">
      <form onSubmit={formik.handleSubmit} className="login__form__container">
        <div className="input__form__div">
          <input
            type="text"
            id="word"
            name="word"
            className="form__input"
            placeholder="Enter Word"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.word}
          />
          {formik.touched.word && formik.errors.word ? (
            <p className="input__error">{formik.errors.word}</p>
          ) : null}
        </div>
        <div className="input__form__div">
          <input
            type="text"
            id="meaning"
            name="meaning"
            className="form__input"
            placeholder="Enter Meaning"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.meaning}
          />
          {formik.touched.meaning && formik.errors.meaning ? (
            <p className="input__error">{formik.errors.meaning}</p>
          ) : null}
        </div>

        <div className="input__form__div">
          <input
            type="password"
            id="code"
            name="code"
            className="form__input"
            placeholder="Enter Admin Code"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.code}
          />
          {formik.touched.code && formik.errors.code ? (
            <p className="input__error">{formik.errors.code}</p>
          ) : null}
        </div>

        <button
          onClick={() => fetchLatestVocabs(dispatch)}
          type="submit"
          className="submit__button"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default InputVocab;
