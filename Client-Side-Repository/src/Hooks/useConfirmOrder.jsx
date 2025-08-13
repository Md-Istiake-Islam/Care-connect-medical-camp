import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import axiosSecure from "../Utility/axiosSecure";

const useConfirmOrder = ({ currentPage }) => {
   const queryClient = useQueryClient();

   //Mutation to delete reg camps
   const { mutateAsync } = useMutation({
      mutationFn: async (camp) => {
         const res = await axiosSecure.patch(
            `/confirm-order?orderId=${camp?._id}`
         );
         return res.data;
      },
      onSuccess: (data) => {
         queryClient.invalidateQueries({
            queryKey: ["manageRegCamps", currentPage],
         });
      },
   });
   return { mutateAsync };
};

export default useConfirmOrder;
