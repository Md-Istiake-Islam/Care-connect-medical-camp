import {
   Calendar,
   CheckCircle,
   Clock,
   MapPin,
   Trash2,
   User,
} from "lucide-react";
import { TbCurrencyTaka } from "react-icons/tb";
import useFormatDate from "../../../../Hooks/useFormatDate";

const RegCampTr = ({
   camp,
   GetStatusBadge,
   handleCancel,
   handleConfirm,
   containerStyle,
   darkMode,
   pStyle,
   textHT,
}) => {
   // use formateDateTime hook;
   const dateObj = camp?.registeredDate;
   const { formattedDateTime } = useFormatDate(dateObj);

   return (
      <tr className={`${containerStyle}   transition-colors duration-200`}>
         <td className="px-6 py-4">
            <div>
               <h3 className={`font-semibold  mb-1 ${textHT}`}>
                  {camp.campName}
               </h3>
               <div className={`flex items-center space-x-4 text-sm ${pStyle}`}>
                  <div className="flex items-center space-x-1">
                     <Calendar className="w-4 h-4" />
                     <span>{formattedDateTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                     <MapPin className="w-4 h-4" />
                     <span>{camp.campLocation}</span>
                  </div>
               </div>
            </div>
         </td>
         <td className="px-6 py-4">
            <div className="flex items-center space-x-2">
               <User className="w-4 h-4 text-gray-400" />
               <span className={`font-medium ${textHT}`}>
                  {camp.participantName}
               </span>
            </div>
         </td>
         <td className="px-6 py-4">
            <span
               className={`font-semibold ${
                  camp.campFees === 0 ? "text-green-600" : pStyle
               }`}
            >
               {camp.campFees === 0 ? (
                  "Free"
               ) : (
                  <p className="flex items-center">
                     {camp.campFees}
                     <TbCurrencyTaka className="text-lg" />
                  </p>
               )}
            </span>
         </td>
         <td className="px-6 py-4">
            {GetStatusBadge(camp.paymentStatus, "payment", darkMode)}
         </td>
         <td className="px-6 py-4">
            {camp.confirmationStatus === "confirmed" ? (
               <button
                  className={`flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                     darkMode
                        ? "bg-blue-800/30 text-blue-400"
                        : "bg-blue-100 text-blue-800"
                  }`}
               >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Confirmed
               </button>
            ) : (
               <button
                  onClick={() => handleConfirm(camp)}
                  className={`flex items-center px-3 py-1 rounded-full text-xs font-semibold  hover:scale-[1.03] transition-all duration-200  ${
                     darkMode
                        ? "bg-yellow-800/30 text-yellow-400 hover:bg-yellow-800/60"
                        : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                  }`}
               >
                  <Clock className="w-3 h-3 mr-1" />
                  Pending
               </button>
            )}
         </td>
         <td className="px-6 py-4">
            <div className="flex items-center space-x-2">
               {/* Cancel Button */}
               {
                  <button
                     disabled={
                        camp.confirmationStatus === "confirmed" &&
                        camp.paymentStatus === "paid"
                     }
                     onClick={() => handleCancel(camp)}
                     className=" bg-red-600 hover:bg-red-700 hover:scale-[1.03] disabled:hover:scale-[1] transition-all duration-200 text-white px-3 py-1 rounded-lg text-sm font-medium flex items-center space-x-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                     <Trash2 className="w-3 h-3" />
                     <span>Cancel</span>
                  </button>
               }
            </div>
         </td>
      </tr>
   );
};

export default RegCampTr;
