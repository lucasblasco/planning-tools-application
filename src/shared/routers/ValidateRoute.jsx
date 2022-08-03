import React from "react";
import { Navigate } from "react-router-dom";

export const ValidateRoute = ({ type, children }) => {
  console.log(type);
  return typeof type === undefined || type === "" ? <Navigate to={"/"} /> : children;
};
