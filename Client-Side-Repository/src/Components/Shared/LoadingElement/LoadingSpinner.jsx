import { Heart } from "lucide-react";
import React, { useContext } from "react";
import ThemeContext from "../../../Provider/ThemeProvider/ThemeContext";

const LoadingSpinner = () => {
   //get theme data from theme context
   const { theme } = useContext(ThemeContext);

   return (
      <div
         className={`min-h-screen flex items-center justify-center fixed top-0 left-0 w-full z-[9999] ${
            theme === "dark" ? "bg-gray-800" : "bg-gray-50"
         }`}
      >
         <div className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-4">
               {/* Spinning ring */}
               <div
                  className={`absolute inset-0 border-4  rounded-full ${
                     theme === "dark" ? "border-gray-600" : "border-gray-200"
                  }`}
               ></div>
               <div className="absolute inset-0 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>

               {/* Medical icon in center */}
               <div className="absolute inset-0 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-green-500 animate-pulse" />
               </div>
            </div>

            <h3
               className={`text-lg font-semibold  mb-2 ${
                  theme === "dark" ? "text-slate-200" : "text-slate-800"
               }`}
            >
               Loading CareConnect
            </h3>
            <p
               className={`${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
               }`}
            >
               Preparing your medical camp experience...
            </p>
         </div>
      </div>
   );
};

export default LoadingSpinner;
