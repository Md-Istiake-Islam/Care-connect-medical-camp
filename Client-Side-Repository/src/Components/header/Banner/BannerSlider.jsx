import React, { useState, useEffect } from "react";
import {
   ChevronLeft,
   ChevronRight,
   Calendar,
   MapPin,
   Users,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../Shared/LoadingElement/LoadingSpinner";

const BannerSlider = () => {
   const [currentSlide, setCurrentSlide] = useState(0);
   const [isAutoPlaying, setIsAutoPlaying] = useState(true);

   const { data: successStories, isPending } = useQuery({
      queryKey: ["sliders"],
      queryFn: async () => {
         const res = await axios.get(`${import.meta.env.VITE_ApiUrl}/sliders`);
         return res.data;
      },
   });

   useEffect(() => {
      if (isPending) return;
      if (!isAutoPlaying) return;
      const interval = setInterval(() => {
         setCurrentSlide((prev) => (prev + 1) % successStories?.length);
      }, 5000);

      return () => clearInterval(interval);
   }, [isAutoPlaying, successStories, isPending]);

   const nextSlide = () => {
      setCurrentSlide((prev) => (prev + 1) % successStories?.length);
   };

   const prevSlide = () => {
      setCurrentSlide(
         (prev) => (prev - 1 + successStories?.length) % successStories?.length
      );
   };

   const goToSlide = (index) => {
      setCurrentSlide(index);
   };

   if (isPending) return <LoadingSpinner />;
   const currentStory = successStories[currentSlide];

   return (
      <div className="hero relative min-h-[70vh] w-full overflow-hidden bg-gray-900">
         {/* Background Images */}
         <div className="absolute inset-0">
            {successStories.map((story, index) => (
               <div
                  key={story._id}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                     index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
               >
                  <img
                     src={story.backgroundImage}
                     alt={story.title}
                     className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/60 to-transparent" />
               </div>
            ))}
         </div>

         {/* Content */}
         <div className="relative z-10 h-full flex items-center">
            <div className="container mx-auto px-4 lg:px-8">
               <div className="grid lg:grid-cols-2 gap-8 items-center">
                  {/* Text Content */}
                  <div className="text-white space-y-6">
                     <div className="space-y-2">
                        <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                           {currentStory.title}
                        </h1>
                        <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-400 rounded-full animate-pulse" />
                     </div>

                     <p className="text-lg lg:text-xl text-blue-50 leading-relaxed max-w-2xl font-light">
                        {currentStory.content}
                     </p>

                     {/* Stats */}
                     <div className="flex flex-wrap gap-6 mt-8">
                        <div className="flex items-center space-x-2">
                           <div className="w-8 h-8 bg-green-400/20 rounded-full flex items-center justify-center">
                              <Users className="w-4 h-4 text-green-400" />
                           </div>
                           <span className="text-sm font-semibold">
                              {currentStory.stats.patients.toLocaleString()}{" "}
                              Patients
                           </span>
                        </div>
                        <div className="flex items-center space-x-2">
                           <div className="w-8 h-8 bg-blue-400/20 rounded-full flex items-center justify-center">
                              <MapPin className="w-4 h-4 text-blue-400" />
                           </div>
                           <span className="text-sm font-semibold">
                              {currentStory.stats.location}
                           </span>
                        </div>
                        <div className="flex items-center space-x-2">
                           <div className="w-8 h-8 bg-purple-400/20 rounded-full flex items-center justify-center">
                              <Calendar className="w-4 h-4 text-purple-400" />
                           </div>
                           <span className="text-sm font-semibold">
                              {currentStory.stats.date}
                           </span>
                        </div>
                     </div>

                     {/* User Info */}
                     <div className="flex items-center space-x-4 mt-8">
                        <img
                           src={currentStory.userImage}
                           alt={currentStory.userName}
                           className="w-16 h-16 rounded-full border-4 border-white/30 object-cover shadow-xl ring-2 ring-green-400/50"
                        />
                        <div>
                           <h3 className="font-bold text-lg text-white">
                              {currentStory.userName}
                           </h3>
                           <p className="text-blue-200 font-medium">
                              {currentStory.userRole}
                           </p>
                        </div>
                     </div>
                  </div>

                  {/* Visual Elements */}
                  <div className="hidden lg:block">
                     <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-green-400/30 to-blue-600/30 rounded-3xl blur-3xl animate-pulse" />
                        <div className="relative bg-white/15 backdrop-blur-md rounded-3xl p-8 border border-white/30 shadow-2xl">
                           <div className="flex items-center justify-center mb-6">
                              <div className="relative w-20 h-20  rounded-2xl flex items-center justify-center shadow-lg">
                                 {/* Medical Logo */}
                                 <div>
                                    <img src="/logo.png" alt="" />
                                 </div>
                                 {/* Caring Elements */}
                                 <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-white/90 rounded-full animate-pulse"></div>
                                 <div className="absolute -bottom-2 -right-2 w-4 h-4 bg-white/90 rounded-full animate-pulse"></div>
                                 <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-yellow-300 rounded-full animate-bounce"></div>
                              </div>
                           </div>
                           <div className="text-center">
                              <h3 className="text-2xl font-bold text-white mb-2">
                                 Making a Difference
                              </h3>
                              <p className="text-blue-100 font-light">
                                 Every camp brings hope and healing to
                                 communities in need
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Navigation Controls */}
         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <div className="flex items-center space-x-4">
               {/* Progress Bar */}
               <div className="hidden md:flex items-center space-x-2 mr-4">
                  <span className="text-white/70 text-sm font-medium">
                     {currentSlide + 1} / {successStories.length}
                  </span>
               </div>

               {/* Dots */}
               <div className="flex space-x-2">
                  {successStories.map((_, index) => (
                     <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                           index === currentSlide
                              ? "bg-gradient-to-r from-green-400 to-blue-400 w-8 shadow-lg"
                              : "bg-white/50 hover:bg-white/70 hover:scale-110"
                        }`}
                     />
                  ))}
               </div>
            </div>
         </div>

         {/* Arrow Navigation */}
         <button
            onClick={prevSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full p-3 transition-all duration-300 hover:scale-110 shadow-lg border border-white/20"
         >
            <ChevronLeft className="w-6 h-6 text-white" />
         </button>

         <button
            onClick={nextSlide}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full p-3 transition-all duration-300 hover:scale-110 shadow-lg border border-white/20"
         >
            <ChevronRight className="w-6 h-6 text-white" />
         </button>

         {/* Auto-play indicator */}
         <div className="absolute top-4 right-4 z-20">
            <div
               className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  isAutoPlaying ? "bg-green-400 animate-pulse" : "bg-white/50"
               }`}
            />
         </div>
      </div>
   );
};

export default BannerSlider;
