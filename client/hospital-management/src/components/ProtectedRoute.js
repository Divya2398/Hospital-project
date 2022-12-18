import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
// import { userlogin } from "../../redux/user/UserSlice";
const ProtectedRoute = ({ children }) => {
  const { loginStatus, token } = useSelector((state) => state.user);
  return JSON.parse(loginStatus) ? (
    children
  ) : (
    //  state={"login to your patient account first"}
    <Navigate to={"/login"} />
  );
};

export default ProtectedRoute;
