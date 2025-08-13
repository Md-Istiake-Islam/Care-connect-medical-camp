import { useQueries, useQuery } from "@tanstack/react-query";
import React from "react";
import axiosSecure from "../Utility/axiosSecure";

const useGetFeedBack = () => {
   const { data, isLoading, error } = useQuery({
      queryKey: ["feedback"],
      queryFn: async () => {
         const res = await axiosSecure.get("/user-feedback");
         return res.data;
      },
      keepPreviousData: true,
   });

   return {
      Feedback: data?.result,
      feedBackStats: data?.feedbackStats,
      isLoading,
      error,
   };
};

export default useGetFeedBack;
