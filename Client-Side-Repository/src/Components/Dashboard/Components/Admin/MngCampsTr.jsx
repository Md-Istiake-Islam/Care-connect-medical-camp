import { Calendar, MapPin, PencilOff, Trash2, User } from "lucide-react";
import { TbCurrencyTaka } from "react-icons/tb";
import useFormatDate from "../../../../Hooks/useFormatDate";
import { useNavigate } from "react-router";

const MngCampsTr = ({
   camp,
   handleDelete,
   containerStyle,
   darkMode,
   pStyle,
   textHT,
}) => {
   // use formateDateTime hook;
   const dateObj = camp?.date;
   const { formattedDateTime } = useFormatDate(dateObj);
   const navigate = useNavigate();

   return (
      <tr className={`${containerStyle}   transition-colors duration-200`}>
         <td className="px-6 py-4">
            <div>
               <h3 className={`font-semibold  mb-1 ${textHT}`}>
                  {camp.campName}
               </h3>
               <div className={`flex items-center space-x-4 text-sm ${pStyle}`}>
                  <div className="flex items-center space-x-1">
                     <Calendar className="w-4 h-4" />
                     <span>{formattedDateTime}</span>
                     <span>{camp?.time}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                     <MapPin className="w-4 h-4" />
                     <span>{camp.location}</span>
                  </div>
               </div>
            </div>
         </td>
         <td className="px-6 py-4">
            <div className="flex items-center space-x-2">
               <User className="w-4 h-4 text-gray-400" />
               <span className={`font-medium ${textHT}`}>{camp.healthPro}</span>
            </div>
         </td>
         <td className="px-6 py-4">
            <span
               className={`font-semibold ${
                  camp.campFees === 0 ? "text-green-600" : pStyle
               }`}
            >
               {camp.campFees === 0 ? (
                  "Free"
               ) : (
                  <p className="flex items-center">
                     {camp.campFees}
                     <TbCurrencyTaka className="text-lg" />
                  </p>
               )}
            </span>
         </td>

         <td className="px-6 py-4">
            <div className="flex items-center space-x-2">
               {/* Cancel Button */}
               {
                  <button
                     onClick={() =>
                        navigate(`/dashboard/update-camp/${camp?._id}`)
                     }
                     className=" bg-blue-600 hover:bg-blue-700 hover:scale-[1.03] disabled:hover:scale-[1] transition-all duration-200 text-white px-3 py-1 rounded-lg text-sm font-medium flex items-center space-x-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                     <PencilOff className="w-3 h-3" />
                     <span>Update</span>
                  </button>
               }
               {
                  <button
                     onClick={() => handleDelete(camp._id)}
                     className=" bg-red-600 hover:bg-red-700 hover:scale-[1.03] disabled:hover:scale-[1] transition-all duration-200 text-white px-3 py-1 rounded-lg text-sm font-medium flex items-center space-x-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                     <Trash2 className="w-3 h-3" />
                     <span>Delete</span>
                  </button>
               }
            </div>
         </td>
      </tr>
   );
};

export default MngCampsTr;
