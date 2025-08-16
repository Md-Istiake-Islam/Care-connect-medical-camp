import { Share2 } from "lucide-react";
import React from "react";

const HeroSection = ({
   imageUrl,
   campName,
   handleShare,
   campFees,
   containerStyle,
}) => {
   return (
      <div
         className={`rounded-3xl shadow-xl overflow-hidden border ${containerStyle}`}
      >
         <div className="relative aspect-[16/8]">
            <img
               src={imageUrl}
               alt={campName}
               className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {/* Floating Info */}
            <div className="absolute bottom-6 left-6 right-6">
               <div className="flex items-center justify-between">
                  <div>
                     <h1 className="text-4xl font-bold text-white mb-2 ">
                        {campName}
                     </h1>
                  </div>
                  <div className="flex space-x-2">
                     <button
                        onClick={() => handleShare()}
                        className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                     >
                        <Share2 className="w-5 h-5 text-white" />
                     </button>
                  </div>
               </div>
            </div>

            {/* Fee Badge */}
            <div className="absolute top-6 right-6">
               <div
                  className={`px-4 py-2 rounded-full text-lg font-bold ${
                     campFees === 0
                        ? "bg-green-500 text-white"
                        : "bg-white/90 text-slate-800"
                  }`}
               >
                  {campFees === 0 ? "Free Camp" : `${campFees} Taka`}
               </div>
            </div>
         </div>
      </div>
   );
};

export default HeroSection;
