import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import "./checkoutForm.css";
import { Lock, ShieldAlert } from "lucide-react";
import { TbCurrencyTaka } from "react-icons/tb";
import axiosSecure from "../../../Utility/axiosSecure";
import useSendTransaction from "../../../Hooks/useSendTransaction";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const CheckoutForm = ({ onClose, camp, currentPage }) => {
   const stripe = useStripe();
   const elements = useElements();

   const { mutateAsync } = useSendTransaction({ currentPage });

   const [isProcessing, setIsProcessing] = useState(false);
   const [cardError, setCardError] = useState(null);

   const handleSubmit = async (event) => {
      setIsProcessing(true);
      // Block native form submission.
      event.preventDefault();

      if (!stripe || !elements) {
         // Stripe.js has not loaded yet. Make sure to disable
         // form submission until Stripe.js has loaded.
         return;
      }

      // Get a reference to a mounted CardElement. Elements knows how
      // to find your CardElement because there can only ever be one of
      // each type of element.
      const card = elements.getElement(CardElement);

      if (card == null) {
         return;
      }

      // Use your card Element with other Stripe.js APIs
      const { error, paymentMethod } = await stripe.createPaymentMethod({
         type: "card",
         card,
      });

      if (error) {
         setCardError(error.message);
         setIsProcessing(false);
      } else {
         setCardError(null);
         const { data: clientSecret } = await axiosSecure.post(
            `/create-client-intent?paymentId=${camp?._id}`
         );

         const { error, paymentIntent } = await stripe.confirmCardPayment(
            clientSecret,
            {
               payment_method: {
                  card: card,
                  billing_details: {
                     name: camp?.participantName,
                     email: camp?.participantEmail,
                  },
               },
            }
         );

         if (error) {
            // Show error to your customer
            setCardError(error.message);
         } else if (paymentIntent.status === "succeeded") {
            // The payment is complete!
            setCardError(null);
            try {
               const paymentDate = new Date().toISOString();
               const orderedCamp = {
                  orderId: camp?._id,
                  campId: camp?.campId,
                  campName: camp?.campName,
                  campFees: camp?.campFees,
                  campLocation: camp?.campLocation,
                  confirmationStatus: "confirm",
                  paymentStatus: "paid",
                  transactionId: paymentIntent.id,
                  participantName: camp?.participantName,
                  participantEmail: camp?.participantEmail,
                  regDate: camp?.registeredDate,
                  paymentDate,
               };
               const res = await mutateAsync(orderedCamp);
               console.log(res);
               console.log(res?.acknowledged);

               // check is payment completed of update data successfully
               if (res?.acknowledged && res?.modifiedCount > 0) {
                  console.log("hello");
                  toast.success("Payment completed successfully!");
               }
            } catch {
               (error) => {
                  setCardError(error.message);
               };
            } finally {
               setIsProcessing(false);
               onClose();
            }
         }
      }
   };

   return (
      <form onSubmit={handleSubmit} className="space-y-4">
         <div>
            <CardElement
               options={{
                  style: {
                     base: {
                        fontSize: "16px",
                        color: "#424770",
                        "::placeholder": {
                           color: "#aab7c4",
                        },
                     },
                     invalid: {
                        color: "#9e2146",
                     },
                  },
               }}
            />
         </div>

         {/* error handle */}

         {cardError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center space-x-2">
               <ShieldAlert className="w-5 h-5 text-red-600 " />
               <div>
                  <p className="text-sm text-red-700">{cardError}</p>
               </div>
            </div>
         )}

         {/* Security Notice */}
         <div className="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center space-x-2">
            <Lock className="w-5 h-5 text-green-600 " />
            <div>
               <p className="text-sm text-green-700">
                  Your payment information is encrypted and secure
               </p>
            </div>
         </div>

         {/* Submit Button */}

         <div className="flex space-x-3 pt-1">
            <button
               type="button"
               onClick={onClose}
               className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold transition-all duration-300"
            >
               Cancel
            </button>
            <button
               type="submit"
               disabled={isProcessing || !stripe}
               className="flex-1 bg-gradient-to-r from-green-600 to-blue-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
               {isProcessing ? (
                  <>
                     <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                     <span>Processing...</span>
                  </>
               ) : (
                  <>
                     <Lock className="w-5 h-5" />
                     <span className="flex items-center">
                        Pay {camp.campFees}
                        <TbCurrencyTaka className="text-xl" />
                     </span>
                  </>
               )}
            </button>
         </div>
      </form>
   );
};

export default CheckoutForm;
