import React, { useEffect, useState } from "react";
import {
   BarChart3,
   ClipboardList,
   User,
   UserCog,
   BadgeCent,
} from "lucide-react";
import { Link, useLocation } from "react-router";

const ParticipantMenu = ({ darkMode }) => {
   // manage activated link
   const [activeLabel, setActiveLabel] = useState(null);
   const location = useLocation();

   const menuItems = [
      { icon: BarChart3, label: "Analytics", link: "/dashboard/analytics" },
      {
         icon: ClipboardList,
         label: "Registered Camps",
         link: "/dashboard/registered-camps",
      },
      {
         icon: BadgeCent,
         label: "Payment History",
         link: "/dashboard/payment-history",
      },
      {
         icon: User,
         label: "Profile status",
         link: "/dashboard/profile-status",
      },
      {
         icon: UserCog,
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

export default ParticipantMenu;
