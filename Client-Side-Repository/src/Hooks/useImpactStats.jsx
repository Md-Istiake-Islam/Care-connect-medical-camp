import { useQueries, useQuery } from "@tanstack/react-query";
import React from "react";
import axiosSecure from "../Utility/axiosSecure";

const useImpactStats = () => {
   const { data, isLoading, error } = useQuery({
      queryKey: ["impactStats"],
      queryFn: async () => {
         const res = await axiosSecure.get("/top-impact");
         return res.data;
      },
      keepPreviousData: true,
   });

   return {
      impactStats: data,
      isLoading,
      error,
   };
};

export default useImpactStats;
