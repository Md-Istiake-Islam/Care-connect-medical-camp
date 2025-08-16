import {
   MapPin,
   Calendar,
   Users,
   Stethoscope,
   Clock,
   ListCollapse,
} from "lucide-react";
import React from "react";
import { Link } from "react-router";
import useFormatDate from "../../Hooks/useFormatDate";

const CampsCard = ({ camp, darkMode, containerStyle, pStyle }) => {
   const {
      _id,
      campName,
      imageUrl,
      location,
      date,
      participantCount,
      campFees,
   } = camp;

   const { formattedDate, formattedTime } = useFormatDate(date);

   const contStyle = darkMode ? "text-gray-300" : "text-gray-700";

   return (
      <div
         className={` rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border group ${containerStyle}`}
      >
         {/* Image */}
         <div className="relative h-72 md:h-48 xl:h-64 overflow-hidden">
            <img
               src={imageUrl}
               alt={campName}
               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {/* Fee Badge */}
            <div className="absolute top-4 right-4">
               <div
                  className={`px-3 py-1 rounded-full text-sm xl:text-lg font-semibold ${
                     campFees === 0
                        ? "bg-green-500 text-white"
                        : "bg-white/90 text-slate-800"
                  }`}
               >
                  {campFees === 0 ? "Free" : `${campFees} Taka`}
               </div>
            </div>
         </div>

         {/* Content */}
         <div className="p-6">
            {/* Camp Name */}
            <h3
               className={`line-clamp-1 text-xl font-bold  mb-3 group-hover:text-blue-600 transition-colors duration-300 ${
                  darkMode ? "text-slate-200" : "text-slate-800"
               }`}
            >
               {campName}
            </h3>

            {/* Date & Time */}
            <div className="flex items-center space-x-2 mb-3">
               <div
                  className={`w-8 h-8  rounded-full flex items-center justify-center ${
                     darkMode ? "bg-blue-800/30" : "bg-blue-100"
                  }`}
               >
                  <Calendar
                     className={`w-4 h-4  ${
                        darkMode ? "text-blue-300" : "text-blue-600"
                     }`}
                  />
               </div>
               <div>
                  <p className={`text-sm font-semibold ${contStyle}`}>
                     {formattedDate}
                  </p>
                  <p className={`text-xs flex items-center ${pStyle}`}>
                     <Clock className="w-3 h-3 mr-1" />
                     {formattedTime}
                  </p>
               </div>
            </div>

            {/* Location */}
            <div className="flex items-center space-x-2 mb-3">
               <div
                  className={`w-8 h-8  rounded-full flex items-center justify-center ${
                     darkMode ? "bg-green-800/30" : "bg-green-100"
                  }`}
               >
                  <MapPin
                     className={`w-4 h-4  ${
                        darkMode ? "text-green-300" : "text-green-600"
                     }`}
                  />
               </div>
               <p className={`text-sm font-medium ${contStyle}`}>{location}</p>
            </div>

            {/* Participant Count */}
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center space-x-2">
                  <div
                     className={`w-8 h-8  rounded-full flex items-center justify-center ${
                        darkMode ? "bg-orange-800/30" : "bg-orange-100"
                     }`}
                  >
                     <Users
                        className={`w-4 h-4  ${
                           darkMode ? "text-orange-300" : "text-orange-600"
                        }`}
                     />
                  </div>
                  <span className={`text-sm font-semibold ${contStyle}`}>
                     {participantCount} Registered
                  </span>
               </div>
            </div>

            {/* Action Button */}
            <Link to={`./../camp-details/${_id}`}>
               <button className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center space-x-2">
                  <ListCollapse className="w-5 h-5" />
                  <span>View Details</span>
               </button>
            </Link>
         </div>
      </div>
   );
};

export default CampsCard;
