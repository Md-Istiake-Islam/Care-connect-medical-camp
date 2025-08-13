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

const JoinCampModal = ({ isOpen, onClose, camp, setIsJoining }) => {
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

   return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
         <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-100">
            {/* Header */}
            <div className="sticky top-0 bg-white rounded-t-3xl border-b border-gray-100 p-6 z-10">
               <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                     <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                        <Heart className="w-6 h-6 text-white" />
                     </div>
                     <div>
                        <h2 className="text-2xl font-bold text-slate-800">
                           Join Medical Camp
                        </h2>
                        <p className="text-gray-600">
                           Complete your registration
                        </p>
                     </div>
                  </div>
                  <button
                     onClick={() => {
                        onClose(), setIsJoining(false);
                     }}
                     className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
                  >
                     <X className="w-5 h-5 text-gray-600" />
                  </button>
               </div>
            </div>

            {/* Content */}
            <div className="p-6">
               {/* Camp Information (Read-only) */}
               <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-6 mb-8 border border-blue-100">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">
                     Camp Details
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                     {/* Camp Name */}
                     <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                           <Heart className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                           <p className="text-sm text-gray-600 font-medium">
                              Camp Name
                           </p>
                           <p className="font-semibold text-slate-800">
                              {camp?.campName}
                           </p>
                        </div>
                     </div>

                     {/* Camp Fees */}
                     <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                           <DollarSign className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                           <p className="text-sm text-gray-600 font-medium">
                              Camp Fees
                           </p>
                           <p className="font-semibold text-slate-800">
                              {camp.campFees === 0
                                 ? "Free"
                                 : `${camp.campFees} Taka`}
                           </p>
                        </div>
                     </div>

                     {/* Location */}
                     <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                           <MapPin className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                           <p className="text-sm text-gray-600 font-medium">
                              Location
                           </p>
                           <p className="font-semibold text-slate-800">
                              {camp.location}
                           </p>
                        </div>
                     </div>

                     {/* Healthcare Professional */}
                     <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                           <Stethoscope className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                           <p className="text-sm text-gray-600 font-medium">
                              Healthcare Professional
                           </p>
                           <p className="font-semibold text-slate-800">
                              {camp.healthPro}
                           </p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Registration Form */}
               <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">
                     Your Information
                  </h3>

                  {/* Participant Name (Read-only) */}
                  <div>
                     <label className="block text-sm font-semibold text-slate-800 mb-2">
                        Participant Name
                     </label>
                     <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                           type="text"
                           value={userInfo?.name || user?.email?.split("@")[0]}
                           readOnly
                           className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-700 cursor-not-allowed"
                        />
                     </div>
                  </div>

                  {/* Participant Email (Read-only) */}
                  <div>
                     <label className="block text-sm font-semibold text-slate-800 mb-2">
                        Email Address
                     </label>
                     <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                           type="email"
                           value={user?.email || ""}
                           readOnly
                           className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-700 cursor-not-allowed"
                        />
                     </div>
                  </div>

                  {/* Age and Phone Number */}
                  <div className="grid md:grid-cols-2 gap-4">
                     <div>
                        <label className=" text-sm font-semibold text-slate-800 mb-2 flex items-center justify-between">
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
                              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                              placeholder="Enter your age"
                           />
                        </div>
                     </div>

                     <div>
                        <label className=" text-sm font-semibold text-slate-800 mb-2 flex items-center justify-between">
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
                              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                              placeholder="Enter phone number"
                           />
                        </div>
                     </div>
                  </div>

                  {/* Gender */}
                  <div>
                     <label className=" text-sm font-semibold text-slate-800 mb-2 flex items-center justify-between">
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
                           className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white appearance-none cursor-pointer"
                        >
                           <option value="">Select gender</option>
                           <option value="male">Male</option>
                           <option value="female">Female</option>
                           <option value="other">Other</option>
                        </select>
                     </div>
                  </div>

                  {/* Emergency Contact */}
                  <div>
                     <label className=" text-sm font-semibold text-slate-800 mb-2 flex items-center justify-between">
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
                           className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                           placeholder="Emergency contact number"
                        />
                     </div>
                     <p className="text-sm text-gray-600 mt-1">
                        Please provide a contact number for emergencies
                     </p>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="bg-gray-50 rounded-xl p-4">
                     <label className="flex items-start space-x-3 cursor-pointer">
                        <input
                           type="checkbox"
                           required
                           className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 mt-0.5"
                        />
                        <span className="text-sm text-gray-700 leading-relaxed">
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
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold transition-all duration-300"
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
