import { Users } from "lucide-react";
import React from "react";

const ParticipantCountField = ({ errors, register, pStyle, darkMode }) => {
   return (
      <div>
         <label className="flex items-center justify-between mb-2">
            <div
               className={`flex items-center text-sm font-semibold ${pStyle}`}
            >
               <Users className="w-4 h-4 mr-2 text-orange-600" />
               Participant Count
            </div>
            {errors.participantCount && (
               <p className="text-red-500 text-sm pl-2">
                  {errors.participantCount.message}
               </p>
            )}
         </label>
         <input
            type="number"
            {...register("participantCount", {
               required: "**",
               valueAsNumber: true,
            })}
            min="0"
            className={`w-full px-4 py-3 border rounded-lg transition-all duration-200 outline-0 hover:cursor-not-allowed ${
               darkMode
                  ? "bg-gray-600/20  text-gray-300 border-gray-700"
                  : " bg-gray-50  border-gray-300 "
            }`}
            placeholder="0"
            defaultValue={0}
            readOnly
         />
         <p className="text-xs text-gray-500 mt-1">
            Starts at 0, will be updated as participants register
         </p>
      </div>
   );
};

export default ParticipantCountField;
