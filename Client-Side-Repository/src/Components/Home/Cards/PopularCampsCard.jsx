import { ListCollapse } from "lucide-react";
import { Link } from "react-router";

const PopularCampsCard = ({ camp, darkMode, containerStyle, pStyle }) => {
   const { _id, campName, imageUrl, description, campFees } = camp;

   return (
      <div
         className={` rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border group ${containerStyle}`}
      >
         {/* Image */}
         <div className="relative overflow-hidden">
            <img
               src={imageUrl}
               alt={campName}
               className="object-cover group-hover:scale-105 transition-transform duration-500 aspect-[16/10]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

            {/* Fee Badge */}
            <div className="absolute top-4 right-4">
               <div
                  className={`px-3 py-1 rounded-full text-sm xl:text-lg font-semibold ${
                     campFees === 0
                        ? "bg-green-500 text-white"
                        : "bg-white/90 text-slate-800"
                  }`}
               >
                  {campFees === 0 ? "Free" : `${campFees} Taka`}
               </div>
            </div>
         </div>

         {/* Content */}
         <div className="p-5">
            {/* Camp Name */}
            <h3
               className={`line-clamp-1 text-xl font-bold  mb-3 group-hover:text-blue-600 transition-colors duration-300 ${
                  darkMode ? "text-slate-200" : "text-slate-800"
               }`}
            >
               {campName}
            </h3>

            {/* Description */}
            <div>
               <p className={`line-clamp-3 leading-6 text-sm mb-5 ${pStyle}`}>
                  {description}
               </p>
            </div>

            {/* Action Button */}
            <div className="w-full flex items-center justify-end">
               <Link to={`./../camp-details/${_id}`}>
                  <button className="px-6 bg-gradient-to-r from-blue-600 to-green-500 text-white text-sm py-2 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center space-x-2">
                     <ListCollapse className="w-4 h-4" />
                     <span>View Details</span>
                  </button>
               </Link>
            </div>
         </div>
      </div>
   );
};

export default PopularCampsCard;
