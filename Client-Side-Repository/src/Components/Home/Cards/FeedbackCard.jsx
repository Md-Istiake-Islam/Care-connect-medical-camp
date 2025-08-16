import { Quote, Star, User } from "lucide-react";
import React from "react";

const FeedbackCard = ({
   Feedback,
   containerStyle,
   textHT,
   pStyle,
   darkMode,
}) => {
   return (
      <div
         className={`rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${containerStyle}`}
      >
         <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
               <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-semibold text-lg">
                  <User />
               </div>
            </div>

            <div className="flex-1">
               <div className="flex items-center justify-between mb-2">
                  <div>
                     <h4 className={`font-semibold ${textHT}`}>
                        {Feedback?.participantName}
                     </h4>
                     <p className={`line-clamp-1 text-sm ${pStyle}`}>
                        {Feedback?.campLocation}
                     </p>
                  </div>
                  <div className="flex items-center space-x-1">
                     {[...Array(5)].map((_, i) => (
                        <Star
                           key={i}
                           size={16}
                           className={`${
                              i < Feedback?.rating
                                 ? "fill-yellow-400 text-yellow-400"
                                 : "text-gray-300"
                           }`}
                        />
                     ))}
                  </div>
               </div>

               <div className="relative">
                  <Quote className="absolute -top-1 -left-1 h-4 w-4 text-blue-200" />
                  <p
                     className={`line-clamp-4 text-sm pl-4 mb-3 min-h-[80px] ${
                        darkMode ? "text-gray-300/80" : "text-gray-700/90"
                     }`}
                  >
                     {Feedback?.feedback}
                  </p>
               </div>

               <div
                  className={`inline-block px-3 py-1.5 text-xs rounded-full font-medium ${
                     darkMode
                        ? "bg-blue-800/30 text-blue-300"
                        : "bg-blue-50 text-blue-700"
                  }`}
               >
                  {Feedback?.healthPro}
               </div>
            </div>
         </div>
      </div>
   );
};

export default FeedbackCard;
