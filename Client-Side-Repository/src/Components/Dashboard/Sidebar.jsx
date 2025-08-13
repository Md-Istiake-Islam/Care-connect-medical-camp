import React, { useContext, useEffect, useRef, useState } from "react";
import { House, LogOut, User, UserCog, X } from "lucide-react";
import OrganizerMenu from "./SidebarMenu/OrganizerMenu";
import ParticipantMenu from "./SidebarMenu/ParticipantMenu";
import useUserInfo from "../../Hooks/useUserInfo";
import AuthContext from "../../Provider/AuthProvider/AuthContext";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router";

const Sidebar = ({ sidebarOpen, setSidebarOpen, darkMode, textHT, pStyle }) => {
   //manage location
   const navigate = useNavigate();
   // get user info
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
   }, [role]);

   const handleLogout = () => {
      logOut()
         .then(() => {
            Swal.fire({
               title: "logout successfully",
               icon: "success",
               draggable: true,
            });
            navigate("/");
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

   return (
      <>
         {/* Close side bar if click out side of side bar */}
         {sidebarOpen && (
            <div
               className="fixed inset-0 bg-black/20 z-40 lg:hidden "
               onClick={() => setSidebarOpen(false)}
            />
         )}

         {/* Sidebar */}
         <div
            className={`fixed inset-y-0 left-0 z-50 w-72 shadow-xl transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
               sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } ${darkMode ? "bg-gray-800" : "bg-white"}`}
         >
            <div
               className={`flex items-center justify-between h-16 px-6 border-b ${
                  darkMode ? "border-gray-700" : "border-gray-200"
               }`}
            >
               <h2 className={`text-xl font-bold ${textHT}`}>Dashboard</h2>
               <button
                  onClick={() => setSidebarOpen(false)}
                  className={`lg:hidden text-gray-500 hover:text-gray-700  ${
                     darkMode
                        ? "text-gray-400 hover:text-gray-200"
                        : "text-gray-500 hover:text-gray-700"
                  }`}
               >
                  <X size={24} />
               </button>
            </div>

            <nav className="mt-6 px-3">
               {!!role && role === "Organizer" ? (
                  <OrganizerMenu darkMode={darkMode} />
               ) : !!role && role === "Participant" ? (
                  <ParticipantMenu darkMode={darkMode} />
               ) : null}
            </nav>

            <div
               className={`absolute bottom-0 left-0 right-0  border-t ${
                  darkMode ? "border-gray-700" : "border-gray-200"
               }`}
            >
               <div className="relative ">
                  <div
                     className={`flex items-center p-4 relative z-20 ${
                        darkMode ? "bg-gray-800" : "bg-white"
                     }`}
                  >
                     <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center relative group">
                        <button
                           ref={dropdownRef}
                           tabIndex={0}
                           className="btn btn-ghost btn-circle avatar w-full h-full"
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
                     </div>
                     <div className="ml-3">
                        <p className={`text-sm font-medium ${pStyle}`}>
                           {userInfo && userInfo?.name}
                        </p>
                        <p
                           className={`text-xs   ${
                              darkMode ? "text-gray-400" : "text-gray-500"
                           }`}
                        >
                           {userInfo && userInfo?.email}
                        </p>
                     </div>
                  </div>
                  {/* Popup Menu */}
                  <div
                     className={`absolute left-2 -top-42 min-w-54  rounded-2xl shadow-sm border   transition-all origin-bottom-left duration-300 transform z-10 ${
                        isOpen
                           ? "visible translate-y-0 opacity-100"
                           : " translate-y-2 opacity-0 invisible"
                     } ${
                        darkMode
                           ? "bg-gray-700 border-gray-600"
                           : "bg-gray-50 border-gray-100"
                     }`}
                  >
                     <div className="p-2">
                        <Link
                           to="/"
                           className={`flex items-center text-sm space-x-3 px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors duration-200 ${
                              darkMode ? "text-gray-100" : "text-gray-700"
                           }`}
                        >
                           <House className="w-5 h-5" />
                           <span>Home</span>
                        </Link>
                        <Link
                           to="/dashboard"
                           className={`flex items-center  text-sm space-x-3 px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors duration-200 ${
                              darkMode ? "text-gray-100" : "text-gray-700"
                           }`}
                        >
                           <UserCog className="w-5 h-5" />
                           <span>Update Profile</span>
                        </Link>

                        <hr className="my-1 border-gray-200" />
                        <button
                           onClick={handleLogout}
                           className={`w-full flex items-center text-sm space-x-3 px-4 py-3  hover:bg-red-50 rounded-xl transition-colors duration-200 ${
                              darkMode
                                 ? "text-red-400 font-semibold"
                                 : "text-red-600"
                           }`}
                        >
                           <LogOut className="w-5 h-5" />
                           <span>Sign Out</span>
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default Sidebar;
