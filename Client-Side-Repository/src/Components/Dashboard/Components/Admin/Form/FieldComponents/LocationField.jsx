import { MapPin } from "lucide-react";
import React from "react";

const LocationField = ({ errors, register, pStyle, darkMode }) => {
   return (
      <div>
         <label className="flex items-center justify-between mb-2">
            <div
               className={`flex items-center text-sm font-semibold ${pStyle}`}
            >
               <MapPin className="w-4 h-4 mr-2 text-red-600" />
               Location *
            </div>
            {errors.location && (
               <p className="text-red-500 text-sm pl-2">
                  {errors.location.message}
               </p>
            )}
         </label>
         <input
            type="text"
            {...register("location", { required: "**" })}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-0  ${
               darkMode
                  ? "bg-gray-600/20 hover:bg-gray-600/30 text-gray-300 border-gray-700"
                  : " bg-gray-50 focus:bg-white border-gray-300 hover:border-gray-400"
            }`}
            placeholder="Enter camp location"
         />
      </div>
   );
};

export default LocationField;
