import React, { useContext } from "react";
import { UserContext } from "../../context/store";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const ctx = useContext(UserContext);
  const user = ctx.user;

  return <div>{!user ? <Navigate to="/login" /> : <Outlet />}</div>;
};

export default PrivateRoutes;
