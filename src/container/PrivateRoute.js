import React from "react";
import { Navigate } from "react-router-dom";
import useStatus from "../hooks/useStatus";

const PrivateRoute = ({ loggedUser, children }) => {
  console.log(loggedUser);

  if (!loggedUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
