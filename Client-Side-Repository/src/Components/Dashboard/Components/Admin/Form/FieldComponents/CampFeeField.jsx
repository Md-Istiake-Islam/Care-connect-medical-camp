import { DollarSign } from "lucide-react";
import React from "react";

const CampFeeField = ({ errors, register, pStyle, darkMode }) => {
   return (
      <div>
         <label className="flex items-center justify-between mb-2">
            <div
               className={`flex items-center text-sm font-semibold ${pStyle}`}
            >
               <DollarSign className="w-4 h-4 mr-2 text-green-600" />
               Camp Fees *
            </div>
            {errors.campFees && (
               <p className="text-red-500 text-sm pl-2">
                  {errors.campFees.message}
               </p>
            )}
         </label>
         <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
               $
            </span>
            <input
               type="number"
               {...register("campFees", {
                  required: "**",
                  min: {
                     value: 0,
                     message: "Fee cannot be negative",
                  },
               })}
               min="0"
               className={`w-full pl-8 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-0  ${
                  darkMode
                     ? "bg-gray-600/20 hover:bg-gray-600/30 text-gray-300 border-gray-700"
                     : " bg-gray-50 focus:bg-white border-gray-300 hover:border-gray-400"
               }`}
               placeholder="0.00"
            />
         </div>
      </div>
   );
};

export default CampFeeField;
