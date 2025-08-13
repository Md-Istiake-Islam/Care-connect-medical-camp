import { CheckCircle, Clock, XCircle } from "lucide-react";
import React from "react";

const GetStatusBadge = (status, type, darkMode) => {
   if (type === "payment") {
      return status === "paid" ? (
         <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold   ${
               darkMode
                  ? "bg-green-800/30 text-green-400"
                  : "bg-green-100 text-green-800"
            }`}
         >
            <CheckCircle className="w-3 h-3 mr-1" />
            Paid
         </span>
      ) : (
         <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold   ${
               darkMode
                  ? "bg-red-800/30 text-red-400"
                  : "bg-red-100 text-red-800"
            }`}
         >
            <XCircle className="w-3 h-3 mr-1" />
            Unpaid
         </span>
      );
   } else {
      return status === "confirmed" ? (
         <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold   ${
               darkMode
                  ? "bg-blue-800/30 text-blue-400"
                  : "bg-blue-100 text-blue-800"
            }`}
         >
            <CheckCircle className="w-3 h-3 mr-1" />
            Confirmed
         </span>
      ) : (
         <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold   ${
               darkMode
                  ? "bg-yellow-800/30 text-yellow-400"
                  : "bg-yellow-100 text-yellow-800"
            }`}
         >
            <Clock className="w-3 h-3 mr-1" />
            Pending
         </span>
      );
   }
};

export default GetStatusBadge;
