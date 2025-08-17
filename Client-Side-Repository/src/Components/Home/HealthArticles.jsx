import React, { useContext, useEffect, useState } from "react";
import { Heart, Shield, Activity, Brain } from "lucide-react";
import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from "@/components/ui/carousel";
import ThemeContext from "@/Provider/ThemeProvider/ThemeContext";
import ArticleCard from "./Cards/ArticleCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../Shared/LoadingElement/LoadingSpinner";

const HealthArticles = () => {
   //shadcn carousel
   const [api, setApi] = useState();
   const [current, setCurrent] = useState(0);
   const [count, setCount] = useState(0);
   useEffect(() => {
      if (!api) {
         return;
      }
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap() + 1);
      api.on("select", () => {
         setCurrent(api.selectedScrollSnap() + 1);
      });
   }, [api]);

   // get working steps data
   const { data: articles, isLoading } = useQuery({
      queryKey: ["healthArticle"],
      queryFn: async () => {
         const res = await axios.get(
            `${import.meta.env.VITE_ApiUrl}/health-article`
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
   const containerStyle = darkMode
      ? "bg-gray-800 border-gray-700"
      : "bg-white border-gray-100";

   const healthTips = [
      {
         tip: "Drink at least 8 glasses of water daily",
         category: "Hydration",
      },
      {
         tip: "Get 7-9 hours of quality sleep each night",
         category: "Sleep",
      },
      {
         tip: "Take a 10-minute walk after meals",
         category: "Exercise",
      },
      {
         tip: "Practice deep breathing for 5 minutes daily",
         category: "Mental Health",
      },
      {
         tip: "Eat 5 servings of fruits and vegetables daily",
         category: "Nutrition",
      },
   ];

   if (!articles || isLoading) {
      return <LoadingSpinner />;
   }
   return (
      <section
         id="articles"
         className={`py-16 transition-colors duration-300 ${
            darkMode ? "bg-gray-800" : "bg-gray-100"
         }`}
      >
         <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="text-center mb-12">
               <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${textHT}`}>
                  Latest Health Articles & Tips
               </h2>
               <p className={`max-w-3xl mx-auto ${pStyle}`}>
                  Stay informed with the latest health insights, medical advice,
                  and wellness tips from our expert medical team.
               </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               {/* article sliders */}
               <div className="col-span-2">
                  <Carousel setApi={setApi} className="w-full group">
                     <CarouselContent>
                        {articles.map((article) => (
                           <CarouselItem key={article._id}>
                              <div className="">
                                 <ArticleCard
                                    article={article}
                                    darkMode={darkMode}
                                    containerStyle={containerStyle}
                                    textHT={textHT}
                                    pStyle={pStyle}
                                    current={current}
                                    count={count}
                                 />
                              </div>
                           </CarouselItem>
                        ))}
                     </CarouselContent>
                     <CarouselPrevious
                        className={
                           "left-2 invisible group-hover:visible transition-all duration-500"
                        }
                     />
                     <CarouselNext
                        className={
                           "right-2 invisible group-hover:visible transition-all duration-500"
                        }
                     />
                  </Carousel>
               </div>

               {/* Health Tips Sidebar */}
               <div>
                  <div
                     className={`rounded-xl shadow-lg p-6 ${
                        darkMode ? "bg-gray-900" : "bg-white"
                     }`}
                  >
                     <h3 className={`text-lg font-bold mb-6 ${textHT}`}>
                        Daily Health Tips
                     </h3>
                     <div className="space-y-4">
                        {healthTips.map((tip, index) => (
                           <div
                              key={index}
                              className={`flex items-start space-x-3 p-3 rounded-lg ${
                                 darkMode ? "bg-gray-800" : "bg-gray-50"
                              }`}
                           >
                              <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                                 <div className="w-2 h-2 bg-white rounded-full"></div>
                              </div>
                              <div>
                                 <p className={`text-sm font-medium ${pStyle}`}>
                                    {tip.tip}
                                 </p>
                                 <span
                                    className={`text-xs  font-medium ${
                                       darkMode
                                          ? "text-blue-400"
                                          : "text-blue-600"
                                    }`}
                                 >
                                    {tip.category}
                                 </span>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default HealthArticles;
