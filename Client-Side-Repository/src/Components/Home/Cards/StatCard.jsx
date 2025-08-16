import React from "react";

const StatCard = ({ stat, containerStyle, textHT, pStyle }) => {
   const IconComponent = stat.icon;
   return (
      <div
         className={`rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group border ${containerStyle}`}
      >
         <div className="text-center">
            <div
               className={`inline-flex p-4 rounded-full bg-gradient-to-r ${stat.color} mb-4 group-hover:scale-110 transition-transform duration-300`}
            >
               <IconComponent className="h-8 w-8 text-white" />
            </div>

            <div className="mb-2">
               <div className={`text-2xl md:text-3xl font-bold mb-1 ${textHT}`}>
                  {stat.number}
               </div>
               <div className={`text-lg font-semibold mb-2 ${pStyle}`}>
                  {stat.label}
               </div>
            </div>
         </div>
      </div>
   );
};

export default StatCard;
