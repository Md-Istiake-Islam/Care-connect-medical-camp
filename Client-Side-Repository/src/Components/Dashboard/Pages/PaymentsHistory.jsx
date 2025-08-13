import React, { useState, useContext, useEffect } from "react";
import { Receipt } from "lucide-react";
import SearchContext from "../../../Provider/SearchProivder/SearchContext";
import useGetPaymentHistory from "../../../Hooks/useGetPaymentHistory";
import LoadingSpinner from "../../Shared/LoadingElement/LoadingSpinner";
import PaymentStatusCard from "../Components/PaymentStatusCard";
import PaymentTr from "../Components/PaymentTr";
import GetStatusBadge from "../Components/GetStatusBadge";
import PaginationControl from "../Components/PaginationControl";
import ThemeContext from "../../../Provider/ThemeProvider/ThemeContext";
import useTitle from "../../../Hooks/useTitle";

// Dummy payment history data

const PaymentsHistory = () => {
   //scroll to top
   useTitle("Payment History || CareConnect Medical Camp");

   // get theme data from theme context
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

   //set current page
   const [currentPage, setCurrentPage] = useState(1);

   const itemsPerPage = 10;

   // use hooks to get camps data and manage loading state
   const {
      allPaymentHistory: pmtData,
      totalCount,
      revenue: pmtRevenue,
      isLoading,
      error,
   } = useGetPaymentHistory({ currentPage, limit: itemsPerPage, searchTerm });

   if (isLoading || !pmtData) {
      return <LoadingSpinner />;
   }

   const totalPages = Math.ceil(totalCount / itemsPerPage);

   return (
      <div
         className={`min-h-screen  pt-6 ${
            darkMode ? "bg-gray-900" : "bg-gray-50"
         }`}
      >
         <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
               <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                     <Receipt className="w-6 h-6 text-white" />
                  </div>
                  <div>
                     <h1
                        className={` text-4xl font-bold  mb-2 ${
                           darkMode ? "text-white" : "text-slate-800"
                        }`}
                     >
                        Payment History
                     </h1>
                     <p className={`${pStyle}`}>
                        Track all your medical camp payment transactions
                     </p>
                  </div>
               </div>
            </div>

            {/* Summary Cards */}
            {
               <PaymentStatusCard
                  pmtRevenue={pmtRevenue}
                  containerStyle={containerStyle}
                  pStyle={pStyle}
                  textHT={textHT}
                  darkMode={darkMode}
               />
            }

            {/* Payment History Table */}
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
                              Fees
                           </th>
                           <th
                              className={`${pStyle} px-6 py-4 text-left text-xs font-semibold  uppercase tracking-wider`}
                           >
                              Payment Status
                           </th>
                           <th
                              className={`${pStyle} px-6 py-4 text-left text-xs font-semibold  uppercase tracking-wider`}
                           >
                              Confirmation Status
                           </th>
                           <th
                              className={`${pStyle} px-6 py-4 text-left text-xs font-semibold  uppercase tracking-wider`}
                           >
                              Transaction Details
                           </th>
                        </tr>
                     </thead>
                     <tbody className="bg-white divide-y divide-gray-200">
                        {pmtData.map((payment) => (
                           <PaymentTr
                              payment={payment}
                              key={payment.id}
                              GetStatusBadge={GetStatusBadge}
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
               <PaginationControl
                  currentPage={currentPage}
                  itemsPerPage={itemsPerPage}
                  totalCount={totalCount}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                  darkMode={darkMode}
                  pStyle={pStyle}
               />
            </div>

            {/* No Results */}
            {totalCount === 0 && (
               <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                     <Receipt className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">
                     No Transactions Found
                  </h3>
                  <p className="text-gray-600 mb-6">
                     {searchTerm
                        ? "Try adjusting your search terms or filters."
                        : "You haven't made any payments yet."}
                  </p>
               </div>
            )}
         </div>
      </div>
   );
};

export default PaymentsHistory;
