import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosSecure from "../Utility/axiosSecure";

const useUpdateCamp = (id) => {
   const queryClient = useQueryClient();

   //Mutation to delete reg camps
   const { mutateAsync } = useMutation({
      mutationFn: async (campData) => {
         const res = await axiosSecure.patch(
            `/update-camps?campId=${id}`,
            campData
         );
         return res.data;
      },
      onSuccess: (data) => {
         queryClient.invalidateQueries({
            queryKey: ["campDetails", id],
         });
      },
   });
   return { mutateAsync };
};

export default useUpdateCamp;
