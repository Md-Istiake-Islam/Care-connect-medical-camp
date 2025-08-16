import React, { useContext, useEffect, useState } from "react";
import FeedbackCard from "./Cards/FeedbackCard";
import { Star } from "lucide-react";
import useGetFeedBack from "../../Hooks/useGetFeedBack";
import LoadingSpinner from "../Shared/LoadingElement/LoadingSpinner";
import { StarHalf, Star as StarOutline } from "lucide-react";
import { Link } from "react-router";
import ThemeContext from "../../Provider/ThemeProvider/ThemeContext";

const FeedBack = () => {
   // use hook to get feedback data
   const { Feedback, feedBackStats, isLoading } = useGetFeedBack();

   //get theme data from theme context
   const { darkMode } = useContext(ThemeContext);

   //set heading and title text style
   const textHT = darkMode ? "text-white" : "text-gray-800";

   //set paragraph style
   const pStyle = darkMode ? "text-gray-400" : "text-gray-600";

   //container style
   const containerStyle = darkMode
      ? "bg-gray-800 border-gray-700"
      : "bg-white border-gray-100";

   if (!Feedback || !feedBackStats || isLoading) {
      return <LoadingSpinner />;
   }

   const rating = feedBackStats?.averageRatings;
   const fullStars = Math.floor(rating);
   const hasHalfStar = rating % 1 >= 0.25 && rating % 1 <= 0.75;
   const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

   return (
      <div className={`py-16 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
         <div className="container lg:max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
               <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${textHT}`}>
                  What Our Patients Say
               </h2>
               <p className={`max-w-3xl mx-auto ${pStyle}`}>
                  Real stories from real people whose lives have been touched by
                  our medical camps
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {Feedback.map((Feedback, index) => (
                  <FeedbackCard
                     key={index}
                     Feedback={Feedback}
                     containerStyle={containerStyle}
                     textHT={textHT}
                     pStyle={pStyle}
                     darkMode={darkMode}
                  />
               ))}
            </div>

            <div className="text-center mt-12">
               <div
                  className={`bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8 max-w-4xl mx-auto ${
                     darkMode
                        ? "from-blue-800/20 to-green-800/20"
                        : "from-blue-50 to-green-50"
                  }`}
               >
                  <div className="flex items-center justify-center mb-4">
                     <div className="flex items-center space-x-1">
                        {[...Array(fullStars)].map((_, i) => (
                           <Star
                              key={`full-${i}`}
                              className="h-6 w-6 fill-yellow-400 text-yellow-400"
                           />
                        ))}
                        {hasHalfStar && (
                           <StarHalf className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                        )}
                        {[...Array(emptyStars)].map((_, i) => (
                           <StarOutline
                              key={`empty-${i}`}
                              className="h-6 w-6 text-gray-300"
                           />
                        ))}
                     </div>
                     <span
                        className={`ml-3 text-2xl font-bold  ${
                           darkMode ? "text-gray-300" : "text-gray-800"
                        }`}
                     >
                        {feedBackStats?.averageRatings} / 5
                     </span>
                  </div>
                  <p
                     className={`text-lg  mb-4 ${
                        darkMode ? "text-gray-400" : "text-gray-700"
                     }`}
                  >
                     Average rating from{" "}
                     <strong>{feedBackStats?.totalFeedback}</strong> patient
                     reviews
                  </p>

                  <Link to={"/dashboard/registered-camps"}>
                     <button className="bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-3 rounded-lg hover:from-blue-700 hover:to-green-700 transition-all font-semibold">
                        Share Your Experience
                     </button>
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
};

export default FeedBack;
