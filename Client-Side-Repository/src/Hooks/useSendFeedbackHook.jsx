import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import axiosSecure from "../Utility/axiosSecure";

const useSendFeedbackHook = ({ currentPage }) => {
   const queryClient = useQueryClient();

   //Mutation to delete reg camps
   const { mutateAsync } = useMutation({
      mutationFn: async (userFeedback) => {
         const res = await axiosSecure.patch(
            `/send-feedback?campId=${userFeedback?.campId}`,
            userFeedback
         );
         return res.data;
      },
      onSuccess: (data) => {
         queryClient.invalidateQueries({
            queryKey: ["currentUserAllRegCamps", currentPage],
         });
      },
   });
   return { mutateAsync };
};

export default useSendFeedbackHook;
