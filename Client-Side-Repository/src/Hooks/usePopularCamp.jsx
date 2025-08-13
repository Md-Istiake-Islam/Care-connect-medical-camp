import { useQuery } from "@tanstack/react-query";
import React from "react";
import axiosSecure from "../Utility/axiosSecure";

const usePopularCamp = () => {
   const {
      data: camps = [],
      isLoading,
      error,
   } = useQuery({
      queryKey: ["camps"],
      queryFn: async () => {
         const res = await axiosSecure.get("/popular-camps");
         return res.data;
      },
      keepPreviousData: true,
   });

   return { camps, isLoading, error };
};

export default usePopularCamp;
