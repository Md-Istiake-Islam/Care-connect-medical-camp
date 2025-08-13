import { CheckCircle, DollarSign, Receipt, XCircle } from "lucide-react";
import React from "react";
import { TbCurrencyTaka } from "react-icons/tb";

const PaymentStatusCard = ({
   pmtRevenue,
   containerStyle,
   pStyle,
   textHT,
   darkMode,
}) => {
   return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
         <div className={`${containerStyle} rounded-2xl shadow-lg p-6 border `}>
            <div className="flex items-center space-x-3">
               <div
                  className={`${
                     darkMode ? "bg-blue-800/30" : "bg-blue-100"
                  } w-12 h-12  rounded-xl flex items-center justify-center`}
               >
                  <Receipt
                     className={`${
                        darkMode ? "text-blue-400" : "text-blue-600"
                     } w-6 h-6 `}
                  />
               </div>
               <div>
                  <p className={`${pStyle} text-sm`}>Total Transactions</p>
                  <p className={`text-2xl font-bold ${textHT}`}>
                     {pmtRevenue?.totalData}
                  </p>
               </div>
            </div>
         </div>

         <div className={`${containerStyle} rounded-2xl shadow-lg p-6 border `}>
            <div className="flex items-center space-x-3">
               <div
                  className={`${
                     darkMode ? "bg-purple-800/30" : "bg-purple-100"
                  } w-12 h-12 rounded-xl flex items-center justify-center`}
               >
                  <CheckCircle
                     className={`${
                        darkMode ? "text-purple-400" : "text-purple-600"
                     } w-6 h-6 `}
                  />
               </div>
               <div>
                  <p className={`${pStyle} text-sm`}>Paid Transactions</p>
                  <p className={`text-2xl font-bold ${textHT}`}>
                     {pmtRevenue?.totalPaid}
                  </p>
               </div>
            </div>
         </div>

         <div className={`${containerStyle} rounded-2xl shadow-lg p-6 border `}>
            <div className="flex items-center space-x-3">
               <div
                  className={`${
                     darkMode ? "bg-green-800/30" : "bg-green-100"
                  } w-12 h-12  rounded-xl flex items-center justify-center`}
               >
                  <CheckCircle
                     className={`${
                        darkMode ? "text-green-400" : "text-green-600"
                     } w-6 h-6 `}
                  />
               </div>
               <div>
                  <p className={`${pStyle} text-sm`}>Confirmed</p>
                  <p className={`text-2xl font-bold ${textHT}`}>
                     {pmtRevenue?.totalConfirmed}
                  </p>
               </div>
            </div>
         </div>
         <div className={`${containerStyle} rounded-2xl shadow-lg p-6 border `}>
            <div className="flex items-center space-x-3">
               <div
                  className={`${
                     darkMode ? "bg-orange-800/30" : "bg-orange-100"
                  } w-12 h-12 rounded-xl flex items-center justify-center`}
               >
                  <DollarSign
                     className={`${
                        darkMode ? "text-orange-400" : "text-orange-600"
                     } w-6 h-6 `}
                  />
               </div>
               <div>
                  <p className={`${pStyle} text-sm`}>Total Amount Paid</p>
                  <p
                     className={`text-2xl font-bold flex items-center ${textHT}`}
                  >
                     {pmtRevenue?.totalPaidAmount}
                     <TbCurrencyTaka className="text-2xl" />
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
};

export default PaymentStatusCard;
