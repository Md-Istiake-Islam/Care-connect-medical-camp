import Lottie from "lottie-react";
import { User } from "lucide-react";
import React from "react";
import loginAnimation from "../../../assets/Animation/Login-animation.json";

const WelcomeToJoin = ({ currentLocation }) => {
   return (
      <div className="hidden lg:flex flex-col justify-center">
         {/* Header */}
         <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
               <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
               Welcome Back
            </h2>
            <p className="text-gray-600">
               {currentLocation === "login"
                  ? "Sign in to join medical camps and make a difference"
                  : "Create your account to start making a difference in healthcare"}
            </p>
         </div>

         <div className="w-full flex justify-center">
            <div className="w-sm flex">
               <Lottie animationData={loginAnimation} />
            </div>
         </div>
      </div>
   );
};

export default WelcomeToJoin;
