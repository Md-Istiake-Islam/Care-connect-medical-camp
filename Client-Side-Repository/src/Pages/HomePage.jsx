import React, { useEffect } from "react";
import BannerSlider from "../Components/header/Banner/BannerSlider";
import PopularCamp from "../Components/Home/PopularCamp";
import FeedBack from "../Components/Home/FeedBack";
import ImpactStatus from "../Components/Home/ImpactStatus";
import useTitle from "../Hooks/useTitle";
import { useLocation } from "react-router";
import AboutSection from "../Components/Home/AboutSection";

const HomePage = () => {
   //scroll to top
   useTitle("Home || CareConnect Medical Camp");
   const { pathname } = useLocation();
   useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
   }, [pathname]);
   return (
      <div>
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
