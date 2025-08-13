import { Camera, Upload, User } from "lucide-react";
import React, { useEffect, useState } from "react";

const ImageField = ({
   errors,
   register,
   watch,
   imagePreviewUrl,
   darkMode,
   pStyle,
}) => {
   // handle image preview
   const [imagePreview, setImagePreview] = useState(null);
   const watchedFile = watch("image")?.[0];

   useEffect(() => {
      if (watchedFile) {
         const objectUrl = URL.createObjectURL(watchedFile);
         setImagePreview(objectUrl);

         return () => URL.revokeObjectURL(objectUrl); // clean up
      } else if (imagePreviewUrl) {
         setImagePreview(imagePreviewUrl);
      } else {
         setImagePreview(null);
      }
   }, [watchedFile, imagePreviewUrl]);
   return (
      <div className="flex items-center space-x-6">
         <div className="relative">
            {imagePreview ? (
               <img
                  src={imagePreview}
                  alt="Profile Preview"
                  className={`w-24 h-24 rounded-2xl object-cover border-2  shadow-lg ${
                     darkMode ? "border-gray-500" : "border-blue-400"
                  }`}
               />
            ) : (
               <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <User className="w-12 h-12 text-white" />
               </div>
            )}
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-gray-100">
               <Camera className="w-4 h-4 text-gray-600" />
            </div>
         </div>

         <div className="flex-1">
            <input
               type="file"
               accept="image/*"
               {...register("image", {
                  required: imagePreviewUrl ? false : "* required *",
                  validate: {
                     // check image size check (≤ 5MB)
                     lessThan5MB: (files) =>
                        !files?.[0] ||
                        files[0]?.size < 2_000_000 ||
                        "Max file size is 2 MB",
                  },
               })}
               className="hidden"
               id="profile-image"
            />
            <label
               htmlFor="profile-image"
               className={`inline-flex items-center space-x-2  px-4 py-2 rounded-xl font-medium transition-all duration-300 cursor-pointer ${
                  darkMode
                     ? "bg-blue-800/30 hover:bg-blue-800/50 text-blue-400"
                     : "bg-blue-50 hover:bg-blue-100 text-blue-700"
               }`}
            >
               <Upload className="w-4 h-4" />
               <span>Upload New Photo</span>
            </label>
            <p className={`text-sm  mt-2 ${pStyle}`}>
               JPG, PNG or GIF. Max size 5MB.
            </p>
            {errors.image && (
               <p className="text-red-500 text-sm pl-2">
                  {errors.image.message}
               </p>
            )}
         </div>
      </div>
   );
};

export default ImageField;
