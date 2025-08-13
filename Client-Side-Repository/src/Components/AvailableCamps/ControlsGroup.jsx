import {
   Calendar,
   ChevronDown,
   Filter,
   Grid2X2,
   Grid3X3,
   Search,
   SortAsc,
   Users,
} from "lucide-react";
import React, { useState } from "react";

const ControlsGroup = ({
   camps,
   searchTerm,
   setSearchTerm,
   sortBy,
   setSortBy,
   layout,
   setLayout,
}) => {
   const [showSortDropdown, setShowSortDropdown] = useState(false);

   const getSortLabel = () => {
      switch (sortBy) {
         case "participants":
            return "Most Registered";
         case "fees":
            return "Camp Fees";
         case "name":
            return "Alphabetical Order";
         case "date":
         default:
            return "Date & Time";
      }
   };
   return (
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
         <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
               <input
                  type="text"
                  placeholder="Search camps, locations, or doctors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
               />
            </div>

            {/* Controls Group */}
            <div className="flex items-center space-x-4">
               {/* Sort Dropdown */}
               <div className="relative">
                  <button
                     onClick={() => setShowSortDropdown(!showSortDropdown)}
                     className="flex items-center space-x-2 px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-300 border border-gray-200"
                  >
                     <SortAsc className="w-5 h-5 text-gray-600" />
                     <span className="text-gray-700 font-medium">
                        {getSortLabel()}
                     </span>
                     <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>

                  {showSortDropdown && (
                     <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 z-10">
                        <div className="p-2">
                           {[
                              {
                                 value: "date",
                                 label: "Date & Time",
                                 icon: Calendar,
                              },
                              {
                                 value: "participants",
                                 label: "Most Registered",
                                 icon: Users,
                              },
                              {
                                 value: "fees",
                                 label: "Camp Fees",
                                 icon: Filter,
                              },
                              {
                                 value: "name",
                                 label: "Alphabetical Order",
                                 icon: SortAsc,
                              },
                           ].map(({ value, label, icon: Icon }) => (
                              <button
                                 key={value}
                                 onClick={() => {
                                    setSortBy(value);
                                    setShowSortDropdown(false);
                                 }}
                                 className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                                    sortBy === value
                                       ? "bg-blue-50 text-blue-700"
                                       : "text-gray-700 hover:bg-gray-50"
                                 }`}
                              >
                                 <Icon className="w-4 h-4" />
                                 <span>{label}</span>
                              </button>
                           ))}
                        </div>
                     </div>
                  )}
               </div>

               {/* Layout Toggle */}
               <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200">
                  <button
                     onClick={() => setLayout("3-column")}
                     className={`p-2 rounded-lg transition-all duration-300 ${
                        layout === "3-column"
                           ? "bg-white shadow-sm text-blue-600"
                           : "text-gray-600 hover:text-gray-800"
                     }`}
                  >
                     <Grid3X3 className="w-5 h-5" />
                  </button>
                  <button
                     onClick={() => setLayout("2-column")}
                     className={`p-2 rounded-lg transition-all duration-300 ${
                        layout === "2-column"
                           ? "bg-white shadow-sm text-blue-600"
                           : "text-gray-600 hover:text-gray-800"
                     }`}
                  >
                     <Grid2X2 className="w-5 h-5" />
                  </button>
               </div>
            </div>
         </div>

         {/* Results Count */}
         <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-gray-600">
               Showing{" "}
               <span className="font-semibold text-slate-800">
                  {camps?.length}
               </span>{" "}
               camps
               {searchTerm && (
                  <span>
                     {" "}
                     for "
                     <span className="font-semibold text-blue-600">
                        {searchTerm}
                     </span>
                     "
                  </span>
               )}
            </p>
         </div>
      </div>
   );
};

export default ControlsGroup;
