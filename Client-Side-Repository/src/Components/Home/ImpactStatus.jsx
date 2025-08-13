import React, { useContext, useEffect } from "react";
import {
   Heart,
   Users,
   Stethoscope,
   TrendingUp,
   MapPin,
   Star,
   MessageCircle,
   ThumbsUp,
} from "lucide-react";
import useImpactStats from "../../Hooks/useImpactStats";
import useGetFeedBack from "../../Hooks/useGetFeedBack";
import LoadingSpinner from "../Shared/LoadingElement/LoadingSpinner";
import StatCard from "./Cards/StatCard";
import { Link } from "react-router";
import AuthContext from "../../Provider/AuthProvider/AuthContext";

const ImpactStatus = () => {
   //get use from auth context
   const { user } = useContext(AuthContext);

   const { impactStats, isLoading: impactLoading } = useImpactStats();
   const { Feedback, feedBackStats, isLoading } = useGetFeedBack();

   if (
      !impactStats ||
      !Feedback ||
      !feedBackStats ||
      isLoading ||
      impactLoading
   ) {
      return <LoadingSpinner />;
   }

   const stats = [
      {
         icon: Users,
         number: `${impactStats?.participantCount}+`,
         label: "Lives Touched",
         color: "from-blue-500 to-blue-600",
      },
      {
         icon: Stethoscope,
         number: `${impactStats?.camps}+`,
         label: "Medical Camps",
         color: "from-green-500 to-green-600",
      },
      {
         icon: Heart,
         number: `${impactStats?.uniqueDoctorCount}+`,
         label: "Doctors Participated",
         color: "from-red-500 to-red-600",
      },
      {
         icon: Star,
         number: `${feedBackStats?.averageRatings}/5`,
         label: "Average Rating",
         color: "from-yellow-400 to-yellow-500",
      },
      {
         icon: MessageCircle,
         number: `${feedBackStats?.totalFeedback}+`,
         label: "Feedback Received",
         color: "from-blue-400 to-blue-500",
      },
      {
         icon: ThumbsUp,
         number: `${(feedBackStats?.averageRatings / 5) * 100}%`,
         label: "Positive Feedback Rate",
         color: "from-teal-500 to-teal-600",
      },
   ];
   return (
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-12">
               <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  Our Impact in Numbers
               </h2>
               <p className="text-gray-600 max-w-2xl mx-auto">
                  Transforming communities through accessible healthcare and
                  making a measurable difference in people's lives
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {stats.map((stat, index) => (
                  <StatCard key={index} stat={stat} />
               ))}
            </div>

            <div className="mt-12 text-center">
               <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                     Join Our Mission
                  </h3>
                  <p className="text-gray-600 mb-6">
                     Every medical camp we organize brings hope and healing to
                     underserved communities. Your support helps us reach more
                     people and save more lives.
                  </p>
                  {!user ? (
                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to={"./authentication/login"}>
                           <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-green-600 text-white rounded-lg hover:from-blue-700 hover:to-green-700 transition-all font-semibold transform hover:scale-105">
                              SignIn to continue
                           </button>
                        </Link>
                        <Link to={"./authentication/register"}>
                           <button className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all font-semibold">
                              join with us
                           </button>
                        </Link>
                     </div>
                  ) : (
                     <div className="flex justify-center">
                        <div className="px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold">
                           Thanks for join with us
                        </div>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </section>
   );
};

export default ImpactStatus;
