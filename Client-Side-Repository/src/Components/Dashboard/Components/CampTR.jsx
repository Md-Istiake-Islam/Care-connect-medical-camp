import {
   Calendar,
   CreditCard,
   MapPin,
   MessageSquare,
   Star,
   Trash2,
   User,
} from "lucide-react";
import useFormatDate from "../../../Hooks/useFormatDate";
import { TbCurrencyTaka } from "react-icons/tb";

const CampTR = ({
   camp,
   GetStatusBadge,
   handlePayment,
   handleFeedback,
   handleCancel,
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
            {GetStatusBadge(camp.confirmationStatus, "confirmation", darkMode)}
         </td>
         <td className="px-6 py-4">
            <div className="flex items-center space-x-2">
               {/* Payment Button */}
               {camp.paymentStatus === "unpaid" && camp.campFees > 0 && (
                  <button
                     onClick={() => handlePayment(camp)}
                     className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-1"
                  >
                     <CreditCard className="w-3 h-3" />
                     <span>Pay</span>
                  </button>
               )}

               {/* Feedback Button */}
               {camp.paymentStatus === "paid" && !camp.feedbackGiven && (
                  <button
                     onClick={() => handleFeedback(camp)}
                     className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-1"
                  >
                     <MessageSquare className="w-3 h-3" />
                     <span>Feedback</span>
                  </button>
               )}

               {/* View Feedback */}
               {camp.feedbackGiven && (
                  <div
                     className={`flex items-center space-x-1 text-sm ${pStyle} `}
                  >
                     <Star className="w-3 h-3 text-yellow-400 fill-current" />
                     <span>{camp.rating}/5</span>
                  </div>
               )}

               {/* Cancel Button */}
               {camp.canCancel && (
                  <button
                     onClick={() => handleCancel(camp)}
                     className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-1"
                  >
                     <Trash2 className="w-3 h-3" />
                     <span>Cancel</span>
                  </button>
               )}
            </div>
         </td>
      </tr>
   );
};

export default CampTR;
