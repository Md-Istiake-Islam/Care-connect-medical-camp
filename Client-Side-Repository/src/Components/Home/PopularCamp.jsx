import React, { useContext, useEffect, useState } from "react";
import { Search } from "lucide-react";
import usePopularCamp from "../../Hooks/usePopularCamp";
import LoadingSpinner from "../Shared/LoadingElement/LoadingSpinner";
import PopularCampsCard from "./Cards/PopularCampsCard";
import { Link } from "react-router";
import ThemeContext from "../../Provider/ThemeProvider/ThemeContext";

const PopularCamp = () => {
   //get camps data from hook
   const { camps, isLoading } = usePopularCamp();

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
         className={`py-16 transition-colors duration-300 ${
            darkMode ? "bg-gray-800" : "bg-gray-50"
         }`}
      >
         <div className="container lg:max-w-7xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="text-center mb-12">
               <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${textHT}`}>
                  Most Popular Camps
               </h1>
               <p className={`max-w-2xl mx-auto ${pStyle}`}>
                  Discover the most loved camps chosen by our community. These
                  top-rated experiences are filling up fast—don’t miss your
                  chance to join!
               </p>
            </div>

            {/* Camps Grid */}

            <div
               className={`grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3`}
            >
               {camps.map((camp) => (
                  <PopularCampsCard
                     key={camp._id}
                     camp={camp}
                     darkMode={darkMode}
                     containerStyle={containerStyle}
                     textHT={textHT}
                     pStyle={pStyle}
                  />
               ))}
            </div>

            <div className="text-center mt-12">
               <Link
                  to={"/available-camps"}
                  className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all font-semibold"
               >
                  See All Camps
               </Link>
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
               </div>
            ) : null}
         </div>
      </div>
   );
};

export default PopularCamp;
