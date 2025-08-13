import { MessageSquare, Star, XCircle } from "lucide-react";
import React, { useState } from "react";
import useSendFeedbackHook from "../../../Hooks/useSendFeedbackHook";
import toast from "react-hot-toast";

const FeedbackModal = ({ isOpen, onClose, camp, currentPage }) => {
   const [rating, setRating] = useState(0);
   const [feedback, setFeedback] = useState("");
   const [isSubmitting, setIsSubmitting] = useState(false);

   const { mutateAsync } = useSendFeedbackHook({ currentPage });

   const handleSubmit = async (e) => {
      setIsSubmitting(true);
      e.preventDefault();

      try {
         const userFeedback = {
            campId: camp?._id,
            participantEmail: camp?.participantEmail,
            rating: rating,
            feedbackGiven: feedback,
         };

         const res = await mutateAsync(userFeedback);

         if (res?.acknowledged && res?.modifiedCount > 0) {
            toast.success("Feedback submitted successfully!");
         }
      } catch {
         (error) => {
            toast.error("Failed to submit feedback. Please try again.");
         };
      } finally {
         setIsSubmitting(false);
         setFeedback("");
         setRating("");
         onClose();
      }
   };

   const handleCancel = () => {
      setFeedback("");
      setRating("");
      onClose();
   };

   if (!isOpen || !camp) return null;

   return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
         <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full border border-gray-100">
            <div className="p-6 border-b border-gray-100">
               <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                     <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-500 rounded-xl flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-white" />
                     </div>
                     <h3 className="text-xl font-bold text-slate-800">
                        Camp Feedback
                     </h3>
                  </div>
                  <button
                     onClick={onClose}
                     className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                  >
                     <XCircle className="w-4 h-4 text-gray-600" />
                  </button>
               </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
               <div className="mb-6">
                  <h4 className="font-semibold text-slate-800 mb-2">
                     {camp.campName}
                  </h4>
                  <p className="text-sm text-gray-600">{camp.location}</p>
               </div>

               {/* Rating */}
               <div className="mb-6">
                  <label className="block text-sm font-semibold text-slate-800 mb-3">
                     Rate your experience
                  </label>
                  <div className="flex space-x-2">
                     {[1, 2, 3, 4, 5].map((star) => (
                        <button
                           key={star}
                           type="button"
                           onClick={() => setRating(star)}
                           className={`w-8 h-8 rounded-full transition-colors ${
                              star <= rating
                                 ? "text-yellow-400 hover:text-yellow-500"
                                 : "text-gray-300 hover:text-gray-400"
                           }`}
                        >
                           <Star className="w-8 h-8 fill-current" />
                        </button>
                     ))}
                  </div>
               </div>

               {/* Feedback */}
               <div className="mb-6">
                  <label className="block text-sm font-semibold text-slate-800 mb-2">
                     Your feedback
                  </label>
                  <textarea
                     value={feedback}
                     onChange={(e) => setFeedback(e.target.value)}
                     rows={4}
                     className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white resize-none"
                     placeholder="Share your experience with this medical camp..."
                     required
                  />
               </div>

               {/* Buttons */}
               <div className="flex space-x-3">
                  <button
                     type="button"
                     onClick={() => handleCancel()}
                     className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold transition-all duration-300"
                  >
                     Cancel
                  </button>
                  <button
                     type="submit"
                     disabled={isSubmitting || rating === 0}
                     className="flex-1 bg-gradient-to-r from-blue-600 to-green-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                     {isSubmitting ? (
                        <>
                           <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                           <span>Submitting...</span>
                        </>
                     ) : (
                        <>
                           <MessageSquare className="w-4 h-4" />
                           <span>Submit Feedback</span>
                        </>
                     )}
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default FeedbackModal;
