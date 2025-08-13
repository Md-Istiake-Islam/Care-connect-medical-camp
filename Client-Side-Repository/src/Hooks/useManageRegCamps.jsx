import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import axiosSecure from "../Utility/axiosSecure";
import AuthContext from "../Provider/AuthProvider/AuthContext";

const useManageRegCamps = ({
   currentPage = "",
   limit = "",
   searchTerm = "",
} = {}) => {
   const [totalCount, setTotalCount] = useState();
   const [revenue, setRevenue] = useState();
   const { user } = useContext(AuthContext);

   const {
      data: allRegCamps,
      isLoading,
      error,
   } = useQuery({
      queryKey: ["manageRegCamps", currentPage, searchTerm],
      enabled: !!user,
      queryFn: async () => {
         const encodedSearch = encodeURIComponent(searchTerm);
         const res = await axiosSecure.get(
            `/all-registered-camps?page=${currentPage}&limit=${limit}&searchTerm=${encodedSearch}`
         );
         setTotalCount(res.data.totalCount);
         setRevenue(res.data.revenue);
         return res.data.data;
      },
      keepPreviousData: true,
   });
   return { allRegCamps, totalCount, revenue, isLoading, error };
};

export default useManageRegCamps;
