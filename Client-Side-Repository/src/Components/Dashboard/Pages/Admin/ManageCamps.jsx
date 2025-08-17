import React, { useContext, useEffect, useState } from "react";
import PaginationControl from "../../Components/PaginationControl";
import AuthContext from "../../../../Provider/AuthProvider/AuthContext";
import SearchContext from "../../../../Provider/SearchProivder/SearchContext";
import { Heart } from "lucide-react";
import LoadingSpinner from "../../../Shared/LoadingElement/LoadingSpinner";
import GetStatusBadge from "../../Components/GetStatusBadge";
import Swal from "sweetalert2";
import { useManageCamps } from "../../../../Hooks/useManageCamps";
import MngCampsTr from "../../Components/Admin/MngCampsTr";
import MngCampsStatusCard from "../../Components/Admin/MngCampsStatusCard";
import useDeleteCamp from "../../../../Hooks/useDeleteCamp";
import ThemeContext from "../../../../Provider/ThemeProvider/ThemeContext";
import useTitle from "../../../../Hooks/useTitle";
import useOrganizerRevenue from "@/Hooks/useOrganizerRevenue";

const ManageRegCamps = () => {
   //scroll to top
   useTitle("Manage Camps || CareConnect Medical Camp");

   const { theme } = useContext(ThemeContext);
   const [darkMode, setDarkMode] = useState(false);

   // set theme
   useEffect(() => {
      setDarkMode(theme === "dark" ? true : false);
   }, [setDarkMode, theme, darkMode]);

   // set container style
   const containerStyle = darkMode
      ? "bg-gray-800 border-gray-700"
      : "bg-white border-gray-200";

   //set heading and title text style
   const textHT = darkMode ? "text-slate-200" : "text-slate-800";

   //set paragraph style
   const pStyle = darkMode ? "text-gray-400" : "text-gray-600";
   // get search control from search Context
   const { searchTerm } = useContext(SearchContext);
   const [currentPage, setCurrentPage] = useState(1);

   const { mutateAsync } = useDeleteCamp({ currentPage, searchTerm });

   // state and fixed camps per page for all reg camps
   const itemsPerPage = 10;

   // use hooks to get camps data and manage loading state
   const { camps, totalCount, isLoading, error } = useManageCamps({
      searchTerm,
      limit: itemsPerPage,
      currentPage,
   });

   //get organizer revenue
   const { revenue: campsRevenue } = useOrganizerRevenue();

   // hook for delete selected reg camp

   //hook for confirm order

   if (isLoading || !camps || !campsRevenue) {
      return <LoadingSpinner />;
   }

   const totalPages = Math.ceil(totalCount / itemsPerPage);

   const handleDelete = async (id) => {
      const result = await Swal.fire({
         title: "Are you sure?",
         text: "You won't be able to undo this action!",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#d33",
         cancelButtonColor: "#3085d6",
         confirmButtonText: "Yes, cancel it!",
         showLoaderOnConfirm: true,
         preConfirm: async () => {
            try {
               const res = await mutateAsync(id);
               if (!res?.acknowledged && !res?.deletedCount > 0) {
                  throw new Error("Failed to delete camp");
               }
               return res;
            } catch (err) {
               Swal.showValidationMessage(`Request failed: ${err.message}`);
            }
         },
         allowOutsideClick: () => !Swal.isLoading(),
      });

      if (result.isConfirmed) {
         Swal.fire(
            "deleted!",
            "camp has been deleted throw Organizer!",
            "success"
         );
      }
   };

   return (
      <div
         className={`min-h-screen  pt-6 ${
            darkMode ? "bg-gray-900" : "bg-gray-50"
         }`}
      >
         <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
               <div className="flex gap-4 space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-500 rounded-xl flex items-center justify-center shadow-lg mt-1">
                     <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                     <h1
                        className={` text-4xl font-bold  mb-2 ${
                           darkMode ? "text-white" : "text-slate-800"
                        }`}
                     >
                        Manage Medical Camp
                     </h1>
                     <p className={`${pStyle}`}>
                        Manage your medical camp Data
                     </p>
                  </div>
               </div>
            </div>

            {/* Stats Cards */}
            <MngCampsStatusCard
               camps={camps}
               campsRevenue={campsRevenue}
               containerStyle={containerStyle}
               pStyle={pStyle}
               textHT={textHT}
               darkMode={darkMode}
            />

            {/* Table */}
            <div
               className={`${containerStyle} rounded-2xl shadow-lg border  overflow-hidden`}
            >
               <div className="overflow-x-auto">
                  <table className="w-full">
                     <thead
                        className={` border-b  ${
                           darkMode
                              ? "bg-gray-700 border-gray-600"
                              : "bg-gray-50 border-gray-200"
                        }`}
                     >
                        <tr>
                           <th
                              className={`${pStyle} px-6 py-4 text-left text-xs font-semibold  uppercase tracking-wider`}
                           >
                              Camp Details
                           </th>
                           <th
                              className={`${pStyle} px-6 py-4 text-left text-xs font-semibold  uppercase tracking-wider`}
                           >
                              Healthcare Professional
                           </th>
                           <th
                              className={`${pStyle} px-6 py-4 text-left text-xs font-semibold  uppercase tracking-wider`}
                           >
                              Fees
                           </th>

                           <th
                              className={`${pStyle} px-6 py-4 text-left text-xs font-semibold  uppercase tracking-wider`}
                           >
                              Actions
                           </th>
                        </tr>
                     </thead>
                     <tbody className="bg-white divide-y divide-gray-200">
                        {camps.map((camp) => (
                           <MngCampsTr
                              key={camp._id}
                              camp={camp}
                              GetStatusBadge={GetStatusBadge}
                              handleDelete={handleDelete}
                              containerStyle={containerStyle}
                              darkMode={darkMode}
                              pStyle={pStyle}
                              textHT={textHT}
                           />
                        ))}
                     </tbody>
                  </table>
               </div>

               {/* Pagination */}
               {
                  <PaginationControl
                     currentPage={currentPage}
                     itemsPerPage={itemsPerPage}
                     totalCount={totalCount}
                     totalPages={totalPages}
                     setCurrentPage={setCurrentPage}
                     darkMode={darkMode}
                     pStyle={pStyle}
                  />
               }
            </div>
         </div>
      </div>
   );
};

export default ManageRegCamps;
