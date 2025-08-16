import React, { useContext } from "react";
import { Stethoscope, Award, GraduationCap, Heart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Shared/LoadingElement/LoadingSpinner";
import axios from "axios";
import ThemeContext from "../../Provider/ThemeProvider/ThemeContext";
import AuthContext from "../../Provider/AuthProvider/AuthContext";

const MedicalTeam = () => {
   //get use from auth context
   const { user } = useContext(AuthContext);

   // get medical teams data
   const { data: medicalTeams, isLoading } = useQuery({
      queryKey: ["medicalTeams"],
      queryFn: async () => {
         const res = await axios.get(
            `${import.meta.env.VITE_ApiUrl}/medical-teams`
         );
         return res.data;
      },
   });

   //get theme data from theme context
   const { darkMode } = useContext(ThemeContext);

   //set heading and title text style
   const textHT = darkMode ? "text-white" : "text-gray-900";

   //set paragraph style
   const pStyle = darkMode ? "text-gray-400" : "text-gray-600";

   //container style
   const containerStyle = darkMode ? "bg-gray-900" : "bg-white ";

   const stats = [
      { number: "50+", label: "Medical Professionals", icon: Stethoscope },
      { number: "25+", label: "Specialists", icon: Award },
      {
         number: "100+",
         label: "Years Combined Experience",
         icon: GraduationCap,
      },
      { number: "10,000+", label: "Lives Saved", icon: Heart },
   ];

   if (!medicalTeams || isLoading) {
      return <LoadingSpinner />;
   }

   return (
      <div>
         <section
            id="team"
            className={`py-16 transition-colors duration-300 ${
               darkMode ? "bg-gray-800" : "bg-gray-50"
            }`}
         >
            <div className="max-w-7xl mx-auto px-6">
               <div className="text-center mb-12">
                  <h2
                     className={`text-3xl md:text-4xl font-bold mb-4 ${textHT}`}
                  >
                     Our Medical Team
                  </h2>
                  <p className={`text-lg max-w-3xl mx-auto ${pStyle}`}>
                     Meet our dedicated team of healthcare professionals
                     committed to providing exceptional medical care to
                     communities in need.
                  </p>
               </div>

               {/* Team Stats */}
               <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                  {stats.map((stat, index) => {
                     const IconComponent = stat.icon;
                     return (
                        <div key={index} className="text-center">
                           <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-blue-500 to-green-500 mb-3">
                              <IconComponent className="h-6 w-6 text-white" />
                           </div>
                           <h2
                              className={`text-2xl md:text-3xl font-bold mb-1 ${textHT}`}
                           >
                              {stat.number}
                           </h2>
                           <p className={`text-sm ${pStyle}`}>{stat.label}</p>
                        </div>
                     );
                  })}
               </div>

               {/* Team Members */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {medicalTeams.map((member) => (
                     <div
                        key={member._id}
                        className={` rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${containerStyle}`}
                     >
                        <div className="relative h-64 bg-gradient-to-br from-blue-400 to-green-400">
                           <img
                              src={member.image}
                              alt={member.name}
                              className="w-full h-full object-cover"
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                           <div className="absolute bottom-4 left-4 text-white">
                              <div className="text-sm font-medium">
                                 {member.experience}
                              </div>
                           </div>
                        </div>

                        <div className="p-6">
                           <h3 className={`text-xl font-bold  mb-1 ${textHT}`}>
                              {member.name}
                           </h3>
                           <p
                              className={` font-medium mb-1 ${
                                 darkMode ? "text-blue-400" : "text-blue-600"
                              }`}
                           >
                              {member.role}
                           </p>
                           <p className={`text-sm mb-4 ${pStyle}`}>
                              {member.specialization}
                           </p>

                           <div className="space-y-1">
                              {member.achievements.map((achievement, idx) => (
                                 <div
                                    key={idx}
                                    className={`flex items-center text-xs ${
                                       darkMode
                                          ? "text-gray-300"
                                          : "text-gray-600"
                                    }`}
                                 >
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                                    {achievement}
                                 </div>
                              ))}
                           </div>
                        </div>
                     </div>
                  ))}
               </div>
            </div>
         </section>
      </div>
   );
};

export default MedicalTeam;
