import { Calendar, CheckCircle, DollarSign, Star, User } from "lucide-react";
import React from "react";

const MngCampsStatusCard = ({
   campsRevenue,
   containerStyle,
   pStyle,
   textHT,
   darkMode,
}) => {
   return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
         <div className={`${containerStyle} rounded-2xl shadow-lg p-6 border `}>
            <div className="flex items-center space-x-3">
               <div
                  className={`${
                     darkMode ? "bg-blue-800/30" : "bg-blue-100"
                  } w-12 h-12  rounded-xl flex items-center justify-center`}
               >
                  <Calendar
                     className={`${
                        darkMode ? "text-blue-400" : "text-blue-600"
                     } w-6 h-6 `}
                  />
               </div>
               <div>
                  <p className={`${pStyle} text-sm`}>Total Camps</p>
                  <p className={`text-2xl font-bold ${textHT}`}>
                     {campsRevenue?.totalData}
                  </p>
               </div>
            </div>
         </div>

         <div className={`${containerStyle} rounded-2xl shadow-lg p-6 border `}>
            <div className="flex items-center space-x-3">
               <div
                  className={`${
                     darkMode ? "bg-orange-800/30" : "bg-orange-100"
                  } w-12 h-12 rounded-xl flex items-center justify-center`}
               >
                  <User
                     className={`${
                        darkMode ? "text-orange-400" : "text-orange-600"
                     } w-6 h-6 `}
                  />
               </div>
               <div>
                  <p className={`${pStyle} text-sm`}>Total Participant</p>
                  <p className={`text-2xl font-bold ${textHT}`}>
                     {campsRevenue?.totalParticipant}
                  </p>
               </div>
            </div>
         </div>

         <div className={`${containerStyle} rounded-2xl shadow-lg p-6 border `}>
            <div className="flex items-center space-x-3">
               <div
                  className={`${
                     darkMode ? "bg-purple-800/30" : "bg-purple-100"
                  } w-12 h-12 rounded-xl flex items-center justify-center`}
               >
                  <DollarSign
                     className={`${
                        darkMode ? "text-purple-400" : "text-purple-600"
                     } w-6 h-6 `}
                  />
               </div>
               <div>
                  <p className={`${pStyle} text-sm`}>Revenue</p>
                  <p className={`text-2xl font-bold ${textHT}`}>
                     {campsRevenue?.totalRevenue}
                  </p>
               </div>
            </div>
         </div>

         <div className={`${containerStyle} rounded-2xl shadow-lg p-6 border `}>
            <div className="flex items-center space-x-3">
               <div
                  className={`${
                     darkMode ? "bg-green-800/30" : "bg-green-100"
                  } w-12 h-12  rounded-xl flex items-center justify-center`}
               >
                  <CheckCircle
                     className={`${
                        darkMode ? "text-green-400" : "text-green-600"
                     } w-6 h-6 `}
                  />
               </div>
               <div>
                  <p className={`${pStyle} text-sm`}>Confirmed</p>
                  <p className={`text-2xl font-bold ${textHT}`}>
                     {campsRevenue?.totalConfirm}
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default MngCampsStatusCard;
