import React, { useContext, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useUploadImgToImgBB } from "../../../../../Hooks/useUploadImgToImgBB";
import Swal from "sweetalert2";
import axiosSecure from "../../../../../Utility/axiosSecure";
import useTitle from "../../../../../Hooks/useTitle";
import "react-datepicker/dist/react-datepicker.css";
import CampNameField from "./FieldComponents/campNameField";
import HealthProField from "./FieldComponents/HealthProField";
import CampFeeField from "./FieldComponents/CampFeeField";
import LocationField from "./FieldComponents/LocationField";
import ParticipantCountField from "./FieldComponents/ParticipantCountField";
import ImageField from "./FieldComponents/ImageField";
import DateTimeField from "./FieldComponents/DateTimeField";
import DescriptionField from "./FieldComponents/DescriptionField";
import useUserInfo from "../../../../../Hooks/useUserInfo";
import { useParams } from "react-router";
import { useCampDetails } from "../../../../../Hooks/useCampDetails";
import LoadingSpinner from "../../../../Shared/LoadingElement/LoadingSpinner";
import useUpdateCamp from "../../../../../Hooks/useUpdateCamp";
import ThemeContext from "../../../../../Provider/ThemeProvider/ThemeContext";

const UpdateCamp = () => {
   //scroll to top
   useTitle("Update Camp || CareConnect Medical Camp");

   // get organizer from auth context
   const { userInfo } = useUserInfo();

   const { theme } = useContext(ThemeContext);
   const [darkMode, setDarkMode] = useState(false);

   // set theme
   useEffect(() => {
      setDarkMode(theme === "dark" ? true : false);
   }, [setDarkMode, theme, darkMode]);

   // set container style
   const containerStyle = darkMode
      ? "bg-gray-800 border-gray-700"
      : "bg-white border-gray-200";

   //set paragraph style
   const pStyle = darkMode ? "text-gray-400" : "text-gray-600";

   // get update camp ID
   const { id } = useParams();

   // Fetch camp details using the custom hook
   const { camp, isLoading: isCampLoading, error } = useCampDetails({ id });
   const { mutateAsync } = useUpdateCamp(id);

   //use react hook form
   const {
      register,
      handleSubmit,
      watch,
      resetField,
      reset,
      clearErrors,
      formState: { errors },
      control,
   } = useForm({
      defaultValues: {
         campName: "",
         healthPro: "",
         campFees: "",
         location: "",
         participantCount: "",
         imageUrl: "",
         description: "",
         dateObj: null,
      },
   });

   // hooks for image upload
   const {
      uploadImage,
      loading: imageLoading,
      error: imgError,
   } = useUploadImgToImgBB();

   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      if (!camp || isCampLoading) return;

      reset({
         campName: camp.campName,
         healthPro: camp.healthPro,
         campFees: camp.campFees,
         location: camp.location,
         participantCount: camp.participantCount,
         image: null,
         description: camp.description,
         dateObj: new Date(camp.date),
      });
   }, [camp, reset]);

   if (!camp || isCampLoading) {
      return <LoadingSpinner />;
   }

   // handle on submit stage
   const onSubmit = async ({
      campName,
      healthPro,
      campFees,
      location,
      participantCount,
      image,
      dateObj,
      description,
   }) => {
      try {
         setIsLoading(true);

         //Upload the image
         const file = image?.[0];
         let imageUrl = camp.imageUrl;
         console.log("imageUrl 3");

         if (file) {
            imageUrl = await uploadImage(file);
         }

         // guard for check if image upload failed
         if (!imageUrl) {
            Swal.fire({
               title: "Failed to upload Image! Try again",
               html: `<p class='swal-text'>${imgError}</p>`,
               icon: "error",
               draggable: true,
            });
            return;
         }

         const campData = {
            campName,
            healthPro,
            campFees,
            location,
            participantCount,
            imageUrl,
            description,
            date: dateObj,
            organizer: {
               name: userInfo?.name,
               email: userInfo?.email,
               phone: userInfo?.Phone,
            },
         };

         // patch camp data to server
         const res = await mutateAsync(campData);

         // check if camp data is posted successfully
         if (res?.acknowledged && res?.modifiedCount > 0) {
            Swal.fire({
               title: "Camp Updated Successfully",
               html: `<p class='swal-text'>Your camp "${campName}" has been updated successfully!</p>`,
               icon: "success",
               confirmButtonText: "OK",
            });
         } else {
            Swal.fire({
               title: "Failed to Update Camp",
               html: `<p class='swal-text'> you are already upto date </p>`,
               icon: "error",
               confirmButtonText: "OK",
            });
         }
      } catch (err) {
         const errorMessage =
            err?.response?.data?.message ||
            err.message ||
            "Something went wrong";

         Swal.fire({
            title: "Wrong Credentials",
            html: `<p class='swal-text'>${errorMessage}</p>`,
            icon: "error",
            draggable: true,
         });
      } finally {
         setIsLoading(false);
      }
   };

   return (
      <div
         className={`min-h-screen  ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
      >
         <div className="container mx-auto px-4 py-8">
            {/* Form Container */}
            <div className="max-w-4xl mx-auto">
               <div
                  className={`rounded-2xl shadow-xl border overflow-hidden ${containerStyle}`}
               >
                  <div className="bg-gradient-to-r from-blue-600 to-green-600 px-8 py-6">
                     <h2 className="text-2xl font-bold text-white">
                        Update Medical Camp
                     </h2>
                     <p className="text-blue-100 mt-1">
                        Fill in the details below to Update a new medical camp
                     </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="p-8">
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div className="space-y-6">
                           {/* Camp Name */}
                           <CampNameField
                              errors={errors}
                              register={register}
                              darkMode={darkMode}
                              pStyle={pStyle}
                           />

                           {/* Healthcare Professional */}
                           <HealthProField
                              errors={errors}
                              register={register}
                              darkMode={darkMode}
                              pStyle={pStyle}
                           />

                           {/* Camp Fees */}
                           <CampFeeField
                              errors={errors}
                              register={register}
                              darkMode={darkMode}
                              pStyle={pStyle}
                           />

                           {/* Location */}
                           <LocationField
                              errors={errors}
                              register={register}
                              darkMode={darkMode}
                              pStyle={pStyle}
                           />

                           {/* Participant Count */}
                           <ParticipantCountField
                              errors={errors}
                              register={register}
                              darkMode={darkMode}
                              pStyle={pStyle}
                           />
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                           {/* Image Upload */}
                           <ImageField
                              errors={errors}
                              register={register}
                              resetField={resetField}
                              watch={watch}
                              clearErrors={clearErrors}
                              imagePreviewUrl={camp?.imageUrl}
                              darkMode={darkMode}
                              pStyle={pStyle}
                           />
                           {/* Date & Time */}
                           <DateTimeField
                              errors={errors}
                              control={control}
                              darkMode={darkMode}
                              pStyle={pStyle}
                           />
                        </div>
                     </div>

                     {/* Description - Full Width */}
                     <DescriptionField
                        errors={errors}
                        register={register}
                        darkMode={darkMode}
                        pStyle={pStyle}
                     />

                     {/* Submit Button */}
                     <div className="mt-8 flex justify-end">
                        <button
                           type="submit"
                           disabled={isLoading}
                           className="px-8 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-green-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                           {isLoading ? (
                              <div className="flex items-center justify-center space-x-2">
                                 <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                 {imageLoading ? (
                                    <span>Uploading Image...</span>
                                 ) : (
                                    <span>Creating Camp...</span>
                                 )}
                              </div>
                           ) : (
                              "Create Medical Camp"
                           )}
                        </button>
                     </div>
                  </form>
               </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-8 text-gray-500">
               <p>
                  © 2025 Medical Camp Management System. Serving communities
                  with healthcare excellence.
               </p>
            </div>
         </div>
      </div>
   );
};
export default UpdateCamp;
