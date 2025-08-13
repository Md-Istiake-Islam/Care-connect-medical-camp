import { useState } from "react";
import axiosSecure from "../Utility/axiosSecure";
import { useQuery } from "@tanstack/react-query";

// State to hold the camps data

export const useAllCamps = ({ searchTerm = "", sortBy = "" } = {}) => {
   // State to hold the camp data if a specific camp ID is provided

   const {
      data: camps = [],
      isLoading,
      error,
   } = useQuery({
      queryKey: ["camps", searchTerm, sortBy],
      queryFn: async () => {
         const res = await axiosSecure.get(
            `/camps?search=${searchTerm}&sort=${sortBy}`
         );
         return res.data;
      },
      keepPreviousData: true,
   });

   return { camps, isLoading, error };
};
