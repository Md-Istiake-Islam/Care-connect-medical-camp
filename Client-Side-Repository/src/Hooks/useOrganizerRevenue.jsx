import { useQuery } from "@tanstack/react-query";
import React from "react";
import axiosSecure from "../Utility/axiosSecure";

const useOrganizerRevenue = () => {
   const { data, isLoading, error } = useQuery({
      queryKey: ["organizerRevenue"],
      queryFn: async () => {
         const res = await axiosSecure.get("/organizer-stats");
         return res.data;
      },
      keepPreviousData: true,
   });

   return {
      revenue: data,
      isLoading,
      error,
   };
};

export default useOrganizerRevenue;
