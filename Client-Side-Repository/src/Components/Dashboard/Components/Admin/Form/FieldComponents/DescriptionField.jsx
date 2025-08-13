import { FileText } from "lucide-react";
import React from "react";

const DescriptionField = ({
   errors,
   register,
   defaultValue,
   pStyle,
   darkMode,
}) => {
   return (
      <div className="mt-8">
         <label className="flex items-center justify-between mb-2">
            <div
               className={`flex items-center text-sm font-semibold ${pStyle}`}
            >
               <FileText className="w-4 h-4 mr-2 text-gray-600" />
               Description *
            </div>
            {errors.description && (
               <p className="text-red-500 text-sm pl-2">
                  {errors.description.message}
               </p>
            )}
         </label>
         <textarea
            {...register("description", { required: "**" })}
            rows="4"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
               darkMode
                  ? "bg-gray-600/20 hover:bg-gray-600/30 text-gray-300 border-gray-700"
                  : " bg-gray-50 focus:bg-white border-gray-300 hover:border-gray-400"
            }`}
            placeholder="Provide a detailed description of the medical camp, services offered, and any special instructions..."
            defaultValue={(defaultValue && defaultValue) || null}
         />
      </div>
   );
};

export default DescriptionField;
