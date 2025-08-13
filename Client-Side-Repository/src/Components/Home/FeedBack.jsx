import React, { useEffect } from "react";
import FeedbackCard from "./Cards/FeedbackCard";
import { Star } from "lucide-react";
import useGetFeedBack from "../../Hooks/useGetFeedBack";
import LoadingSpinner from "../Shared/LoadingElement/LoadingSpinner";
import { StarHalf, Star as StarOutline } from "lucide-react";
import { Link } from "react-router";

const FeedBack = () => {
   // use hook to get feedback data
   const { Feedback, feedBackStats, isLoading } = useGetFeedBack();

   if (!Feedback || !feedBackStats || isLoading) {
      return <LoadingSpinner />;
   }

   const rating = feedBackStats?.averageRatings;
   const fullStars = Math.floor(rating);
   const hasHalfStar = rating % 1 >= 0.25 && rating % 1 <= 0.75;
   const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

   return (
      <div className="py-16 bg-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
               <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  What Our Patients Say
               </h2>
               <p className=" text-gray-600 max-w-2xl mx-auto">
                  Real stories from real people whose lives have been touched by
                  our medical camps
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {Feedback.map((Feedback, index) => (
                  <FeedbackCard key={index} Feedback={Feedback} />
               ))}
            </div>

            <div className="text-center mt-12">
               <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-8 max-w-4xl mx-auto">
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
                     <span className="ml-3 text-2xl font-bold text-gray-800">
                        {feedBackStats?.averageRatings} / 5
                     </span>
                  </div>
                  <p className="text-lg text-gray-700 mb-4">
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
