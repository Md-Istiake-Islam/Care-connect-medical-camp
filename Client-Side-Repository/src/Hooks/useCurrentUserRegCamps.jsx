import React, { useContext } from "react";
import AuthContext from "../Provider/AuthProvider/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../Utility/axiosSecure";

const useCurrentUserRegCamps = () => {
   const { user } = useContext(AuthContext);
   // Query to fetch registered camps for the current user
   const {
      data: currentUserRegCamps,
      isLoading,
      error,
   } = useQuery({
      queryKey: ["currentUserRegCamps", user?.email],
      enabled: !!user,
      queryFn: async () => {
         // user data collected from decoded email
         const res = await axiosSecure.get("/registered-camps");
         return res.data.data;
      },
   });
   return { currentUserRegCamps, isLoading, error };
};

export default useCurrentUserRegCamps;
