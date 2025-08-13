import React, { useContext, useEffect, useRef, useState } from "react";
import { Menu, Phone, Mail, User, LogOut, LayoutDashboard } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { Tooltip } from "react-tooltip";
import AuthContext from "../../Provider/AuthProvider/AuthContext";
import useUserInfo from "../../Hooks/useUserInfo";

const Navbar = () => {
   const navigate = useNavigate();
   const { user, logOut } = useContext(AuthContext);

   const { userInfo, role } = useUserInfo();

   //manage dropdown menu
   const [isOpen, setIsOpen] = useState(false);
   const dropdownRef = useRef(null);

   // Close when clicking outside
   useEffect(() => {
      const handleClickOutside = (e) => {
         if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsOpen(false);
         }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, []);

   const handleLogout = () => {
      logOut()
         .then(() => {
            Swal.fire({
               title: "logout successfully",
               icon: "success",
               draggable: true,
            });
         })
         .catch((error) => {
            Swal.fire({
               title: "Failed to logout",
               html: `<p class='swal-text'>${error.message}</p>`,
               icon: "error",
               draggable: true,
            });
         });
   };
   const navbarLinks = (
      <>
         <li>
            <NavLink
               to={"/"}
               className={
                  " px-2 py-0.5 rounded-lg text-gray-600 hover:text-primary-content hover:bg-transparent transition-all duration-300 relative"
               }
            >
               <span className="relative !font-nunito px-2">
                  Home
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-green-500 rounded-full opacity-0 transition-opacity duration-300 [.active_&]:opacity-100"></div>
               </span>
            </NavLink>
         </li>
         <li>
            <NavLink
               to={`./available-camps`}
               className={
                  "!font-nunito px-4 py-0.5 rounded-lg text-gray-600 hover:text-primary-content hover:bg-transparent transition-all duration-300 relative"
               }
            >
               <span className="relative !font-nunito">
                  Available Camps
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-green-500 rounded-full opacity-0 transition-opacity duration-300 [.active_&]:opacity-100"></div>
               </span>
            </NavLink>
         </li>
      </>
   );
   return (
      <div className="">
         {/* Top Bar */}
         <div className="bg-blue-900/90 backdrop-blur-sm text-white py-2 px-4">
            <div className="container mx-auto flex justify-between items-center text-sm">
               <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                     <Phone className="w-4 h-4" />
                     <span>+91 98765 43210</span>
                  </div>
                  <div className="flex items-center space-x-2">
                     <Mail className="w-4 h-4" />
                     <span>info@medicalcamps.org</span>
                  </div>
               </div>
               <div className="hidden md:block">
                  <span>Emergency Hotline: 1800-123-4567</span>
               </div>
            </div>
         </div>

         {/* Main Header */}
         <nav className="bg-white/95 backdrop-blur-sm shadow-lg">
            <div className="container mx-auto px-4 py-4">
               <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                     {/* Logo */}
                     <Link className="hidden lg:flex">
                        <div className="flex items-center space-x-3">
                           <div className="relative w-12 h-12 rounded-xl flex items-center justify-center shadow-lg">
                              {/* Medical logo */}
                              <div>
                                 <img src="/logo.png" alt="" />
                              </div>
                              {/* Caring Hands */}
                              <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-white/80 rounded-full transform rotate-12"></div>
                              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-white/80 rounded-full transform -rotate-12"></div>
                              {/* Pulse Effect */}
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 to-green-400/30 rounded-xl animate-pulse"></div>
                           </div>
                           <div>
                              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-700 to-green-600 bg-clip-text text-transparent">
                                 CareConnect
                              </h1>
                              <p className="text-sm text-gray-600 font-medium">
                                 Medical Camps
                              </p>
                           </div>
                        </div>
                     </Link>
                     <div className="dropdown">
                        <div
                           tabIndex={0}
                           role="button"
                           className="btn btn-ghost lg:hidden border-gray-100"
                        >
                           <Menu className="w-6 h-6 text-gray-700" />
                        </div>
                        <ul
                           tabIndex={0}
                           className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                        >
                           {navbarLinks}
                        </ul>
                     </div>
                  </div>

                  <div className="flex items-center space-x-4">
                     <ul className="menu menu-horizontal px-1 text-lg font-medium gap-1 items-center hidden lg:flex">
                        {navbarLinks}
                     </ul>

                     <div className="flex items-center gap-5">
                        {user ? (
                           /* User Profile Dropdown */
                           <div className="group relative">
                              <div>
                                 <button
                                    ref={dropdownRef}
                                    tabIndex={0}
                                    className="btn btn-ghost btn-circle avatar w-13 h-13 "
                                    onClick={() => setIsOpen((prev) => !prev)}
                                 >
                                    {userInfo?.photo ? (
                                       <img
                                          className="rounded-full ring-2 ring-[#545f72] object-cover"
                                          alt="user_image"
                                          src={userInfo && userInfo?.photo}
                                          data-tooltip-id="my-tooltip"
                                          data-tooltip-content={
                                             userInfo && userInfo?.name
                                          }
                                       />
                                    ) : (
                                       <div className="w-full h-full bg-gradient-to-br from-blue-500 to-green-500 rounded-full !flex items-center justify-center">
                                          <User className="w-8 text-white" />
                                       </div>
                                    )}
                                 </button>
                                 <Tooltip
                                    id="my-tooltip"
                                    className="z-50 text-sm"
                                 />
                              </div>
                              {/* Dropdown Menu */}
                              <div
                                 className={`absolute right-0 top-full mt-3 min-w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 opacity-0 invisible transition-all duration-300 transform ${
                                    isOpen
                                       ? "visible translate-y-0 opacity-100"
                                       : "translate-y-2"
                                 }`}
                              >
                                 <div className="p-4 border-b border-gray-100">
                                    <div className="flex items-center space-x-3">
                                       {userInfo?.photo ? (
                                          <img
                                             src={userInfo?.photo}
                                             alt={userInfo?.name || "User"}
                                             className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                                          />
                                       ) : (
                                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                                             <User className="w-6 h-6 text-white" />
                                          </div>
                                       )}
                                       <div>
                                          <h3 className="font-semibold text-slate-800">
                                             {userInfo?.name || "User"}
                                          </h3>
                                          <p className="text-xs text-gray-600">
                                             {userInfo?.email}
                                          </p>
                                       </div>
                                    </div>
                                 </div>

                                 <div className="p-2">
                                    <Link
                                       to={
                                          role === "Participant"
                                             ? "/dashboard/analytics"
                                             : "/dashboard/add-camp"
                                       }
                                       className="flex items-center text-sm space-x-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors duration-200"
                                    >
                                       <LayoutDashboard className="w-5 h-5" />
                                       <span>Dashboard</span>
                                    </Link>

                                    <hr className="my-2 border-gray-100" />
                                    <button
                                       onClick={handleLogout}
                                       className="w-full flex items-center text-sm space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors duration-200"
                                    >
                                       <LogOut className="w-5 h-5" />
                                       <span>Sign Out</span>
                                    </button>
                                 </div>
                              </div>
                           </div>
                        ) : (
                           /* Login Button for Non-authenticated Users */
                           <button
                              onClick={() => navigate("./authentication/login")}
                              className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
                           >
                              Join Camp
                           </button>
                        )}
                     </div>
                  </div>
               </div>
            </div>
         </nav>
      </div>
   );
};

export default Navbar;
