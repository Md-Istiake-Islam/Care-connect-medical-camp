import React, { useState } from "react";
import { X, CreditCard } from "lucide-react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../Form/CheckoutForm";
import { TbCurrencyTaka } from "react-icons/tb";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_Stripe_Key);

const PaymentModal = ({ isOpen, onClose, camp, currentPage }) => {
   if (!isOpen || !camp) return null;

   return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
         <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full border border-gray-100">
            {/* Header */}
            <div className="p-6 border-b border-gray-100">
               <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                     <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                        <CreditCard className="w-6 h-6 text-white" />
                     </div>
                     <div>
                        <h2 className="text-2xl font-bold text-slate-800">
                           Payment
                        </h2>
                        <p className="text-gray-600">
                           Secure payment processing
                        </p>
                     </div>
                  </div>
                  <button
                     onClick={onClose}
                     className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors duration-200"
                  >
                     <X className="w-5 h-5 text-gray-600" />
                  </button>
               </div>
            </div>

            {/* Content */}
            <div className="p-6">
               {/* Payment Summary */}
               <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-4 mb-6 border border-blue-100">
                  <h3 className="font-semibold text-slate-800 mb-2">
                     {camp.campName}
                  </h3>
                  <div className="flex justify-between items-center">
                     <span className="text-gray-600">Amount to pay:</span>
                     <span className="text-xl font-bold text-slate-800 flex items-center">
                        {camp.campFees} <TbCurrencyTaka className="text-2xl" />
                     </span>
                  </div>
               </div>

               {/* Payment Method Selection */}
               <div className="mb-6">
                  <h4 className="font-semibold text-slate-800 mb-3">
                     Payment Method
                  </h4>
                  <div className="w-full">
                     <div
                        className={`w-full p-3 rounded-xl border-2 transition-all duration-200 border-blue-500 bg-blue-50 text-blue-700 text-center`}
                     >
                        <CreditCard className="w-8 h-8 mx-auto mb-1" />
                        <span className="text-sm font-medium">
                           Secure Credit Card Payment
                        </span>
                     </div>
                  </div>
               </div>

               {/* Stripe Payment Method Form*/}
               <div>
                  {
                     <Elements stripe={stripePromise}>
                        <CheckoutForm
                           onClose={onClose}
                           camp={camp}
                           currentPage={currentPage}
                        />
                     </Elements>
                  }
               </div>
            </div>
         </div>
      </div>
   );
};

export default PaymentModal;
