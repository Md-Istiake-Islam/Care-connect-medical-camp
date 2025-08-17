import { ChevronUp } from "lucide-react";
import React from "react";

const ScrollToTop = () => {
   // smooth scroll to section
   const handleClick = (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
   };
   return (
      <button
         onClick={(e) => handleClick(e)}
         className="inline-flex p-2 rounded-full bg-gradient-to-r from-blue-500 to-green-500 mb-4 cursor-pointer fixed -bottom-0.5 right-3.5 z-50 transition-transform duration-300 ease-in-out hover:scale-110"
      >
         <ChevronUp className="h-6 w-6 text-white" />
      </button>
   );
};

export default ScrollToTop;
