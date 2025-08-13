import React from "react";
import useFormatDate from "../../../Hooks/useFormatDate";
import { TbCurrencyTaka } from "react-icons/tb";
import { Calendar, Heart } from "lucide-react";

const PaymentTr = ({
   payment,
   GetStatusBadge,
   containerStyle,
   darkMode,
   pStyle,
   textHT,
}) => {
   // use formateDateTime hook;
   const dateObj = payment?.paymentDate;
   const { formattedDateTime } = useFormatDate(dateObj);
   return (
      <tr className={`${containerStyle}   transition-colors duration-200`}>
         <td className="px-6 py-4">
            <div>
               <h3 className={`font-semibold  mb-1 ${textHT}`}>
                  {payment.campName}
               </h3>
               <div className={`flex items-center space-x-4 text-sm ${pStyle}`}>
                  <div className="flex items-center space-x-1">
                     <Calendar className="w-4 h-4" />
                     <span>{formattedDateTime}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                     <Heart className="w-4 h-4" />
                     <span>{payment.campLocation}</span>
                  </div>
               </div>
            </div>
         </td>
         <td className="px-6 py-4">
            <span
               className={`font-semibold ${
                  payment.campFees === 0 ? "text-green-600" : pStyle
               }`}
            >
               {payment.campFees === 0 ? (
                  "Free"
               ) : (
                  <p className="flex items-center">
                     {payment.campFees}
                     <TbCurrencyTaka className="text-lg" />
                  </p>
               )}
            </span>
         </td>
         <td className="px-6 py-4">
            {GetStatusBadge(payment.paymentStatus, "payment", darkMode)}
         </td>
         <td className="px-6 py-4">
            {GetStatusBadge(payment.confirmationStatus, "confirmed", darkMode)}
         </td>
         <td className="px-6 py-4">
            <div className="text-sm">
               {payment.transactionId ? (
                  <>
                     <p className={`font-medium ${pStyle}`}>
                        Tr_ID: {payment.transactionId}
                     </p>
                     <p className={`${pStyle}`}>Date: {formattedDateTime}</p>
                     <p className={`${pStyle}`}>Method: Card</p>
                  </>
               ) : (
                  <span className={`${pStyle} italic`}>No transaction yet</span>
               )}
            </div>
         </td>
      </tr>
   );
};

export default PaymentTr;
