import React, { useContext, useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useAllCamps } from "../Hooks/useAllCamps";
import ControlsGroup from "../Components/AvailableCamps/ControlsGroup";
import CampsCard from "../Components/AvailableCamps/CampsCard";
import LoadingSpinner from "../Components/Shared/LoadingElement/LoadingSpinner";
import useTitle from "../Hooks/useTitle";
import { useLocation } from "react-router";
import ThemeContext from "../Provider/ThemeProvider/ThemeContext";

const AvailableCampsPage = () => {
   //scroll to top
   useTitle("All Available Page || CareConnect Medical Camp");
   const { pathname } = useLocation();
   useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
   }, [pathname]);

   // State for layout, sorting, search and dropdown visibility
   const [layout, setLayout] = useState("3-column");
   const [sortBy, setSortBy] = useState("date");
   const [searchTerm, setSearchTerm] = useState("");

   const { camps, isLoading, error } = useAllCamps({
      searchTerm,
      sortBy,
   });

   //get theme data from theme context
   const { darkMode } = useContext(ThemeContext);

   //set heading and title text style
   const textHT = darkMode ? "text-white" : "text-gray-900";

   //set paragraph style
   const pStyle = darkMode ? "text-gray-400" : "text-gray-600";

   //container style
   const containerStyle = darkMode
      ? "bg-gray-800 border-gray-700/50"
      : "bg-white border-gray-100";

   if (isLoading || !camps) {
      return <LoadingSpinner />;
   }

   return (
      <div
         className={`min-h-screen ${
            darkMode ? "bg-[#101828f6]" : "bg-gray-50"
         } pt-12`}
      >
         <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="text-center mb-12">
               <h1 className={`text-4xl md:text-4xl font-bold mb-4 ${textHT}`}>
                  Available Medical Camps
               </h1>
               <p className={`max-w-2xl mx-auto ${pStyle}`}>
                  Join our medical camps and make a difference in communities
                  across the country. Find the perfect camp that matches your
                  schedule and expertise.
               </p>
            </div>

            {/* Controls */}
            {
               <ControlsGroup
                  camps={camps}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  sortBy={sortBy}
                  setSortBy={setSortBy}
                  layout={layout}
                  setLayout={setLayout}
                  containerStyle={containerStyle}
                  darkMode={darkMode}
                  pStyle={pStyle}
               />
            }

            {/* Camps Grid */}

            <div
               className={`grid gap-8 ${
                  layout === "3-column"
                     ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                     : "grid-cols-1 lg:grid-cols-2"
               }`}
            >
               {camps.map((camp) => (
                  <CampsCard
                     key={camp._id}
                     camp={camp}
                     darkMode={darkMode}
                     containerStyle={containerStyle}
                     textHT={textHT}
                     pStyle={pStyle}
                  />
               ))}
            </div>

            {/* No Results */}
            {camps.length === 0 && !isLoading ? (
               <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                     <Search className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-2">
                     No Camps Found
                  </h3>
                  <p className="text-gray-600 mb-6">
                     Try adjusting your search terms or filters to find more
                     camps.
                  </p>
                  <button
                     onClick={() => {
                        setSearchTerm("");
                        setSortBy("date");
                     }}
                     className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                  >
                     Clear Filters
                  </button>
               </div>
            ) : null}
         </div>
      </div>
   );
};

export default AvailableCampsPage;
