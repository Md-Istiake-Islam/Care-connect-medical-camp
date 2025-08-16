import React, { useState, useContext } from "react";
import {
   X,
   User,
   Mail,
   Phone,
   Calendar,
   Users,
   MapPin,
   Heart,
   Stethoscope,
   DollarSign,
} from "lucide-react";
import AuthContext from "../../Provider/AuthProvider/AuthContext";
import useUserInfo from "../../Hooks/useUserInfo";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useRegisterCamp from "../../Hooks/useRegisterCamp";
import { Toaster } from "react-hot-toast";

const JoinCampModal = ({
   isOpen,
   onClose,
   camp,
   setIsJoining,
   containerStyle,
   darkMode,
   pStyle,
   textHT,
}) => {
   // Context to get user data
   const { user } = useContext(AuthContext);
   const { userInfo } = useUserInfo();

   // Custom hook to register for a camp
   const { mutateAsync } = useRegisterCamp();

   // state to manage loading and success
   const [isLoading, setIsLoading] = useState(false);

   // Form handling
   const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
   } = useForm();

   // If modal is not open or camp data is not available, return null
   if (!isOpen || !camp) return null;

   const onSubmit = async (data) => {
      setIsLoading(true);

      const registeredCamp = {
         campId: camp._id,
         campName: camp.campName,
         campFees: camp.campFees,
         healthPro: camp.healthPro,
         campLocation: camp.location,
         participantName: userInfo.name,
         participantEmail: userInfo.email,
         campDate: camp.date,
         age: data.age,
         phone: data.phone,
         gender: data.gender,
         emergencyContact: data.emergencyContact,
      };

      // Simulate API call to register for the camp
      try {
         const res = await mutateAsync(registeredCamp);

         if (res.insertedId) {
            setIsLoading(false);
            Swal.fire({
               title: "Sign‑in successful",
               html: "<p class='swal-text'>Thank you for staying with us!</p>",
               icon: "success",
               draggable: true,
            });
            reset();
         }
      } catch (error) {
         Toaster.error(error.message || "Failed to join camp");
      } finally {
         setIsJoining(false);
         onClose();
      }
   };

   const titleStyle = darkMode ? "text-slate-300" : "text-slate-800";

   const inputStyle = darkMode
      ? "border-gray-600/50 bg-gray-700/30 text-gray-300 focus:700/40"
      : "border-gray-200 bg-gray-50 text-gray-700 focus:bg-white";

   const optionStyle = darkMode ? "bg-gray-800" : "bg-gray-50";

   return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
         <div
            className={`rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border ${containerStyle}`}
         >
            {/* Header */}
            <div
               className={`sticky top-0 rounded-t-3xl border-b p-6 z-10 ${containerStyle}`}
            >
               <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                     <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                        <Heart className="w-6 h-6 text-white" />
                     </div>
                     <div>
                        <h2 className={`text-2xl font-bold ${textHT}`}>
                           Join Medical Camp
                        </h2>
                        <p className={`${pStyle}`}>
                           Complete your registration
                        </p>
                     </div>
                  </div>
                  <button
                     onClick={() => {
                        onClose(), setIsJoining(false);
                     }}
                     className={`w-10 h-10  rounded-full flex items-center justify-center transition-colors duration-200 ${
                        darkMode
                           ? "bg-gray-700 hover:bg-gray-600"
                           : "bg-gray-100 hover:bg-gray-200"
                     }`}
                  >
                     <X
                        className={`w-5 h-5  ${
                           darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                     />
                  </button>
               </div>
            </div>

            {/* Content */}
            <div className="p-6">
               {/* Camp Information (Read-only) */}
               <div
                  className={`bg-gradient-to-br rounded-2xl p-6 mb-8 border ${
                     darkMode
                        ? "from-blue-900/30 to-green-900/30 border-blue-800/30"
                        : "from-blue-50 to-green-50 border-blue-100"
                  }`}
               >
                  <h3 className={`text-lg font-bold mb-4 ${textHT}`}>
                     Camp Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                     {/* Camp Name */}
                     <div className="flex items-center space-x-3">
                        <div
                           className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              darkMode ? "bg-blue-800/30" : "bg-blue-100"
                           }`}
                        >
                           <Heart
                              className={`w-5 h-5 ${
                                 darkMode ? "text-blue-300" : "text-blue-600"
                              }`}
                           />
                        </div>
                        <div>
                           <p className={`text-sm font-medium ${pStyle}`}>
                              Camp Name
                           </p>
                           <p className={`font-semibold ${titleStyle}`}>
                              {camp?.campName}
                           </p>
                        </div>
                     </div>

                     {/* Camp Fees */}
                     <div className="flex items-center space-x-3">
                        <div
                           className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              darkMode ? "bg-green-800/30" : "bg-green-100"
                           }`}
                        >
                           <DollarSign
                              className={`w-5 h-5 ${
                                 darkMode ? "text-green-300" : "text-green-600"
                              }`}
                           />
                        </div>
                        <div>
                           <p className={`text-sm font-medium ${pStyle}`}>
                              Camp Fees
                           </p>
                           <p className={`font-semibold ${titleStyle}`}>
                              {camp.campFees === 0
                                 ? "Free"
                                 : `${camp.campFees} Taka`}
                           </p>
                        </div>
                     </div>

                     {/* Location */}
                     <div className="flex items-center space-x-3">
                        <div
                           className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              darkMode ? "bg-purple-800/30" : "bg-purple-100"
                           }`}
                        >
                           <MapPin
                              className={`w-5 h-5 ${
                                 darkMode
                                    ? "text-purple-300"
                                    : "text-purple-600"
                              }`}
                           />
                        </div>
                        <div>
                           <p className={`text-sm font-medium ${pStyle}`}>
                              Location
                           </p>
                           <p className={`font-semibold ${titleStyle}`}>
                              {camp.location}
                           </p>
                        </div>
                     </div>

                     {/* Healthcare Professional */}
                     <div className="flex items-center space-x-3">
                        <div
                           className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              darkMode ? "bg-orange-800/30" : "bg-orange-100"
                           }`}
                        >
                           <Stethoscope
                              className={`w-5 h-5 ${
                                 darkMode
                                    ? "text-orange-300"
                                    : "text-orange-600"
                              }`}
                           />
                        </div>
                        <div>
                           <p className={`text-sm font-medium ${pStyle}`}>
                              Healthcare Professional
                           </p>
                           <p className={`font-semibold ${titleStyle}`}>
                              {camp.healthPro}
                           </p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Registration Form */}
               <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <h3 className={`text-lg font-bold mb-4 ${titleStyle}`}>
                     Your Information
                  </h3>

                  {/* Participant Name (Read-only) */}
                  <div>
                     <label
                        className={`block text-sm font-semibold mb-2 ${titleStyle}`}
                     >
                        Participant Name
                     </label>
                     <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                           type="text"
                           value={userInfo?.name || user?.email?.split("@")[0]}
                           readOnly
                           className={`w-full pl-12 pr-4 py-3 border rounded-xl cursor-not-allowed ${inputStyle}`}
                        />
                     </div>
                  </div>

                  {/* Participant Email (Read-only) */}
                  <div>
                     <label
                        className={`block text-sm font-semibold mb-2 ${titleStyle}`}
                     >
                        Email Address
                     </label>
                     <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                           type="email"
                           value={user?.email || ""}
                           readOnly
                           className={`w-full pl-12 pr-4 py-3 border rounded-xl cursor-not-allowed ${inputStyle}`}
                        />
                     </div>
                  </div>

                  {/* Age and Phone Number */}
                  <div className="grid md:grid-cols-2 gap-4">
                     <div>
                        <label
                           className={`text-sm font-semibold mb-2 flex items-center justify-between ${titleStyle}`}
                        >
                           Age *
                           {errors.age && (
                              <p className="text-red-500 text-sm pl-2">
                                 {errors.age.message}
                              </p>
                           )}
                        </label>
                        <div className="relative">
                           <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                           <input
                              type="number"
                              {...register("age", {
                                 required: "**",
                                 min: 1,
                              })}
                              className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 focus:outline-none ${inputStyle}`}
                              placeholder="Enter your age"
                           />
                        </div>
                     </div>

                     <div>
                        <label
                           className={`text-sm font-semibold mb-2 flex items-center justify-between ${titleStyle}`}
                        >
                           Phone Number *
                           {errors.phone && (
                              <p className="text-red-500 text-sm pl-2">
                                 {errors.phone.message}
                              </p>
                           )}
                        </label>
                        <div className="relative">
                           <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                           <input
                              type="tel"
                              {...register("phone", { required: "**" })}
                              className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 focus:outline-none  ${inputStyle}`}
                              placeholder="Enter phone number"
                           />
                        </div>
                     </div>
                  </div>

                  {/* Gender */}
                  <div>
                     <label
                        className={`text-sm font-semibold mb-2 flex items-center justify-between ${titleStyle}`}
                     >
                        Gender *
                        {errors.gender && (
                           <p className="text-red-500 text-sm pl-2">
                              {errors.gender.message}
                           </p>
                        )}
                     </label>
                     <div className="relative">
                        <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <select
                           {...register("gender", { required: "**" })}
                           className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer ${inputStyle}`}
                        >
                           <option className={`${optionStyle}`} value="">
                              Select gender
                           </option>
                           <option className={`${optionStyle}`} value="male">
                              Male
                           </option>
                           <option className={`${optionStyle}`} value="female">
                              Female
                           </option>
                           <option className={`${optionStyle}`} value="other">
                              Other
                           </option>
                        </select>
                     </div>
                  </div>

                  {/* Emergency Contact */}
                  <div>
                     <label
                        className={`text-sm font-semibold mb-2 flex items-center justify-between ${titleStyle}`}
                     >
                        Emergency Contact *
                        {errors.emergencyContact && (
                           <p className="text-red-500 text-sm pl-2">
                              {errors.emergencyContact.message}
                           </p>
                        )}
                     </label>
                     <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                           type="tel"
                           {...register("emergencyContact", { required: "**" })}
                           className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${inputStyle}`}
                           placeholder="Emergency contact number"
                        />
                     </div>
                     <p className={`text-sm mt-1 ${pStyle}`}>
                        Please provide a contact number for emergencies
                     </p>
                  </div>

                  {/* Terms and Conditions */}
                  <div className={`rounded-xl p-4 border ${inputStyle}`}>
                     <label className="flex items-start space-x-3 cursor-pointer">
                        <input
                           type="checkbox"
                           required
                           className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                        />
                        <span className={`text-sm leading-relaxed ${pStyle}`}>
                           I agree to the terms and conditions and understand
                           that I will receive further instructions via email. I
                           confirm that all information provided is accurate.
                        </span>
                     </label>
                  </div>

                  {/* Submit Button */}
                  <div className="flex space-x-4 pt-4">
                     <button
                        type="button"
                        onClick={() => {
                           onClose(), setIsJoining(false);
                        }}
                        className={`flex-1   py-3 rounded-xl font-semibold transition-all duration-300 ${
                           darkMode
                              ? "bg-gray-700/70 hover:bg-gray-600/50 text-gray-300"
                              : "bg-gray-200 hover:bg-gray-200 text-gray-700"
                        }`}
                     >
                        Cancel
                     </button>
                     <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-green-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                     >
                        {isLoading ? (
                           <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              <span>Joining Camp...</span>
                           </>
                        ) : (
                           <>
                              <Heart className="w-5 h-5" />
                              <span>Join Camp</span>
                           </>
                        )}
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default JoinCampModal;
