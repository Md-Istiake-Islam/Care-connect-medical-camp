import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import axiosSecure from "../Utility/axiosSecure";

const useSendTransaction = ({ currentPage, itemsPerPage }) => {
   //Create a query client
   const queryClient = useQueryClient();

   //Mutation to send transaction
   const { mutateAsync } = useMutation({
      mutationFn: async (orderedCamp) => {
         const orderId = orderedCamp?.orderId;
         const res = await axiosSecure.post(
            `/payment-history?orderId=${orderId}`,
            orderedCamp
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

export default useSendTransaction;
