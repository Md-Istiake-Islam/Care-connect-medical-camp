import { useQuery } from "@tanstack/react-query";
import React from "react";
import axiosSecure from "../Utility/axiosSecure";

const useParticipantStats = () => {
   const { data, isLoading, error } = useQuery({
      queryKey: ["participantStats"],
      queryFn: async () => {
         const res = await axiosSecure.get("/user-stats");
         return res.data;
      },
      keepPreviousData: true,
   });

   return {
      stats: data?.stats,
      paymentStats: data?.paymentStats,
      isLoading,
      error,
   };
};

export default useParticipantStats;
