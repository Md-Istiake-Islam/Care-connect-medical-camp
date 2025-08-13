import React, { useState, useContext, useEffect } from "react";
import { Heart, Receipt } from "lucide-react";
import FeedbackModal from "../Modal/FeedbackModal";
import GetStatusBadge from "../Components/GetStatusBadge";
import CampTR from "../Components/CampTR";
import StatusCard from "../Components/StatusCard";
import useAllRegCamps from "../../../Hooks/useAllRegCamps";
import LoadingSpinner from "../../Shared/LoadingElement/LoadingSpinner";
import PaginationControl from "../Components/PaginationControl";
import PaymentModal from "../Modal/PaymentModal";
import useDeleteRegCamp from "../../../Hooks/useDeleteRegCamp";
import toast from "react-hot-toast";
import SearchContext from "../../../Provider/SearchProivder/SearchContext";
import ThemeContext from "../../../Provider/ThemeProvider/ThemeContext";
import useTitle from "../../../Hooks/useTitle";

// Dummy data for registered camps

const RegisteredCamps = () => {
   //scroll to top
   useTitle("Registered Camps || CareConnect Medical Camp");

   // get theme data from context
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

   // state for control feedback modal
   const [showFeedbackModal, setShowFeedbackModal] = useState(false);
   const [showPaymentModal, setShowPaymentModal] = useState(false);
   const [selectedCamp, setSelectedCamp] = useState(null);

   // state and fixed camps per page for all reg camps
   const itemsPerPage = 10;

   // use hooks to get camps data and manage loading state
   const {
      allRegCamps: camps,
      totalCount,
      revenue: campsRevenue,
      isLoading,
      error,
   } = useAllRegCamps({ currentPage, limit: itemsPerPage, searchTerm });

   // hook for delete selected reg camp
   const { mutateAsync } = useDeleteRegCamp({ currentPage, itemsPerPage });

   if (isLoading || !camps) {
      return <LoadingSpinner />;
   }

   const totalPages = Math.ceil(totalCount / itemsPerPage);

   const handlePayment = async (camp) => {
      setSelectedCamp(camp);
      setShowPaymentModal(true);
   };

   const handleCancel = async (camp) => {
      const res = await mutateAsync(camp);
      if (res?.acknowledged && res?.deletedCount > 0) {
         toast.success("Order Canceled successfully");
      }
   };

   const handleFeedback = (camp) => {
      setSelectedCamp(camp);
      setShowFeedbackModal(true);
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
                        My Registered Camps
                     </h1>
                     <p className={`${pStyle}`}>
                        Manage your medical camp registrations and payments
                     </p>
                  </div>
               </div>
            </div>

            {/* Stats Cards */}
            <StatusCard
               camps={camps}
               totalCount={totalCount}
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
                              Participant
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
                              Confirmation
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
                           <CampTR
                              key={camp._id}
                              camp={camp}
                              GetStatusBadge={GetStatusBadge}
                              handlePayment={handlePayment}
                              handleFeedback={handleFeedback}
                              handleCancel={handleCancel}
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

         {/* No Results */}
         {totalCount === 0 && (
            <div className="text-center py-16">
               <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Receipt className="w-12 h-12 text-gray-400" />
               </div>
               <h3 className="text-2xl font-bold text-slate-800 mb-2">
                  No Registered Camps Found
               </h3>
               <p className="text-gray-600 mb-6">
                  {searchTerm
                     ? "Try adjusting your search terms or filters."
                     : "You haven’t registered for any camps yet. Once you do, they will appear here."}
               </p>
            </div>
         )}

         {/* Feedback Modal */}
         <FeedbackModal
            isOpen={showFeedbackModal}
            onClose={() => setShowFeedbackModal(false)}
            camp={selectedCamp}
            currentPage={currentPage}
         />

         {/* Payment modal */}
         <PaymentModal
            isOpen={showPaymentModal}
            onClose={() => setShowPaymentModal(false)}
            camp={selectedCamp}
            currentPage={currentPage}
         />
      </div>
   );
};

export default RegisteredCamps;
