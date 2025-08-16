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
   containerStyle,
   darkMode,
   pStyle,
}) => {
   const [showSortDropdown, setShowSortDropdown] = useState(false);

   const inputStyle = darkMode
      ? "border-gray-700 bg-gray-700/30 focus:bg-gray-700/60 placeholder:text-gray-500 text-gray-300"
      : "border-gray-200 bg-gray-50 focus:bg-white";

   const ddStyle = darkMode
      ? "border-gray-600 bg-gray-700 text-gray-300"
      : "border-gray-200 bg-gray-50 ";

   const buttonStyle = darkMode
      ? "border-gray-700 bg-gray-700/30"
      : "border-gray-200 bg-gray-50";

   const btnContStyle = darkMode ? "text-gray-300" : "text-gray-600";

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
      <div
         className={`rounded-2xl shadow-lg p-6 mb-8 border ${containerStyle}`}
      >
         <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
               <input
                  type="text"
                  placeholder="Search camps, locations, or doctors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={` w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none  transition-all duration-300 ${inputStyle}`}
               />
            </div>

            {/* Controls Group */}
            <div className="flex items-center space-x-4">
               {/* Sort Dropdown */}
               <div className="relative">
                  <button
                     onClick={() => setShowSortDropdown(!showSortDropdown)}
                     className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 border ${buttonStyle}`}
                  >
                     <SortAsc className={`w-5 h-5 ${btnContStyle} `} />
                     <span className={`font-medium ${btnContStyle}`}>
                        {getSortLabel()}
                     </span>
                     <ChevronDown className={`w-4 h-4 ${btnContStyle}`} />
                  </button>

                  {showSortDropdown && (
                     <div
                        className={`absolute right-0 top-full mt-2 w-64 rounded-xl shadow-xl border z-10 ${ddStyle}`}
                     >
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
                                       ? ` ${
                                            darkMode
                                               ? "bg-blue-800/40 text-blue-300"
                                               : "bg-blue-50 text-blue-700"
                                         }`
                                       : `  ${
                                            darkMode
                                               ? "text-gray-300 hover:bg-gray-600"
                                               : "text-gray-700 hover:bg-gray-50"
                                         }`
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
               <div
                  className={`flex items-center rounded-xl p-1 border ${buttonStyle}`}
               >
                  <button
                     onClick={() => setLayout("3-column")}
                     className={`p-2 rounded-lg transition-all duration-300 ${
                        layout === "3-column"
                           ? ` shadow-sm  ${
                                darkMode
                                   ? "text-blue-400 bg-gray-600"
                                   : "text-blue-600 bg-white"
                             }`
                           : `  ${
                                darkMode
                                   ? "text-gray-400 hover:text-gray-300"
                                   : "text-gray-600 hover:text-gray-800"
                             }`
                     }`}
                  >
                     <Grid3X3 className="w-5 h-5" />
                  </button>
                  <button
                     onClick={() => setLayout("2-column")}
                     className={`p-2 rounded-lg transition-all duration-300 ${
                        layout === "2-column"
                           ? `shadow-sm ${
                                darkMode
                                   ? "text-blue-400 bg-gray-600"
                                   : "text-blue-600 bg-white"
                             }`
                           : `${
                                darkMode
                                   ? "text-gray-400 hover:text-gray-300"
                                   : "text-gray-600 hover:text-gray-800"
                             }`
                     }`}
                  >
                     <Grid2X2 className="w-5 h-5" />
                  </button>
               </div>
            </div>
         </div>

         {/* Results Count */}
         <div
            className={`mt-4 pt-4 border-t  ${
               darkMode ? "border-gray-700" : "border-gray-100"
            }`}
         >
            <p className={`${pStyle}`}>
               Showing{" "}
               <span
                  className={`font-semibold  ${
                     darkMode ? "text-slate-300" : "text-slate-800"
                  }`}
               >
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
