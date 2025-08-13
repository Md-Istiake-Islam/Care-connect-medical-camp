import React, { useContext } from "react";
import AuthContext from "../Provider/AuthProvider/AuthContext";
import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../Utility/axiosSecure";

const useUserInfo = () => {
   const { user, loading } = useContext(AuthContext);

   // fetch userData from server
   const {
      data: userInfo,
      isPending,
      isLoading: isUserLoading,
      refetch,
   } = useQuery({
      queryKey: ["userInfo", user?.email],
      enabled: !loading && !!user?.email,
      queryFn: async () => {
         const { data } = await axiosSecure.get(`/users/${user?.email}`);
         return data;
      },
      keepPreviousData: true,
   });

   const role = userInfo?.role || null;

   //return user info
   return { userInfo, role, isPending, isUserLoading, refetch };
};

export default useUserInfo;
