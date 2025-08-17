import React from "react";
import * as LucideIcons from "lucide-react";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";

const ArticleCard = ({
   article,
   count,
   current,
   darkMode,
   containerStyle,
   pStyle,
   textHT,
}) => {
   //dynamic Icon components
   const IconComponent = LucideIcons[article.icon];

   return (
      <div className="mb-12">
         <div
            className={`rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${
               darkMode ? "bg-gray-900" : "bg-white"
            }`}
         >
            <div className="grid grid-cols-1 lg:grid-cols-2">
               <div className="relative h-64 lg:h-auto">
                  <img
                     src={article.image}
                     alt={article.title}
                     className="w-full h-full object-cover aspect-[16/20] object-top"
                  />
                  <div className="absolute top-4 left-4">
                     <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-xl text-xs font-semibold">
                        Health Care Professional
                     </span>
                  </div>
               </div>
               <div className="flex flex-col justify-between">
                  <div>
                     <p>{``}</p>
                  </div>
                  <div className="p-6 flex flex-col justify-center">
                     <div className="flex items-center mb-4">
                        <IconComponent
                           className={`h-6 w-6   mr-2 ${
                              darkMode ? "text-blue-400" : "text-blue-600"
                           }`}
                        />
                        <span
                           className={`text-sm font-medium  ${
                              darkMode ? "text-blue-400" : "text-blue-600"
                           }`}
                        >
                           {article.category}
                        </span>
                     </div>
                     <h3 className={`text-2xl font-bold mb-3 ${textHT}`}>
                        {article.title}
                     </h3>
                     <p className={`mb-4 leading-relaxed ${pStyle}`}>
                        {article.excerpt}
                     </p>
                     <div className="flex items-center justify-between">
                        <div
                           className={`flex items-center space-x-4 text-sm  ${
                              darkMode ? "text-gray-400/90" : "text-gray-500"
                           }`}
                        >
                           <div className="flex items-center">
                              <User className="h-4 w-4 mr-1" />
                              {article.author}
                           </div>
                           <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {article.date}
                           </div>
                        </div>
                     </div>
                  </div>
                  <div
                     className={`text-muted-foreground py-2 text-sm font-semibold pl-2 ${
                        darkMode ? "!text-gray-400" : "!text-gray-600"
                     }`}
                  >
                     Slide {current} of {count}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ArticleCard;
