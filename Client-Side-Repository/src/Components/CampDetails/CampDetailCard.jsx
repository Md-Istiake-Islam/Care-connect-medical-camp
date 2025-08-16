import { Calendar, Clock, MapPin, Stethoscope, Users } from "lucide-react";
import React from "react";
import useFormatDate from "../../Hooks/useFormatDate";

const CampDetailCard = ({
   date,
   location,
   participantCount,
   healthPro,
   description,
   darkMode,
   containerStyle,
   pStyle,
   textHT,
}) => {
   const { formattedDate, formattedTime } = useFormatDate(date);

   const titleStyle = darkMode ? "text-gray-300" : "text-gray-800";
   return (
      <div className={`rounded-3xl shadow-xl p-8 border ${containerStyle}`}>
         <h2 className={`text-2xl font-bold mb-6 ${textHT}`}>Camp Details</h2>

         <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Date & Time */}
            <div className="flex items-start space-x-4">
               <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                     darkMode ? "bg-blue-800/30" : "bg-blue-100"
                  }`}
               >
                  <Calendar
                     className={`w-6 h-6 ${
                        darkMode ? "text-blue-300" : "text-blue-600"
                     }`}
                  />
               </div>
               <div>
                  <h3 className={`font-semibold mb-1 ${titleStyle}`}>
                     Date & Time
                  </h3>
                  <div className="flex items-center gap-2">
                     <p className={`text-sm flex items-center mt-1 ${pStyle}`}>
                        <Clock className="w-4 h-4 mr-1" />
                        {formattedDate}
                     </p>
                     <p className={`text-sm flex items-center mt-1 ${pStyle}`}>
                        <Clock className="w-4 h-4 mr-1" />
                        {formattedTime}
                     </p>
                  </div>
               </div>
            </div>

            {/* Location */}
            <div className="flex items-start space-x-4">
               <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                     darkMode ? "bg-green-800/30" : "bg-green-100"
                  }`}
               >
                  <MapPin
                     className={`w-6 h-6 ${
                        darkMode ? "text-green-300" : "text-green-600"
                     }`}
                  />
               </div>
               <div>
                  <h3 className={`font-semibold mb-1 ${titleStyle}`}>
                     Location
                  </h3>
                  <p className={`text-sm ${pStyle}`}>{location}</p>
               </div>
            </div>

            {/* Healthcare Professional */}
            <div className="flex items-start space-x-4">
               <div
                  className={`w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center ${
                     darkMode ? "bg-purple-800/30" : "bg-purple-100"
                  }`}
               >
                  <Stethoscope
                     className={`w-6 h-6 ${
                        darkMode ? "text-purple-300" : "text-purple-600"
                     }`}
                  />
               </div>
               <div>
                  <h3 className={`font-semibold mb-1 ${titleStyle}`}>
                     Lead Healthcare Professional
                  </h3>
                  <p className={`text-sm ${pStyle}`}>{healthPro}</p>
               </div>
            </div>

            {/* Participant Count */}
            <div className="flex items-start space-x-4">
               <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                     darkMode ? "bg-orange-800/30" : "bg-orange-100"
                  }`}
               >
                  <Users
                     className={`w-6 h-6 ${
                        darkMode ? "text-orange-300" : "text-orange-600"
                     }`}
                  />
               </div>
               <div className="flex-1">
                  <h3 className={`font-semibold mb-1 ${titleStyle}`}>
                     Participants
                  </h3>
                  <p className={`text-sm mb-2 ${pStyle}`}>
                     {participantCount} registered
                  </p>
               </div>
            </div>
         </div>

         {/* Description */}
         <div>
            <h3 className="text-xl font-bold text-slate-800 mb-4">
               About This Camp
            </h3>
            <div className="prose prose-gray max-w-none">
               {description.split("\n\n").map((paragraph, index) => (
                  <p key={index} className={` leading-relaxed mb-4 ${pStyle}`}>
                     {paragraph}
                  </p>
               ))}
            </div>
         </div>
      </div>
   );
};

export default CampDetailCard;
