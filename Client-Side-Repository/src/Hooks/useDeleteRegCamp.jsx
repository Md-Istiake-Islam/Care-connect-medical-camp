import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import axiosSecure from "../Utility/axiosSecure";

const useDeleteRegCamp = ({ currentPage }) => {
   const queryClient = useQueryClient();

   //Mutation to delete reg camps
   const { mutateAsync } = useMutation({
      mutationFn: async (camp) => {
         const res = await axiosSecure.delete(
            `/registered-camp-delete?campId=${camp?._id}`
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

export default useDeleteRegCamp;
