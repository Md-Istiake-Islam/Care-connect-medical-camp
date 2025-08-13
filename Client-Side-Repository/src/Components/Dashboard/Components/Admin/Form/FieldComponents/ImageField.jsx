import { Camera } from "lucide-react";
import React, { useEffect, useState } from "react";

const ImageField = ({
   errors,
   register,
   resetField,
   clearErrors,
   watch,
   imagePreviewUrl,
   pStyle,
   darkMode,
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
      <div>
         <label className="mb-2  flex items-center justify-between">
            <div
               className={`flex items-center text-sm font-semibold ${pStyle}`}
            >
               <Camera className="w-4 h-4 mr-2 text-indigo-600" />
               Camp Image
            </div>
            <div>
               {errors.image && (
                  <p className="text-red-500 text-sm pl-2">
                     {errors.image.message}
                  </p>
               )}
            </div>
         </label>
         <div
            className={`flex items-center justify-center relative h-[22.2rem] border-2 border-dashed  rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-200 ${
               darkMode ? "border-gray-700" : " border-gray-300"
            }`}
         >
            <div className="">
               {imagePreview ? (
                  <div className="space-y-4 relative z-20">
                     <img
                        src={imagePreview}
                        alt="Camp preview"
                        className="w-full h-66 object-cover rounded-lg"
                     />
                     <button
                        type="button"
                        onClick={() => {
                           setImagePreview(null);
                           resetField("image");
                           clearErrors("image");
                        }}
                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                     >
                        Remove Image
                     </button>
                  </div>
               ) : (
                  <div>
                     <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                     <p className={`${pStyle} mb-2`}>
                        Click to upload camp image
                     </p>
                     <p className="text-sm text-gray-500">
                        PNG, JPG up to 10MB
                     </p>
                  </div>
               )}
            </div>
            <input
               type="file"
               accept="image/*"
               {...register("image", {
                  required: imagePreviewUrl ? false : "* required *",
                  validate: {
                     // check image size check (≤ 5MB)
                     lessThan5MB: (files) =>
                        !files?.[0] ||
                        files[0]?.size < 5_000_000 ||
                        "Max file size is 5 MB",
                  },
               })}
               className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
         </div>
      </div>
   );
};

export default ImageField;
