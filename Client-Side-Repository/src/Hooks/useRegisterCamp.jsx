import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useContext } from "react";
import axiosSecure from "../Utility/axiosSecure";
import AuthContext from "../Provider/AuthProvider/AuthContext";

const useRegisterCamp = () => {
   const { user } = useContext(AuthContext);
   // Create a query client instance
   const queryClient = useQueryClient();

   // Mutation to register for a camp
   const { mutateAsync } = useMutation({
      mutationFn: async (registerCampData) => {
         const res = await axiosSecure.post(
            "/registered-camps",
            registerCampData
         );
         return res.data;
      },
      onSuccess: (data, variable) => {
         queryClient.invalidateQueries({
            queryKey: ["campDetails", variable.campId],
         });
         queryClient.invalidateQueries({
            queryKey: ["currentUserRegCamps", user?.email],
         });
      },
   });

   return { mutateAsync };
};

export default useRegisterCamp;
