import React from "react";

const StatCard = ({ stat }) => {
   const IconComponent = stat.icon;
   return (
      <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
         <div className="text-center">
            <div
               className={`inline-flex p-4 rounded-full bg-gradient-to-r ${stat.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
            >
               <IconComponent className="h-8 w-8 text-white" />
            </div>

            <div className="mb-2">
               <div className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                  {stat.number}
               </div>
               <div className="text-lg font-semibold text-gray-700 mb-2">
                  {stat.label}
               </div>
            </div>
         </div>
      </div>
   );
};

export default StatCard;
