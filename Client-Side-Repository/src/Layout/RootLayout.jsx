import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/header/Navbar";
import Footer from "../Components/Footer/Footer";

const RootLayout = () => {
   return (
      <div>
         <section className="sticky w-full z-20 top-0">
            <Navbar />
         </section>
         <section>
            <Outlet />
         </section>
         <section>
            <Footer />
         </section>
      </div>
   );
};

export default RootLayout;
