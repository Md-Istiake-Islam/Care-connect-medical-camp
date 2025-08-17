import React, { useContext, useEffect, useState } from "react";
import AuthHeader from "../Components/Shared/Authentication/AuthHeader";
import { Link, Outlet, useLocation } from "react-router";
import WelcomeToJoin from "../Components/Shared/Authentication/WelcomeToJoin";
import ThemeContext from "@/Provider/ThemeProvider/ThemeContext";

const Authentication = () => {
   //Dynamic content based on location
   const location = useLocation();
   const [currentLocation, setCurrentLocation] = useState("login");

   //get theme data from theme context
   const { darkMode } = useContext(ThemeContext);

   //set heading and title text style
   const textHT = darkMode ? "text-white" : "text-gray-900";

   //set paragraph style
   const pStyle = darkMode ? "text-gray-400" : "text-gray-600";

   //container style
   const containerStyle = darkMode
      ? "bg-gray-800 border-gray-700"
      : "bg-white border-gray-100";

   useEffect(() => {
      if (location.pathname === "/authentication/login") {
         setCurrentLocation("login");
      } else {
         setCurrentLocation("register");
      }
   }, [location, currentLocation]);

   return (
      <div>
         {/* Header */}
         <section className="sticky w-full z-20 top-0">
            <AuthHeader
               darkMode={darkMode}
               textHT={textHT}
               pStyle={pStyle}
               containerStyle={containerStyle}
            />
         </section>
         {/* Authentication page */}
         <section
            className={`min-h-[calc(100vh-81px)]  flex items-center justify-center ${
               darkMode ? "bg-gray-900" : "bg-gray-50"
            }`}
         >
            <div className="container lg:max-w-6xl mx-auto px-4 py-4">
               <div
                  className={`rounded-3xl lg:shadow-2xl px-8 py-12 lg:border ${containerStyle}`}
               >
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                     {/* Left Side - Image and Info */}
                     <div className="pt-1">
                        {
                           <WelcomeToJoin
                              currentLocation={currentLocation}
                              darkMode={darkMode}
                              textHT={textHT}
                              pStyle={pStyle}
                              containerStyle={containerStyle}
                           />
                        }
                     </div>
                     {/* Authentication form */}
                     <div>
                        <Outlet />
                     </div>
                  </div>
                  {/* Sign In Link */}
                  <div
                     className={`text-center mt-8 pt-6 border-t  hidden lg:block ${
                        darkMode ? "border-gray-600" : "border-gray-100"
                     }`}
                  >
                     <p className={`${pStyle}`}>
                        {currentLocation === "login"
                           ? "Don't have an account? "
                           : "Already have an account? "}
                        <Link
                           to={
                              currentLocation === "login"
                                 ? "/authentication/register"
                                 : "/authentication/login"
                           }
                           className={` font-semibold ${
                              darkMode
                                 ? "text-blue-400 hover:text-blue-400/80"
                                 : "text-blue-600 hover:text-blue-700"
                           } transition-colors duration-200`}
                        >
                           {currentLocation === "login"
                              ? "Create Account"
                              : "Sign In"}
                        </Link>
                     </p>
                  </div>
               </div>
            </div>
         </section>
      </div>
   );
};

export default Authentication;
