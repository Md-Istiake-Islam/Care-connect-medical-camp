import { Award, Edit3, Heart, Star } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const QuickActions = ({ containerStyle, pStyle, textHT, darkMode }) => {
   return (
      <div className={` rounded-2xl shadow-lg p-6 border ${containerStyle}`}>
         <h3 className={`text-xl font-bold  mb-6 ${textHT}`}>Quick Actions</h3>
         <div className="space-y-3">
            <Link
               to={`/dashboard/update-profile`}
               className={`w-full   py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center space-x-3 ${
                  darkMode
                     ? "bg-blue-800/30 hover:bg-blue-800/50 text-blue-400"
                     : "bg-blue-50 hover:bg-blue-100 text-blue-700"
               }`}
            >
               <Edit3 className="w-5 h-5" />
               <span>Update Profile</span>
            </Link>
            <Link
               to={"/dashboard/registered-camps"}
               className={`w-full   py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center space-x-3 ${
                  darkMode
                     ? "bg-green-800/30 hover:bg-green-800/50 text-green-400"
                     : "bg-green-50 hover:bg-green-100 text-green-700"
               }`}
            >
               <Heart className="w-5 h-5" />
               <span>My Camps</span>
            </Link>
            <Link
               to="/dashboard/payment-history"
               className={`w-full   py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center space-x-3 ${
                  darkMode
                     ? "bg-purple-800/30 hover:bg-purple-800/50 text-purple-400"
                     : "bg-purple-50 hover:bg-purple-100 text-purple-700"
               }`}
            >
               <Award className="w-5 h-5" />
               <span>Payment History</span>
            </Link>
         </div>
      </div>
   );
};

export default QuickActions;
