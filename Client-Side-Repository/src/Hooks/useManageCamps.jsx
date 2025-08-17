import { useState } from "react";
import axiosSecure from "../Utility/axiosSecure";
import { useQuery } from "@tanstack/react-query";

// State to hold the camps data

export const useManageCamps = ({
   currentPage = "",
   limit = "",
   searchTerm = "",
} = {}) => {
   //set state for total camps
   const [totalCount, setTotalCount] = useState();

   const {
      data: camps = [],
      isLoading,
      error,
   } = useQuery({
      queryKey: ["camps", currentPage, searchTerm],
      queryFn: async () => {
         const encodedSearch = encodeURIComponent(searchTerm);
         const res = await axiosSecure.get(
            `/manage-camps?page=${currentPage}&limit=${limit}&searchTerm=${encodedSearch}`
         );
         setTotalCount(res.data.totalCount);

         return res.data.camps;
      },
      keepPreviousData: true,
   });

   return { camps, totalCount, isLoading, error };
};
