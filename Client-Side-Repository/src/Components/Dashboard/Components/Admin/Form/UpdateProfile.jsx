import React, { useContext, useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useUploadImgToImgBB } from "../../../../../Hooks/useUploadImgToImgBB";
import Swal from "sweetalert2";
import axiosSecure from "../../../../../Utility/axiosSecure";
import useTitle from "../../../../../Hooks/useTitle";
import "react-datepicker/dist/react-datepicker.css";
import { useFormateDateTime } from "../../../../../Hooks/useFormateDateTime";
import CampNameField from "./FieldComponents/campNameField";
import HealthProField from "./FieldComponents/HealthProField";
import CampFeeField from "./FieldComponents/CampFeeField";
import LocationField from "./FieldComponents/LocationField";
import ParticipantCountField from "./FieldComponents/ParticipantCountField";
import ImageField from "./FieldComponents/ImageField";
import DateTimeField from "./FieldComponents/DateTimeField";
import DescriptionField from "./FieldComponents/DescriptionField";
import useUserInfo from "../../../../../Hooks/useUserInfo";

const UpdateProfile = () => {
   //page title
   useTitle("Create Medical Camp");

   // get organizer from auth context
   const { userInfo } = useUserInfo();

   //use react hook form
   const {
      register,
      handleSubmit,
      watch,
      resetField,
      clearErrors,
      formState: { errors },
      control,
   } = useForm();

   // use formateDateTime hook;
   const { formateDateTime } = useFormateDateTime();

   // hooks for image upload
   const {
      uploadImage,
      loading: imageLoading,
      error: imgError,
   } = useUploadImgToImgBB();

   const [isLoading, setIsLoading] = useState(false);

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
      const { formattedDate, formattedTime } = formateDateTime(dateObj);

      try {
         setIsLoading(true);

         //Upload the image
         const file = image[0];
         const imageUrl = await uploadImage(file);

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
            date: formattedDate,
            time: formattedTime,
            organizer: {
               name: userInfo?.name,
               email: userInfo?.email,
               phone: userInfo?.Phone,
            },
         };

         //post camp data to server
         const res = await axiosSecure.post("/camps", campData);

         // check if camp data is posted successfully
         if (res?.data?.acknowledged && res?.data?.insertedId) {
            Swal.fire({
               title: "Camp Created Successfully",
               html: `<p class='swal-text'>Your camp "${campName}" has been created successfully!</p>`,
               icon: "success",
               confirmButtonText: "OK",
            });
            resetField("campName");
            resetField("healthPro");
            resetField("campFees");
            resetField("location");
            resetField("image");
            resetField("dateObj");
            resetField("description");
         } else {
            Swal.fire({
               title: "Failed to Create Camp",
               html: `<p class='swal-text'>${res.data.message}</p>`,
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
         <div className="container mx-auto px-4 py-8">
            {/* Form Container */}
            <div className="max-w-4xl mx-auto">
               <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-green-600 px-8 py-6">
                     <h2 className="text-2xl font-bold text-white">
                        Add New Medical Camp
                     </h2>
                     <p className="text-blue-100 mt-1">
                        Fill in the details below to register a new medical camp
                     </p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="p-8">
                     <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div className="space-y-6">
                           {/* Camp Name */}
                           <CampNameField errors={errors} register={register} />

                           {/* Healthcare Professional */}
                           <HealthProField
                              errors={errors}
                              register={register}
                           />

                           {/* Camp Fees */}
                           <CampFeeField errors={errors} register={register} />

                           {/* Location */}
                           <LocationField errors={errors} register={register} />

                           {/* Participant Count */}
                           <ParticipantCountField
                              errors={errors}
                              register={register}
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
                           />
                           {/* Date & Time */}
                           <DateTimeField errors={errors} control={control} />
                        </div>
                     </div>

                     {/* Description - Full Width */}
                     <DescriptionField errors={errors} register={register} />

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
export default UpdateProfile;
