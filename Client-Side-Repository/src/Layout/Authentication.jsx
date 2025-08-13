import React, { useEffect, useState } from "react";
import AuthHeader from "../Components/Shared/Authentication/AuthHeader";
import { Link, Outlet, useLocation } from "react-router";
import WelcomeToJoin from "../Components/Shared/Authentication/WelcomeToJoin";

const Authentication = () => {
   //Dynamic content based on location
   const location = useLocation();
   const [currentLocation, setCurrentLocation] = useState("login");

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
            <AuthHeader />
         </section>
         {/* Authentication page */}
         <section className="min-h-[calc(100vh-90px)] bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center">
            <div className="container lg:max-w-6xl mx-auto px-4 py-4">
               <div className="lg:bg-white rounded-3xl lg:shadow-2xl px-8 py-12 lg:border border-gray-100">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">
                     {/* Left Side - Image and Info */}
                     <div className="pt-1">
                        {<WelcomeToJoin currentLocation={currentLocation} />}
                     </div>
                     {/* Authentication form */}
                     <div>
                        <Outlet />
                     </div>
                  </div>
                  {/* Sign In Link */}
                  <div className="text-center mt-8 pt-6 border-t border-gray-100 hidden lg:block">
                     <p className="text-gray-600">
                        {currentLocation === "login"
                           ? "Don't have an account? "
                           : "Already have an account? "}
                        <Link
                           to={
                              currentLocation === "login"
                                 ? "/authentication/register"
                                 : "/authentication/login"
                           }
                           className="text-blue-600 hover:text-blue-700 font-semibold"
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
