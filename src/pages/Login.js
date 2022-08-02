import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  addNewVocabToFirebase,
  fetchVocabs,
  login,
  logout,
} from "../redux/vocabActionsCreators";
import useStatus from "../hooks/useStatus";
import "./Login.css";

const initialValues = {
  email: "",
  password: "",
};

const onSubmit = (value) => {
  // login(value.email, value.password);

  console.log("logged", value.email);
};

const fetchLatestVocabs = (dispatch) => {
  dispatch(fetchVocabs());
};

const validate = (value) => {
  const errors = {};

  if (!value.email) {
    errors.email = "Required";
  }

  if (!value.password) {
    errors.password = "Required";
  }

  return errors;
};

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user: loggedUser } = useStatus();

  useEffect(() => {
    if (loggedUser) {
      console.log(loggedUser);
      navigate("/");
    }
  }, [loggedUser]);

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <div className="login__input__container">
      <form onSubmit={formik.handleSubmit} className="login__form__container">
        <h2>Login</h2>
        <div className="input__form__div">
          <input
            type="email"
            id="email"
            name="email"
            className="form__input"
            placeholder="Enter Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="input__error">{formik.errors.email}</p>
          ) : null}
        </div>
        <div className="input__form__div">
          <input
            type="password"
            id="password"
            name="password"
            className="form__input"
            placeholder="Enter Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="input__error">{formik.errors.password}</p>
          ) : null}
        </div>

        <button
          onClick={() =>
            dispatch(login(formik.values.email, formik.values.password))
          }
          type="submit"
          className="submit__button"
        >
          Submit
        </button>
      </form>
      <div className="signup__container">
        Create Account
        <Link className="signup__button" to="/signup">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
