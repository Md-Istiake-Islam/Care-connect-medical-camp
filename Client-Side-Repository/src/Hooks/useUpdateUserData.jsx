import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import axiosSecure from "../Utility/axiosSecure";

const useUpdateUserData = (email) => {
   const queryClient = useQueryClient();

   //Mutation to delete reg camps
   const { mutateAsync } = useMutation({
      mutationFn: async (userData) => {
         const res = await axiosSecure.patch(`/update-user/${email}`, userData);
         return res.data;
      },
      onSuccess: (data) => {
         queryClient.invalidateQueries({
            queryKey: ["userInfo", email],
         });
      },
   });
   return { mutateAsync };
};

export default useUpdateUserData;
