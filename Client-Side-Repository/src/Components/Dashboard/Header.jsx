import React, { useContext } from "react";
import { Menu, Search, Moon, Sun, Bell, House } from "lucide-react";
import ThemeContext from "../../Provider/ThemeProvider/ThemeContext";
import { Link } from "react-router";
import SearchContext from "../../Provider/SearchProivder/SearchContext";

const Header = ({ setSidebarOpen, darkMode }) => {
   // get theme control from Theme Context
   const { toggleTheme } = useContext(ThemeContext);

   // get search control from search Context
   const { setSearchTerm } = useContext(SearchContext);

   // button Background style
   const btnBgStyle = darkMode ? "hover:bg-gray-700" : "hover:bg-gray-100";

   // button text style
   const btnTxtStyle = darkMode
      ? "text-gray-400 hover:text-gray-200"
      : "text-gray-500 hover:text-gray-700";

   return (
      <header
         className={`shadow-sm border-b ${
            darkMode
               ? "border-gray-700 bg-gray-800 "
               : "bg-white border-gray-200"
         }`}
      >
         <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
               <button
                  onClick={() => setSidebarOpen(true)}
                  className={`lg:hidden ${btnTxtStyle}`}
               >
                  <Menu size={24} />
               </button>

               {/* search bar */}
               <div className="hidden md:flex items-center ml-4 lg:ml-0">
                  <div className="relative">
                     <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                     />
                     <input
                        type="text"
                        placeholder="Search..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className={`pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  ${
                           darkMode
                              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                              : "border-gray-300"
                        }`}
                     />
                  </div>
               </div>
            </div>

            <div className="flex items-center space-x-4">
               <button
                  onClick={() => toggleTheme()}
                  className={`p-2 rounded-lg transition-colors ${btnBgStyle} ${btnTxtStyle}`}
               >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
               </button>

               <Link to={"/"}>
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
                     <span className="text-white font-semibold text-sm ">
                        <House className="w-5" />
                     </span>
                  </div>
               </Link>
            </div>
         </div>
      </header>
   );
};

export default Header;
