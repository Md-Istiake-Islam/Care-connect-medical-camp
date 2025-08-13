import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../Utility/axiosSecure";

export const useCampDetails = ({ id }) => {
   // query to fetch camp details by ID
   const {
      data: camp,
      isLoading,
      error,
   } = useQuery({
      queryKey: ["campDetails", id],
      enabled: !!id,
      queryFn: async () => {
         const res = await axiosSecure.get(`/camp-details?id=${id}`);
         return res.data;
      },
   });
   return { camp, isLoading, error };
};
