import { CheckCircle, Star } from "lucide-react";
import React from "react";

const ReqAndFacilities = ({ containerStyle, darkMode, pStyle, textHT }) => {
   const requirements = [
      "Age 16+ for emergency training",
      "Physical fitness for practical training",
      "Valid ID for certification",
      "Commitment to attend all sessions",
   ];

   const facilities = [
      "Emergency response training",
      "First aid certification",
      "Medical equipment access",
      "Training materials",
      "Certificate of completion",
   ];
   return (
      <div className="grid md:grid-cols-2 gap-6">
         {/* Requirements */}
         <div className={`rounded-2xl shadow-lg p-6 border ${containerStyle}`}>
            <h3 className={`text-xl font-bold mb-4 ${textHT}`}>Requirements</h3>
            <ul className="space-y-3">
               {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start space-x-3">
                     <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                     <span className={`${pStyle}`}>{requirement}</span>
                  </li>
               ))}
            </ul>
         </div>

         {/* Facilities */}
         <div className={`rounded-2xl shadow-lg p-6 border ${containerStyle}`}>
            <h3 className={`text-xl font-bold mb-4 ${textHT}`}>
               What's Included
            </h3>
            <ul className="space-y-3">
               {facilities.map((facility, index) => (
                  <li key={index} className="flex items-start space-x-3">
                     <Star className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                     <span className={`${pStyle}`}>{facility}</span>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   );
};

export default ReqAndFacilities;
