import { Calendar, Clock, MapPin, Stethoscope, Users } from "lucide-react";
import React from "react";
import useFormatDate from "../../Hooks/useFormatDate";

const CampDetailCard = ({
   date,
   time,
   location,
   participantCount,
   healthPro,
   description,
}) => {
   const { formattedDate, formattedTime } = useFormatDate(date);
   return (
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
         <h2 className="text-2xl font-bold text-slate-800 mb-6">
            Camp Details
         </h2>

         <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Date & Time */}
            <div className="flex items-start space-x-4">
               <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-blue-600" />
               </div>
               <div>
                  <h3 className="font-semibold text-slate-800 mb-1">
                     Date & Time
                  </h3>
                  <div className="flex items-center gap-2">
                     <p className="text-sm text-gray-600 flex items-center mt-1">
                        <Clock className="w-4 h-4 mr-1" />
                        {formattedDate}
                     </p>
                     <p className="text-sm text-gray-600 flex items-center mt-1">
                        <Clock className="w-4 h-4 mr-1" />
                        {formattedTime}
                     </p>
                  </div>
               </div>
            </div>

            {/* Location */}
            <div className="flex items-start space-x-4">
               <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-green-600" />
               </div>
               <div>
                  <h3 className="font-semibold text-slate-800 mb-1">
                     Location
                  </h3>
                  <p className="text-gray-700 text-sm">{location}</p>
               </div>
            </div>

            {/* Healthcare Professional */}
            <div className="flex items-start space-x-4">
               <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-purple-600" />
               </div>
               <div>
                  <h3 className="font-semibold text-slate-800 mb-1">
                     Lead Healthcare Professional
                  </h3>
                  <p className="text-gray-700 font-medium text-sm">
                     {healthPro}
                  </p>
               </div>
            </div>

            {/* Participant Count */}
            <div className="flex items-start space-x-4">
               <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-orange-600" />
               </div>
               <div className="flex-1">
                  <h3 className="font-semibold text-slate-800 mb-1">
                     Participants
                  </h3>
                  <p className="text-gray-700 font-medium text-sm mb-2">
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
                  <p key={index} className="text-gray-700 leading-relaxed mb-4">
                     {paragraph}
                  </p>
               ))}
            </div>
         </div>
      </div>
   );
};

export default CampDetailCard;
