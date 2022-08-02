import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  addNewVocabToFirebase,
  auth,
  fetchVocabs,
  register,
} from "../redux/vocabActionsCreators";

import useStatus from "../hooks/useStatus";

const initialValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

const onSubmit = (dispatch, email, password) => {};

const validate = (value) => {
  const errors = {};

  if (!value.email) {
    errors.email = "Required";
  }

  if (!value.password) {
    errors.password = "Required";
  }

  if (!value.confirmPassword) {
    errors.confirmPassword = "Required";
  }

  return errors;
};

const SignUp = () => {
  const dispatch = useDispatch();
  const [user, setUser] = useState("");
  const { loading, error, success } = useSelector((items) => items);
  const { user: loggedUser } = useStatus();
  const navigate = useNavigate();
  useEffect(() => {
    if (loggedUser) {
      console.log(loggedUser);
      navigate("/");
    }
    console.log(loggedUser);
  }, [loggedUser]);

  const formik = useFormik({
    initialValues,
    validate,
  });

  return (
    <div className="login__input__container">
      <form onSubmit={formik.handleSubmit} className="login__form__container">
        <h2>Sign Up</h2>

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
            placeholder="Enter Password (Atleast 6 Characters)"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="input__error">{formik.errors.password}</p>
          ) : null}
        </div>

        <div className="input__form__div">
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="form__input"
            placeholder="Confirm Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.code}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <p className="input__error">{formik.errors.confirmPassword}</p>
          ) : null}
        </div>

        <button
          disabled={loading}
          type="button"
          onClick={() =>
            dispatch(register(formik.values.email, formik.values.password))
          }
          className="submit__button"
        >
          Submit
        </button>
        {error && <div> {error}</div>}
      </form>
    </div>
  );
};

export default SignUp;
