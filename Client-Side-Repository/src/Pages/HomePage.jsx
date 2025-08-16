import React, { useContext, useEffect } from "react";
import BannerSlider from "../Components/header/Banner/BannerSlider";
import PopularCamp from "../Components/Home/PopularCamp";
import FeedBack from "../Components/Home/FeedBack";
import ImpactStatus from "../Components/Home/ImpactStatus";
import useTitle from "../Hooks/useTitle";
import { useLocation } from "react-router";
import AboutSection from "../Components/Home/AboutSection";
import ThemeContext from "../Provider/ThemeProvider/ThemeContext";

const HomePage = () => {
   //scroll to top
   useTitle("Home || CareConnect Medical Camp");
   const { pathname } = useLocation();
   useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
   }, [pathname]);

   //get theme data from theme context
   const { darkMode } = useContext(ThemeContext);
   return (
      <div
         className={`${
            darkMode ? "bg-gray-900" : "bg-white"
         } min-h-screen transition-colors duration-300`}
      >
         <section>
            <BannerSlider />
         </section>
         <section id="about-camps">
            <AboutSection />
         </section>
         <section id="popular-camps">
            <PopularCamp />
         </section>
         <section id="feedBack">
            <FeedBack />
         </section>
         <section id="impact-stats">
            <ImpactStatus />
         </section>
      </div>
   );
};

export default HomePage;
