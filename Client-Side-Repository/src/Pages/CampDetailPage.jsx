import React, { useState, useContext, useEffect, use } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router";
import { ArrowLeft, AlertCircle } from "lucide-react";
import AuthContext from "../Provider/AuthProvider/AuthContext";
import { useCampDetails } from "../Hooks/useCampDetails";
import LoadingSpinner from "../Components/Shared/LoadingElement/LoadingSpinner";
import toast from "react-hot-toast";
import ReqAndFacilities from "../Components/CampDetails/ReqAndFacilities";
import CampDetailCard from "../Components/CampDetails/CampDetailCard";
import CampDetailsSidebar from "../Components/CampDetails/CampDetailsSidebar";
import HeroSection from "../Components/CampDetails/HeroSection";
import JoinCampModal from "../Components/CampDetails/JoinCampModal";
import useCurrentUserRegCamps from "../Hooks/useCurrentUserRegCamps";
import useTitle from "../Hooks/useTitle";
import ThemeContext from "../Provider/ThemeProvider/ThemeContext";

const CampDetailPage = () => {
   //scroll to top
   useTitle("Camp details || careConnect medical");
   const { pathname } = useLocation();
   useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
   }, [pathname]);

   const navigate = useNavigate();
   const { user } = useContext(AuthContext);

   //get theme data from theme context
   const { darkMode } = useContext(ThemeContext);

   //set heading and title text style
   const textHT = darkMode ? "text-gray-200" : "text-gray-900";

   //set paragraph style
   const pStyle = darkMode ? "text-gray-400" : "text-gray-600";

   //container style
   const containerStyle = darkMode
      ? "bg-gray-800 border-gray-700/50"
      : "bg-white border-gray-100";

   //get id from params
   const { id } = useParams();

   // Fetch camp details using the custom hook
   const { camp, isLoading: isCampLoading } = useCampDetails({ id });
   const { currentUserRegCamps, isLoading: isCrtUserRegCampsLoading } =
      useCurrentUserRegCamps();

   // State to manage joining status and registration
   const [isJoining, setIsJoining] = useState(false);
   const [hasJoined, setHasJoined] = useState(false);

   // Check if the user is already registered for the camp
   useEffect(() => {
      if (isCampLoading || isCrtUserRegCampsLoading) return;
      if (currentUserRegCamps?.length > 0) {
         const isRegistered = currentUserRegCamps.some(
            (camp) => camp.campId === id
         );
         setHasJoined(isRegistered);
         console.log(currentUserRegCamps);
      }
   }, [
      id,
      camp,
      currentUserRegCamps,
      isCampLoading,
      isCrtUserRegCampsLoading,
      setHasJoined,
   ]);

   const handleShare = async () => {
      if (navigator.share) {
         await navigator.share({
            title: "Care Connect Camp",
            text: "Check out this amazing camp!",
            url: window.location.href,
         });
      } else {
         await navigator.clipboard.writeText(window.location.href);
         toast.success("Camp link copied to clipboard!");
      }
   };

   // State to manage the join camp modal visibility
   const [showJoinModal, setShowJoinModal] = useState(false);

   // Handle the join camp action
   if (!camp || isCampLoading) {
      return <LoadingSpinner />;
   }

   const {
      _id,
      campName,
      healthPro,
      imageUrl,
      location,
      date,
      time,
      participantCount,
      description,
      campFees,
      organizer,
   } = camp;

   const handleJoinCamp = async () => {
      if (!user) {
         navigate("./../../authentication/login");
         return;
      }

      setIsJoining(true);
      setShowJoinModal(true);
   };

   const handleModalClose = () => {
      setShowJoinModal(false);
   };
   return (
      <div
         className={`min-h-screen  pt-8 ${
            darkMode ? "bg-[#101828f6]" : "bg-gray-50"
         } `}
      >
         <div className="container mx-auto px-4 py-8">
            {/* Back Button */}
            <div className="mb-6">
               <Link
                  to="/available-camps"
                  className={`inline-flex items-center space-x-2  transition-colors duration-300 ${
                     darkMode
                        ? "text-gray-300 hover:text-slate-200"
                        : "text-gray-600 hover:text-slate-800"
                  }`}
               >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="font-medium">Back to All Camps</span>
               </Link>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
               {/* Main Content */}
               <div className="lg:col-span-2 space-y-8">
                  {/* Hero Section */}
                  <HeroSection
                     imageUrl={imageUrl}
                     campName={campName}
                     handleShare={handleShare}
                     campFees={campFees}
                     containerStyle={containerStyle}
                  />

                  {/* Camp Details */}
                  {
                     <CampDetailCard
                        date={date}
                        time={time}
                        location={location}
                        participantCount={participantCount}
                        healthPro={healthPro}
                        description={description}
                        containerStyle={containerStyle}
                        darkMode={darkMode}
                        pStyle={pStyle}
                        textHT={textHT}
                     />
                  }

                  {/* Requirements & Facilities */}
                  {
                     <ReqAndFacilities
                        containerStyle={containerStyle}
                        darkMode={darkMode}
                        pStyle={pStyle}
                        textHT={textHT}
                     />
                  }
               </div>

               {/* Sidebar */}
               <div>
                  {/* Join Camp Card */}
                  {
                     <CampDetailsSidebar
                        campFees={campFees}
                        organizer={organizer}
                        user={user}
                        isJoining={isJoining}
                        handleJoinCamp={handleJoinCamp}
                        hasJoined={hasJoined}
                        containerStyle={containerStyle}
                        darkMode={darkMode}
                        pStyle={pStyle}
                        textHT={textHT}
                     />
                  }
               </div>
            </div>
         </div>
         {/* Join Camp Modal */}
         <JoinCampModal
            isOpen={showJoinModal}
            onClose={handleModalClose}
            camp={camp}
            setIsJoining={setIsJoining}
            containerStyle={containerStyle}
            darkMode={darkMode}
            pStyle={pStyle}
            textHT={textHT}
         />
      </div>
   );
};

export default CampDetailPage;
