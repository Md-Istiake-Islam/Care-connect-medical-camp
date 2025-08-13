import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../Utility/axiosSecure";

const useDeleteCamp = ({ currentPage = "", searchTerm = "" } = {}) => {
   const queryClient = useQueryClient();

   //Mutation to delete reg camps
   const { mutateAsync } = useMutation({
      mutationFn: async (id) => {
         const res = await axiosSecure.delete(`/delete-camp?campId=${id}`);
         return res.data;
      },
      onSuccess: (data) => {
         queryClient.invalidateQueries({
            queryKey: ["camps", currentPage, searchTerm],
         });
      },
   });
   return { mutateAsync };
};

export default useDeleteCamp;
