import React from "react";
import * as LucideIcons from "lucide-react";

const StepCard = ({ step, darkMode, containerStyle, pStyle, textHT }) => {
   const IconComponent = LucideIcons[step.icon];
   return (
      <div
         className={`rounded-xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border ${containerStyle}`}
      >
         <div className="flex items-center mb-4">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mr-4">
               <IconComponent className="h-6 w-6 text-white" />
            </div>
            <div>
               <div
                  className={`text-sm font-semibold ${
                     darkMode ? "text-blue-400" : "text-blue-600"
                  }`}
               >
                  Step {step.step}
               </div>
               <h3 className={`text-xl font-bold ${textHT}`}>{step.title}</h3>
            </div>
         </div>

         <p className={`line-clamp-3 mb-4 leading-relaxed ${pStyle}`}>
            {step.description}
         </p>

         <div className="grid grid-cols-2 gap-2">
            {step.details.map((detail, idx) => (
               <div
                  key={idx}
                  className={`flex items-center text-sm ${
                     darkMode ? "text-gray-300" : "text-gray-600"
                  }`}
               >
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                  {detail}
               </div>
            ))}
         </div>
      </div>
   );
};

export default StepCard;
