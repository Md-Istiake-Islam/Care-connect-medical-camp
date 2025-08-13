import { CheckCircle, Star } from "lucide-react";
import React from "react";

const ReqAndFacilities = () => {
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
         <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-slate-800 mb-4">
               Requirements
            </h3>
            <ul className="space-y-3">
               {requirements.map((requirement, index) => (
                  <li key={index} className="flex items-start space-x-3">
                     <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                     <span className="text-gray-700">{requirement}</span>
                  </li>
               ))}
            </ul>
         </div>

         {/* Facilities */}
         <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-slate-800 mb-4">
               What's Included
            </h3>
            <ul className="space-y-3">
               {facilities.map((facility, index) => (
                  <li key={index} className="flex items-start space-x-3">
                     <Star className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                     <span className="text-gray-700">{facility}</span>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   );
};

export default ReqAndFacilities;
