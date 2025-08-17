import React, { useEffect, useState } from "react";
import {
   ClipboardPlus,
   ClipboardPen,
   User,
   UserRoundCog,
   ClipboardList,
   BarChart3,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import useUserInfo from "../../../Hooks/useUserInfo";

const OrganizerMenu = ({ darkMode }) => {
   // manage activated link
   const [activeLabel, setActiveLabel] = useState(null);
   const location = useLocation();

   const menuItems = [
      { icon: BarChart3, label: "Analytics", link: "/dashboard/analytics" },
      { icon: ClipboardPlus, label: "Add A Camp", link: "/dashboard/add-camp" },
      {
         icon: ClipboardPen,
         label: "Manage Camps",
         link: "/dashboard/manage-camps",
      },
      {
         icon: ClipboardList,
         label: "Manage Registered Camps",
         link: "/dashboard/manage-reg-camps",
      },
      {
         icon: User,
         label: "Profile status",
         link: "/dashboard/profile-status",
      },
      {
         icon: UserRoundCog,
         label: "Update Profile",
         link: "/dashboard/update-profile",
      },
   ];

   useEffect(() => {
      const currentPath = location.pathname;
      const currentMenu = menuItems.find((item) =>
         currentPath.includes(item.link)
      );
      setActiveLabel(currentMenu?.label);
   }, [setActiveLabel, location]);

   return (
      <div>
         {menuItems.map((item, index) => (
            <Link
               key={index}
               to={item.link}
               onClick={() => setActiveLabel(item.label)}
               className={`flex items-center px-3 py-3 mb-1 text-sm font-medium rounded-lg transition-colors duration-150 ${
                  item.label === activeLabel
                     ? `${
                          darkMode
                             ? "bg-blue-900 text-blue-200"
                             : "bg-blue-50 text-blue-700 "
                       }`
                     : ` ${
                          darkMode
                             ? "text-gray-300 hover:bg-gray-700"
                             : "text-gray-700 hover:bg-gray-50"
                       }`
               }`}
            >
               <item.icon size={20} className="mr-3" />
               {item.label}
            </Link>
         ))}
      </div>
   );
};

export default OrganizerMenu;
