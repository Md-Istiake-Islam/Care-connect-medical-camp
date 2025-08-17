import React from "react";
import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { LuLogIn } from "react-icons/lu";

const AuthHeader = ({ darkMode, textHT, pStyle, containerStyle }) => {
   return (
      <div
         className={` backdrop-blur-sm shadow-sm border-b  ${
            darkMode
               ? "bg-gray-900/99 border-gray-800"
               : "border-gray-100 bg-white/80"
         }`}
      >
         <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
               {/* Logo */}
               <div className="flex items-center space-x-3">
                  <div className="relative w-12 h-12 bg-gradient-to-br from-blue-600 via-teal-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                     <div className="">
                        <LuLogIn className="text-white text-2xl font-bold -translate-x-0.5" />
                     </div>
                  </div>
                  <div>
                     <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-green-600 bg-clip-text text-transparent">
                        Sign in
                     </h1>
                     <p className={`text-sm font-medium ${pStyle}`}>
                        To unlock full features
                     </p>
                  </div>
               </div>

               {/* Back to Home */}
               <Link
                  to="/"
                  className={`flex items-center space-x-2  transition-colors duration-300 ${
                     darkMode
                        ? "text-gray-400 hover:text-slate-300"
                        : "text-gray-600 hover:text-slate-800"
                  }`}
               >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="font-medium">Back to Home</span>
               </Link>
            </div>
         </div>
      </div>
   );
};

export default AuthHeader;
