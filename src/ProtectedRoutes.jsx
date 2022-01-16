import { useContext } from "react";
import { useLocation } from "react-router";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "./App";

const useAuth = () => {
  const { user } = useContext(UserContext);
  //console.log(user);
  return user && user.auth;
};

export default function ProtectedRoutes() {
  const isAuth = useAuth();
  const location = useLocation();
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace state={{ from: location }} />
  );
}
