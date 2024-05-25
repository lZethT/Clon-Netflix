import React, { useContext } from "react";
import { UserContext } from "../components/contexts/UserContext";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = ({ redirectTo = "/" }) => {
  const { isLoggedIn } = useContext(UserContext);

  if (!isLoggedIn) {
    return <Navigate to={redirectTo} />;
  }

  return <Outlet />;
};

export const LoggedInUser = ({ redirectTo = "/Home" }) => {
  const { isLoggedIn } = useContext(UserContext);

  if (isLoggedIn) {
    return <Navigate to={redirectTo} />;
  }

  return <Outlet />;
};
