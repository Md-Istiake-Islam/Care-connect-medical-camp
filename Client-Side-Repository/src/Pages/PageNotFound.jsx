import React, { useContext } from "react";
import { useNavigate } from "react-router";
import useTitle from "../Hooks/useTitle";
import ThemeContext from "../Provider/ThemeProvider/ThemeContext";
import { AlertTriangle, Heart, ArrowLeft, RefreshCw } from "lucide-react";

const PageNotFound = () => {
   //page title
   useTitle("Page not found");
   const navigate = useNavigate();

   const { darkMode } = useContext(ThemeContext);

   const dotStyle = darkMode ? "bg-blue-800" : "bg-blue-200";

   return (
      <div>
         <div
            className={`min-h-screen bg-gradient-to-br flex items-center justify-center px-6 transition-colors duration-300 ${
               darkMode
                  ? "from-gray-900 to-blue-950/95"
                  : "from-gray-50 to-blue-50"
            }`}
         >
            <div className="max-w-2xl mx-auto text-center">
               {/* Error Illustration */}
               <div className="relative mb-8">
                  <div
                     className={`inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r  rounded-full mb-6 ${
                        darkMode
                           ? "from-blue-900/30 to-green-900/30"
                           : "from-blue-100 to-green-100"
                     }`}
                  >
                     <div className="relative">
                        <AlertTriangle
                           className={`h-16 w-16  ${
                              darkMode ? "text-blue-400" : "text-blue-600"
                           }`}
                        />
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                           <Heart className="h-4 w-4 text-white" />
                        </div>
                     </div>
                  </div>

                  {/* Floating medical icons */}
                  <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                     <div
                        className={`absolute top-4 left-8 w-6 h-6 rounded-full opacity-60 animate-pulse ${dotStyle}`}
                     ></div>
                     <div
                        className={`absolute top-12 right-12 w-4 h-4 rounded-full opacity-40 animate-pulse delay-300 ${dotStyle}`}
                     ></div>
                     <div
                        className={`absolute bottom-8 left-16 w-5 h-5 rounded-full opacity-50 animate-pulse delay-700 ${dotStyle}`}
                     ></div>
                     <div
                        className={`absolute bottom-16 right-8 w-3 h-3 rounded-full opacity-60 animate-pulse delay-500 ${dotStyle}`}
                     ></div>
                  </div>
               </div>

               {/* Error Code */}
               <div className="mb-6">
                  <h1 className="text-8xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600 mb-2">
                     404
                  </h1>
                  <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-green-600 mx-auto rounded-full"></div>
               </div>

               {/* Error Message */}
               <div className="mb-8">
                  <h2
                     className={`text-2xl md:text-3xl font-bold mb-4 ${
                        darkMode ? "text-white" : "text-gray-800"
                     }`}
                  >
                     Page Not Found
                  </h2>
                  <p
                     className={`text-base max-w-md mx-auto leading-relaxed ${
                        darkMode ? "text-gray-300" : "text-gray-600"
                     }`}
                  >
                     "Oops! Something went wrong. The page you’re looking for
                     doesn’t exist or has been moved."
                  </p>
               </div>

               {/* Action Buttons */}
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                     onClick={() => navigate("/")}
                     className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 transition-all duration-300 font-semibold transform hover:scale-105 shadow-lg"
                  >
                     <ArrowLeft className="h-5 w-5 mr-2" />
                     Back to Home
                  </button>

                  <button
                     onClick={() => window.location.reload()}
                     className={`inline-flex items-center px-8 py-3 border-2 border-blue-600 dark:border-blue-400 rounded-lg hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900 transition-all duration-300 font-semibold transform hover:scale-105 ${
                        darkMode ? "text-blue-400" : "text-blue-600"
                     }`}
                  >
                     <RefreshCw className="h-5 w-5 mr-2" />
                     Try Again
                  </button>
               </div>

               {/* Care Camp Branding */}
               <div className="mt-8">
                  <div className="flex items-center justify-center space-x-3 text-gray-500 dark:text-gray-400">
                     <div className="p-2 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg">
                        <Heart className="h-4 w-4 text-white" />
                     </div>
                     <span
                        className={`text-sm font-medium ${
                           darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                     >
                        Care Camp Medical Services
                     </span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default PageNotFound;
