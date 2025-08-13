import { FileText } from "lucide-react";
import React from "react";

const CampNameField = ({ errors, register, pStyle, darkMode }) => {
   return (
      <div>
         <label className="mb-2 flex items-center justify-between">
            <div
               className={`flex items-center text-sm font-semibold ${pStyle}`}
            >
               <FileText className="w-4 h-4 mr-2 text-blue-600" />
               Camp Name *
            </div>
            <div>
               {errors.campName && (
                  <p className="text-red-500 text-sm pl-2">
                     {errors.campName.message}
                  </p>
               )}
            </div>
         </label>
         <input
            type="text"
            {...register("campName", { required: "**" })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-0  ${
               darkMode
                  ? "bg-gray-600/20 hover:bg-gray-600/30 text-gray-300 border-gray-700"
                  : " bg-gray-50 focus:bg-white border-gray-300 hover:border-gray-400"
            }`}
            placeholder="Enter medical camp name"
         />
      </div>
   );
};

export default CampNameField;
