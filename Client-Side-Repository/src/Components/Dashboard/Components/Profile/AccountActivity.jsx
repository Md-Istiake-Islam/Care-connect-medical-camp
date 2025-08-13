import { Calendar, Clock } from "lucide-react";
import React from "react";
import useFormatDate from "../../../../Hooks/useFormatDate";

const AccountActivity = ({
   profileData,
   containerStyle,
   pStyle,
   textHT,
   darkMode,
}) => {
   const { formattedDate } = useFormatDate(profileData.joinedDate);
   const { formattedDateTime } = useFormatDate(profileData.lastLogin);

   return (
      <div className={` rounded-2xl shadow-lg p-6 border ${containerStyle}`}>
         <h3 className={`text-xl font-bold  mb-6 ${textHT}`}>
            Account Activity
         </h3>
         <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
               <Calendar className="w-5 h-5 text-blue-600" />
               <div>
                  <p className={`text-sm ${pStyle}`}>Member Since</p>
                  <p className={`font-medium ${textHT}`}>{formattedDate}</p>
               </div>
            </div>
            <div className="flex items-center space-x-3">
               <Clock className="w-5 h-5 text-green-600" />
               <div>
                  <p className={`text-sm ${pStyle}`}>Last Login</p>
                  <p className={`font-medium ${textHT}`}>{formattedDateTime}</p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default AccountActivity;
