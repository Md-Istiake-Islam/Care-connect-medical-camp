import React, { useState, useContext, useEffect } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router";
import { Eye, EyeOff, Mail, Lock, User, Upload } from "lucide-react";
import AuthContext from "../../../../Provider/AuthProvider/AuthContext";
import { useGoogleSignIn } from "../../../../Hooks/useGoogleSignIn";
import useTitle from "../../../../Hooks/useTitle";
import { useForm } from "react-hook-form";
import axiosSecure from "../../../../Utility/axiosSecure";
import axios from "axios";
import { useUploadImgToImgBB } from "../../../../Hooks/useUploadImgToImgBB";
import Swal from "sweetalert2";

const RegisterPage = () => {
   //page title
   useTitle("Login to enjoy full feature");

   //use context api
   const { createUser, googleSignIn, setUser } = useContext(AuthContext);

   //page location
   const location = useLocation();
   const navigate = useNavigate();

   //use react hook form
   const {
      register,
      handleSubmit,
      watch,
      formState: { errors },
   } = useForm();

   // password view control state
   const [showPassword, setShowPassword] = useState(false);
   const [isLoading, setIsLoading] = useState(false);

   const {
      uploadImage,
      loading: imageLoading,
      error: imgError,
   } = useUploadImgToImgBB();

   // handle image preview
   const [imagePreview, setImagePreview] = useState(null);
   const watchedFile = watch("image")?.[0];

   useEffect(() => {
      if (!watchedFile) {
         setImagePreview(null);
         return;
      }
      const objectUrl = URL.createObjectURL(watchedFile);
      setImagePreview(objectUrl);

      // clean the blob when the component or file changes
      return () => URL.revokeObjectURL(objectUrl);
   }, [watchedFile]);

   // handle on submit stage
   const onSubmit = async ({ firstName, lastName, email, password, image }) => {
      try {
         setIsLoading(true);

         //Upload the image
         const file = image[0]; // FileList → File
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

         //Create the user
         const userData = {
            name: `${firstName} ${lastName}`,
            email,
            photo: imageUrl,
         };

         // user registration
         const { user } = await createUser(email, password);

         if (user && user?.email) {
            setUser(user);

            // save data to DB
            const isSaved = await axiosSecure.post("/users", userData);

            // guard for check if user saved failed
            if (isSaved?.data?.acknowledged && isSaved?.data?.insertedId) {
               Swal.fire({
                  title: "Sign‑in successful",
                  html: "<p class='swal-text'>Thank you for staying with us!</p>",
                  icon: "success",
                  draggable: true,
               });
               navigate(location.state || "/");
            }
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

   const { signInWithGoogle, loading } = useGoogleSignIn({
      googleSignIn,
      setUser,
      location,
   });

   return (
      <div className="bg-white lg:bg-transparent rounded-3xl shadow-2xl lg:shadow-none border lg:border-0 border-gray-100 px-8 py-12 lg:p-0">
         {/* Header */}
         <div className="lg:hidden text-center mb-12 ">
            <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
               <User className="w-8 h-8 text-white" />
            </div>
            <h2 className=" text-3xl font-bold text-slate-800 mb-2">
               Create Account
            </h2>
            <p className=" text-gray-600">
               Join our medical camp community and start making a difference
            </p>
         </div>

         {/* Registration Form */}
         <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="text-sm font-semibold text-slate-800 mb-2 flex items-center justify-between">
                     First Name
                     {errors.firstName && (
                        <p className="text-red-500 text-sm pl-2">
                           {errors.firstName.message}
                        </p>
                     )}
                  </label>
                  <div className="relative">
                     <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                     <input
                        type="text"
                        {...register("firstName", { required: "**" })}
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                        placeholder="First name"
                     />
                  </div>
               </div>
               <div>
                  <label className="text-sm font-semibold text-slate-800 mb-2 flex items-center justify-between">
                     Last Name
                     {errors.lastName && (
                        <p className="text-red-500 text-sm pl-2">
                           {errors.lastName.message}
                        </p>
                     )}
                  </label>
                  <div className="relative">
                     <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                     <input
                        type="text"
                        {...register("lastName", { required: "**" })}
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                        placeholder="Last name"
                     />
                  </div>
               </div>
            </div>

            {/* Email Field */}
            <div>
               <label className="text-sm font-semibold text-slate-800 mb-2 flex items-center justify-between">
                  Email Address
                  {errors.email && (
                     <p className="text-red-500 text-sm pl-2">
                        {errors.email.message}
                     </p>
                  )}
               </label>
               <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                     type="email"
                     {...register("email", { required: "* required *" })}
                     className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                     placeholder="Enter your email"
                  />
               </div>
            </div>

            {/* Password Field */}
            <div>
               <label className="text-sm font-semibold text-slate-800 mb-2 flex items-center justify-between">
                  Password
                  {errors.password && (
                     <p className="text-red-500 text-sm pl-2">
                        {errors.password.message}
                     </p>
                  )}
               </label>
               <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                     {...register("password", {
                        required: "* required *",
                        pattern: {
                           value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()\[\]\-_=+{}\\|;:'",<.>/? ])[A-Za-z\d~`!@#$%^&*()\[\]\-_=+{}\\|;:'",<.>/? ]{6,}$/,
                           message: "* Password must be strong *",
                        },
                     })}
                     type={showPassword ? "text" : "password"}
                     className="w-full pl-12 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white"
                     placeholder="Create a password"
                  />
                  <button
                     type="button"
                     onClick={() => setShowPassword(!showPassword)}
                     className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                     {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                     ) : (
                        <Eye className="w-5 h-5" />
                     )}
                  </button>
               </div>
            </div>

            {/* Image Upload */}
            <div>
               <label className="text-sm font-semibold text-slate-800 mb-2 flex items-center justify-between">
                  Profile Image
                  {errors.image && (
                     <p className="text-red-500 text-sm pl-2">
                        {errors.image.message}
                     </p>
                  )}
               </label>
               <div className="relative">
                  <input
                     type="file"
                     accept="image/*"
                     {...register("image", {
                        required: "* required *",
                        validate: {
                           // check image size check (≤ 2MB)
                           lessThan2MB: (files) =>
                              files[0]?.size < 2_000_000 ||
                              "Max file size is 2 MB",
                        },
                     })}
                     className="hidden"
                     id="image-upload"
                  />
                  <label
                     htmlFor="image-upload"
                     className="w-full flex items-center justify-center px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl hover:border-blue-400 transition-all duration-300 cursor-pointer bg-gray-50 hover:bg-blue-50"
                  >
                     <div className="text-center">
                        {imagePreview ? (
                           <div className="flex items-center space-x-3">
                              <img
                                 src={imagePreview}
                                 alt="Preview"
                                 className="w-12 h-12 rounded-full object-cover"
                              />
                              <span className="text-sm text-gray-600">
                                 Image selected
                              </span>
                           </div>
                        ) : (
                           <div className="flex items-center space-x-3">
                              <Upload className="w-6 h-6 text-gray-400" />
                              <span className="text-sm text-gray-600">
                                 Upload profile image
                              </span>
                           </div>
                        )}
                     </div>
                  </label>
               </div>
            </div>

            {/* Create Account Button */}
            <button
               type="submit"
               disabled={isLoading}
               className="w-full bg-gradient-to-r from-green-600 to-blue-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            >
               {isLoading ? (
                  <div className="flex items-center justify-center space-x-2">
                     <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                     {imageLoading ? (
                        <span>Uploading Image...</span>
                     ) : (
                        <span>Creating Account...</span>
                     )}
                  </div>
               ) : (
                  "Create Account"
               )}
            </button>

            {/* Divider */}
            <div className="relative">
               <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
               </div>
               <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                     Or continue with
                  </span>
               </div>
            </div>

            {/* Google Sign In */}
            <button
               type="button"
               onClick={signInWithGoogle}
               disabled={loading}
               className="w-full bg-white border border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-3"
            >
               <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                     fill="#4285F4"
                     d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                     fill="#34A853"
                     d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                     fill="#FBBC05"
                     d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                     fill="#EA4335"
                     d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
               </svg>
               <span>Sign up with Google</span>
            </button>
         </form>
         <div className="text-center mt-8 pt-6 border-t border-gray-100 lg:hidden">
            <p className="text-gray-600">
               Already have an account?{" "}
               <Link
                  to={"/authentication/login"}
                  className="text-blue-600 hover:text-blue-700 font-semibold"
               >
                  Sign In
               </Link>
            </p>
         </div>
      </div>
   );
};

export default RegisterPage;
