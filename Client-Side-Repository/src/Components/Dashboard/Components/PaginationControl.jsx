import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";

const PaginationControl = ({
   currentPage,
   itemsPerPage,
   totalCount,
   totalPages,
   setCurrentPage,
   darkMode,
   pStyle,
}) => {
   return (
      <div
         className={`${
            darkMode
               ? "bg-gray-700 border-gray-600"
               : "bg-gray-50 border-gray-200"
         } px-6 py-4 border-t `}
      >
         <div className="flex items-center justify-between">
            <div className={`text-sm ${pStyle}`}>
               Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
               {Math.min(currentPage * itemsPerPage, totalCount)} of{" "}
               {totalCount} camps
            </div>

            <div className="flex items-center space-x-2">
               <button
                  onClick={() =>
                     setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-200 hover:bg-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
               >
                  <ChevronLeft className={`w-4 h-4 ${pStyle}`} />
               </button>

               <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                     (page) => (
                        <button
                           key={page}
                           onClick={() => setCurrentPage(page)}
                           className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                              currentPage === page
                                 ? "bg-blue-600 text-white"
                                 : ` hover:bg-gray-100 ${pStyle}`
                           }`}
                        >
                           {page}
                        </button>
                     )
                  )}
               </div>

               <button
                  onClick={() =>
                     setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-200 hover:bg-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
               >
                  <ChevronRight className={`w-4 h-4 ${pStyle}`} />
               </button>
            </div>
         </div>
      </div>
   );
};

export default PaginationControl;
