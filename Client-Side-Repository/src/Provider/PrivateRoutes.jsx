import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import AuthContext from "./AuthProvider/AuthContext";
import LoadingSpinner from "../Components/Shared/LoadingElement/LoadingSpinner";

const PrivateRoutes = ({ children }) => {
   const { user, loading } = useContext(AuthContext);
   const location = useLocation();

   if (loading) {
      return <LoadingSpinner></LoadingSpinner>;
   } else if (user && user.email) {
      return children;
   } else {
      return (
         <Navigate
            state={location.pathname}
            to={"../../authentication/login"}
         ></Navigate>
      );
   }
};

export default PrivateRoutes;
