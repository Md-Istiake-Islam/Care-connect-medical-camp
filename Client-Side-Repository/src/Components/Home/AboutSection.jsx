import React, { useContext, useEffect, useState } from "react";
import { Heart, Shield, Users, Award, Target, Globe } from "lucide-react";
import ThemeContext from "../../Provider/ThemeProvider/ThemeContext";

const AboutSection = () => {
   //get theme data from theme context
   const { theme } = useContext(ThemeContext);

   // manage state for switch theme
   const [darkMode, setDarkMode] = useState(false);

   useEffect(() => {
      setDarkMode(theme === "dark" ? true : false);
   }, [setDarkMode, theme, darkMode]);

   //set heading and title text style
   const textHT = darkMode ? "text-white" : "text-gray-900";

   //set paragraph style
   const pStyle = darkMode ? "text-gray-400" : "text-gray-600";

   //container style
   const containerStyle = darkMode
      ? "bg-gray-800 border-gray-700"
      : "bg-white border-gray-100";

   const values = [
      {
         icon: Heart,
         title: "Compassionate Care",
         description:
            "We provide healthcare with empathy, ensuring every patient feels valued and cared for.",
      },
      {
         icon: Shield,
         title: "Quality Assurance",
         description:
            "Our medical services meet the highest standards with certified professionals and equipment.",
      },
      {
         icon: Users,
         title: "Community Focus",
         description:
            "We believe in building stronger, healthier communities through accessible healthcare.",
      },
      {
         icon: Award,
         title: "Excellence",
         description:
            "Committed to delivering exceptional medical care and continuous improvement.",
      },
   ];

   return (
      <div
         id="about"
         className={`py-16 transition-colors duration-300 ${
            darkMode ? "bg-gray-900" : "bg-white"
         }`}
      >
         <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="text-center mb-12">
               <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${textHT}`}>
                  Welcome Care Connect
               </h2>
               <p className={`max-w-3xl mx-auto ${pStyle}`}>
                  Bridging the gap between quality healthcare and underserved
                  communities through innovative mobile medical camps and
                  comprehensive health programs.
               </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
               <div className="space-y-6">
                  <div
                     className={`bg-gradient-to-r p-8 rounded-xl ${
                        darkMode
                           ? "from-blue-900/20 to-green-900/20"
                           : "from-blue-100/90 to-green-100/90"
                     }`}
                  >
                     <div className="flex items-center mb-4">
                        <Target className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
                        <h3 className={`text-2xl font-bold ${textHT}`}>
                           Our Mission
                        </h3>
                     </div>
                     <p
                        className={`leading-relaxed ${
                           darkMode ? "text-gray-300 " : "text-gray-700"
                        }`}
                     >
                        To provide accessible, high-quality healthcare services
                        to underserved communities through mobile medical camps,
                        preventive care programs, and health education
                        initiatives that empower individuals to take control of
                        their health.
                     </p>
                  </div>

                  <div
                     className={`bg-gradient-to-r p-8 rounded-xl ${
                        darkMode
                           ? "from-purple-900/20 to-pink-900/20"
                           : "from-purple-100/90 to-pink-100/90"
                     }`}
                  >
                     <div className="flex items-center mb-4">
                        <Globe className="h-8 w-8 text-purple-600 dark:text-purple-400 mr-3" />
                        <h3 className={`text-2xl font-bold ${textHT}`}>
                           Our Vision
                        </h3>
                     </div>
                     <p
                        className={`leading-relaxed ${
                           darkMode ? "text-gray-300 " : "text-gray-700"
                        }`}
                     >
                        A world where geographic location and economic status
                        never determine access to quality healthcare. We
                        envision healthy communities where preventive care is
                        the norm and medical emergencies are met with immediate,
                        professional response.
                     </p>
                  </div>
               </div>

               <div className="relative">
                  <div
                     className={`bg-gradient-to-br rounded-2xl p-1 ${
                        darkMode
                           ? "from-blue-600 to-green-600"
                           : "from-blue-400 to-green-400"
                     }`}
                  >
                     <img
                        src="https://i.ibb.co.com/d4h9x1jR/About-care-connect.jpg"
                        alt="Medical team at work"
                        className="w-full h-80 object-cover rounded-xl"
                     />
                  </div>
                  <div
                     className={`absolute -bottom-6 -right-6 p-6 rounded-xl shadow-lg ${
                        darkMode ? "bg-gray-800" : "bg-white"
                     }`}
                  >
                     <div className="text-center">
                        <div
                           className={`text-3xl font-bold ${
                              darkMode ? "text-blue-400" : "text-blue-600"
                           }`}
                        >
                           10+
                        </div>
                        <div className={`text-sm ${pStyle}`}>
                           Years of Service
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {values.map((value, index) => {
                  const IconComponent = value.icon;
                  return (
                     <div
                        key={index}
                        className={`p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border ${containerStyle}`}
                     >
                        <div className="text-center">
                           <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-blue-500 to-green-500 mb-4">
                              <IconComponent className="h-6 w-6 text-white" />
                           </div>
                           <h4
                              className={`text-lg font-semibold mb-2 ${textHT}`}
                           >
                              {value.title}
                           </h4>
                           <p className={`text-sm ${pStyle}`}>
                              {value.description}
                           </p>
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>
      </div>
   );
};

export default AboutSection;
