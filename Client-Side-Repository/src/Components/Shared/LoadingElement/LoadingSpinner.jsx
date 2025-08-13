import { Heart } from "lucide-react";
import React from "react";

const LoadingSpinner = () => {
   return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center fixed top-0 left-0 w-full z-[9999]">
         <div className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-4">
               {/* Spinning ring */}
               <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
               <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>

               {/* Medical icon in center */}
               <div className="absolute inset-0 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-green-500 animate-pulse" />
               </div>
            </div>

            <h3 className="text-lg font-semibold text-slate-800 mb-2">
               Loading CareConnect
            </h3>
            <p className="text-gray-600">
               Preparing your medical camp experience...
            </p>
         </div>
      </div>
   );
};

export default LoadingSpinner;
