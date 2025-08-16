import React, { useContext } from "react";

import {
   Carousel,
   CarouselContent,
   CarouselItem,
   CarouselNext,
   CarouselPrevious,
} from "@/components/ui/carousel";
import StepCard from "./Cards/StepCard";
import LoadingSpinner from "../Shared/LoadingElement/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ThemeContext from "@/Provider/ThemeProvider/ThemeContext";

const HowItWorks = () => {
   // get working steps data
   const { data: steps, isLoading } = useQuery({
      queryKey: ["workingSteps"],
      queryFn: async () => {
         const res = await axios.get(
            `${import.meta.env.VITE_ApiUrl}/working-steps`
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

   if (!steps || isLoading) {
      return <LoadingSpinner />;
   }
   return (
      <section
         id="how-it-works"
         className={`py-16 transition-colors duration-300 ${
            darkMode ? "bg-gray-900" : "bg-white"
         }`}
      >
         <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="text-center mb-12">
               <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${textHT}`}>
                  How It Works
               </h2>
               <p className={`max-w-3xl mx-auto ${pStyle}`}>
                  Our systematic approach ensures that every medical camp
                  delivers maximum impact and reaches those who need healthcare
                  the most.
               </p>
            </div>

            {
               <Carousel
                  opts={{
                     align: "start",
                  }}
                  className="w-full max-w-7xl mx-auto"
               >
                  <CarouselContent>
                     {steps.map((step, index) => (
                        <CarouselItem
                           key={index}
                           className="md:basis-1/2 lg:basis-1/3"
                        >
                           <div className="p-1">
                              <StepCard
                                 step={step}
                                 darkMode={darkMode}
                                 containerStyle={containerStyle}
                                 textHT={textHT}
                                 pStyle={pStyle}
                              />
                           </div>
                        </CarouselItem>
                     ))}
                  </CarouselContent>
                  <CarouselPrevious
                     className={`${
                        darkMode
                           ? "text-white bg-gray-800 border-gray-700"
                           : "text-gray-900 bg-gray-50 border-gray-100"
                     }`}
                  />
                  <CarouselNext
                     className={`${
                        darkMode
                           ? "text-white bg-gray-800 border-gray-700"
                           : "text-gray-900 bg-gray-50 border-gray-100"
                     }`}
                  />
               </Carousel>
            }
         </div>
      </section>
   );
};

export default HowItWorks;
