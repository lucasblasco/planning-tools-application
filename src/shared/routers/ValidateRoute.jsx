import React from "react";
import { Navigate } from "react-router-dom";

export const ValidateRoute = ({ type, children }) => {
  return typeof type === undefined || type === "" ? <Navigate to={"/"} /> : children;
};
