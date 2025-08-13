import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../Components/Dashboard/Sidebar";
import Header from "../Components/Dashboard/Header";
import ThemeContext from "../Provider/ThemeProvider/ThemeContext";
import { Outlet } from "react-router";

const DashBoardLayout = () => {
   const [sidebarOpen, setSidebarOpen] = useState(false);
   const [darkMode, setDarkMode] = useState(false);
   const { theme } = useContext(ThemeContext);

   useEffect(() => {
      setDarkMode(theme === "dark" ? true : false);
   }, [setDarkMode, theme, darkMode]);

   //set heading and title text style
   const textHT = darkMode ? "text-white" : "text-gray-900";

   //set paragraph style
   const pStyle = darkMode ? "text-gray-400" : "text-gray-600";

   return (
      <div className={"min-h-screen "}>
         <div
            className={`${
               darkMode ? "bg-gray-900" : "bg-gray-50"
            } min-h-screen transition-colors duration-200`}
         >
            <Sidebar
               sidebarOpen={sidebarOpen}
               setSidebarOpen={setSidebarOpen}
               darkMode={darkMode}
               textHT={textHT}
               pStyle={pStyle}
            />

            <div className="lg:ml-72 transition-all duration-200">
               <div className="sticky top-0 w-full z-20">
                  <Header setSidebarOpen={setSidebarOpen} darkMode={darkMode} />
               </div>

               <div>
                  <Outlet />
               </div>
            </div>
         </div>
      </div>
   );
};

export default DashBoardLayout;
