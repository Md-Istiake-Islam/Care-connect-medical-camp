import React, { useState, useEffect, useContext } from "react";
import {
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   ResponsiveContainer,
   LineChart,
   Line,
} from "recharts";
import { Activity, Edit3 } from "lucide-react";
import useParticipantStats from "../../../Hooks/useParticipantStats";
import LoadingSpinner from "../../Shared/LoadingElement/LoadingSpinner";
import StatCard from "../Components/StatCard";
import { Link } from "react-router";
import ThemeContext from "../../../Provider/ThemeProvider/ThemeContext";
import useTitle from "../../../Hooks/useTitle";

const AnalyticsPage = () => {
   //scroll to top
   useTitle("Analytics Dashboard || CareConnect Medical Camp");
   const { stats, paymentStats } = useParticipantStats();
   const { theme } = useContext(ThemeContext);
   const [darkMode, setDarkMode] = useState(false);

   // set theme
   useEffect(() => {
      setDarkMode(theme === "dark" ? true : false);
   }, [setDarkMode, theme, darkMode]);

   if (!stats || !paymentStats) {
      return <LoadingSpinner />;
   }

   // set container style
   const containerStyle = darkMode
      ? "bg-gray-800 border-gray-700"
      : "bg-white border-gray-200";

   //set heading and title text style
   const textHT = darkMode ? "text-slate-200" : "text-slate-800";

   //set paragraph style
   const pStyle = darkMode ? "text-gray-400" : "text-gray-600";

   return (
      <div
         className={`${
            darkMode ? "bg-gray-900" : "bg-gray-50"
         }min-h-screen pt-8`}
      >
         <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
               <div className="flex items-center justify-between">
                  <div>
                     <h1
                        className={` text-4xl font-bold  mb-2 ${
                           darkMode ? "text-white" : "text-slate-800"
                        }`}
                     >
                        Analytics Dashboard
                     </h1>
                     <p className={`${pStyle}`}>
                        Track your registered camps and payment history
                     </p>
                  </div>

                  <Link
                     to={`/dashboard/payment-history`}
                     className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center space-x-2"
                  >
                     <Edit3 className="w-5 h-5" />
                     <span>Payment History</span>
                  </Link>
               </div>
            </div>

            {/* Key Metrics */}
            <StatCard
               stats={stats}
               containerStyle={containerStyle}
               pStyle={pStyle}
               textHT={textHT}
               darkMode={darkMode}
            />

            {/* Revenue Trends */}
            <div
               className={`mt-8 rounded-2xl shadow-lg p-6 border ${containerStyle}`}
            >
               <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                     <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                        <Activity className="w-5 h-5 text-green-600" />
                     </div>
                     <h3 className={`${textHT} text-xl font-bold `}>
                        Revenue Trends
                     </h3>
                  </div>
               </div>
               <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={paymentStats}>
                     <CartesianGrid
                        strokeDasharray="3 3"
                        stroke={`${darkMode ? "#343435" : "#f0f0f0"}`}
                     />
                     <XAxis dataKey="date" stroke="#6b7280" />
                     <YAxis stroke="#6b7280" />
                     <Tooltip
                        contentStyle={{
                           backgroundColor: "white",
                           border: `1px solid #e5e7eb ${
                              darkMode ? "#616167" : "#e5e7eb"
                           }`,
                           borderRadius: "12px",
                           boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                        }}
                     />
                     <Line
                        type="monotone"
                        dataKey="totalPay"
                        stroke="#10B981"
                        strokeWidth={3}
                        dot={{ fill: "#10B981", strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8, stroke: "#10B981", strokeWidth: 2 }}
                     />
                  </LineChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>
   );
};

export default AnalyticsPage;
