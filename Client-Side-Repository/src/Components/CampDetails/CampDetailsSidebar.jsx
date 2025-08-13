import { CheckCircle, Heart, Mail, Phone, User } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import useUserInfo from "../../Hooks/useUserInfo";

const CampDetailsSidebar = ({
   campFees,
   organizer,
   user,
   isJoining,
   handleJoinCamp,
   hasJoined,
}) => {
   const { role } = useUserInfo();
   return (
      <div className="sticky top-36  space-y-6">
         <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 ">
            <div className="text-center mb-6">
               <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Heart className="w-8 h-8 text-white" />
               </div>
               <h3 className="text-2xl font-bold text-slate-800 mb-2">
                  Join This Camp
               </h3>
               <p className="text-gray-600">Make a difference in healthcare</p>
            </div>

            {/* Fee Information */}
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
               {
                  <div className="flex items-center justify-between">
                     <span className="text-gray-700 font-medium">
                        Camp Fee:
                     </span>
                     <span
                        className={`text-2xl font-bold ${
                           campFees === 0 ? "text-green-600" : "text-slate-800"
                        }`}
                     >
                        {campFees === 0 ? "Free" : `${campFees} Taka`}
                     </span>
                  </div>
               }
            </div>

            {/* Join Button */}
            {hasJoined ? (
               <div className="w-full bg-green-100 border-2 border-green-300 text-green-700 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2">
                  <CheckCircle className="w-5 h-5" />
                  <span>Already Joined!</span>
               </div>
            ) : (
               <button
                  onClick={handleJoinCamp}
                  disabled={isJoining || !user || role === "Organizer"}
                  className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
               >
                  {isJoining ? (
                     <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Joining...</span>
                     </>
                  ) : (
                     <>
                        <Heart className="w-5 h-5" />
                        <span>Join This Camp</span>
                     </>
                  )}
               </button>
            )}

            {role === "Organizer" && (
               <p className="text-sm text-gray-600 text-center mt-3">
                  Only Participant can join this camp
               </p>
            )}
            {!user && (
               <p className="text-sm text-gray-600 text-center mt-3">
                  <Link
                     to="./../../authentication/login"
                     className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                     Sign in
                  </Link>{" "}
                  to join this camp
               </p>
            )}
         </div>

         {/* Contact Information */}
         <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-bold text-slate-800 mb-4">
               Contact With Organizer
            </h3>
            <div className="space-y-4">
               <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                     <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                     <p className="text-xs text-gray-600">Name</p>
                     <p className="font-medium text-slate-800">
                        {organizer?.name}
                     </p>
                  </div>
               </div>
               <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                     <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                     <p className="text-xs text-gray-600">Phone</p>
                     <p className="font-medium text-slate-800">
                        {organizer?.phone}
                     </p>
                  </div>
               </div>
               <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                     <Mail className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                     <p className="text-xs text-gray-600">Email</p>
                     <p className="font-medium text-slate-800">
                        {organizer?.email}
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default CampDetailsSidebar;
