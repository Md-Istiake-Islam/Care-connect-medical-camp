import React, { useContext, useEffect, useRef, useState } from "react";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import { MdLocationOn, MdEmail, MdPhone } from "react-icons/md";
import useTitle from "../Hooks/useTitle";
import { useLocation } from "react-router";
import ThemeContext from "@/Provider/ThemeProvider/ThemeContext";

const ContactUs = () => {
   //scroll to top
   useTitle("Contact Us");
   const { pathname } = useLocation();
   useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
   }, [pathname]);

   // get theme control from Theme Context
   const { darkMode } = useContext(ThemeContext);

   ///set heading and title text style
   const textHT = darkMode ? "text-gray-100" : "text-gray-900";

   //set paragraph style
   const pStyle = darkMode ? "text-gray-400" : "text-gray-600";

   //set paragraph style
   const inputStyle = darkMode
      ? "bg-gray-600/20 hover:bg-gray-600/30 border-gray-700 text-gray-300"
      : "bg-gray-50 border-gray-200 text-gray-900";

   //container style
   const containerStyle = darkMode
      ? "bg-gray-800 border-gray-700/50"
      : "bg-white border-gray-100";

   const formRef = useRef();
   const sendEmail = (e) => {
      e.preventDefault();

      emailjs
         .sendForm(
            "service_8bl2vxp",
            "template_yecjvuc",
            formRef.current,
            "qahIymn_Q94fKWfC3"
         )
         .then(() => {
            Swal.fire({
               icon: "success",
               title: "Message Sent",
               text: "Thank you for contacting us! We'll get back to you soon.",
               confirmButtonColor: "#75c544",
            });
            formRef.current.reset();
         })
         .catch(() => {
            Swal.fire({
               icon: "error",
               title: "Message Failed",
               text: "Oops! Something went wrong. Please try again.",
               confirmButtonColor: "#d33",
            });
         });
   };

   return (
      <div
         className={` min-h-screen py-16 px-4 lg:px-0 ${
            darkMode ? "bg-[#101828f6]" : "bg-gray-50"
         }`}
      >
         <div className="container mx-auto max-w-6xl">
            <div className="text-center  mb-12">
               <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${textHT}`}>
                  Get in touch with, Us
               </h1>
               <p className={`max-w-3xl mx-auto ${pStyle}`}>
                  Have questions, feedback, or just want to say hello? We're
                  here to help you grow! Reach out using the form below or find
                  our contact details to connect directly.
               </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10">
               {/* Contact Form */}
               <form
                  ref={formRef}
                  onSubmit={sendEmail}
                  className={`rounded-2xl shadow-md p-8 space-y-5 ${containerStyle}`}
               >
                  <div>
                     <label
                        className={`label text-sm mb-2 font-semibold ${textHT}`}
                     >
                        Your Name *
                     </label>
                     <input
                        type="text"
                        name="from_name"
                        placeholder="Enter your name"
                        className={`w-full px-4 py-2 rounded-lg border  ${inputStyle}`}
                        required
                     />
                  </div>
                  <div>
                     <label
                        className={`label text-sm mb-2 font-semibold ${textHT}`}
                     >
                        Your Email *
                     </label>
                     <input
                        type="email"
                        name="reply_to"
                        placeholder="Enter your email"
                        className={`w-full px-4 py-2 rounded-lg border ${inputStyle}`}
                        required
                     />
                  </div>
                  <div>
                     <label
                        className={`label text-sm mb-2 font-semibold ${textHT}`}
                     >
                        Your Message *
                     </label>
                     <textarea
                        name="message"
                        className={`textarea textarea-ghost !border-1 w-full rounded-lg ${inputStyle}`}
                        rows="5"
                        placeholder="Write your message here..."
                        required
                     ></textarea>
                  </div>
                  <button
                     type="submit"
                     className={
                        "bg-gradient-to-r from-blue-600 to-green-500 text-white text-sm py-1.5 px-6 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:scale-[1.02] flex items-center justify-center space-x-2"
                     }
                  >
                     Send Message
                  </button>
               </form>

               {/* Contact Info */}
               <div className="space-y-8">
                  <div
                     className={`rounded-2xl shadow-md p-6 flex items-start gap-4 ${containerStyle}`}
                  >
                     <MdEmail className={`text-3xl ${textHT}`} />
                     <div>
                        <h3 className={`font-semibold text-lg mb-2 ${textHT}`}>
                           Email Us
                        </h3>
                        <p className={`text-sm ${pStyle}`}>
                           support@lostify.com
                        </p>
                     </div>
                  </div>
                  <div
                     className={`rounded-2xl shadow-md p-6 flex items-start gap-4 ${containerStyle}`}
                  >
                     <MdPhone className={`text-3xl ${textHT}`} />
                     <div>
                        <h3 className={`font-semibold text-lg mb-2 ${textHT}`}>
                           Call Us
                        </h3>
                        <p className={`text-sm ${pStyle}`}>+880 1234 567890</p>
                     </div>
                  </div>
                  <div
                     className={`rounded-2xl shadow-md p-6 flex items-start gap-4 ${containerStyle}`}
                  >
                     <MdLocationOn className={`text-3xl ${textHT}`} />
                     <div>
                        <h3 className={`font-semibold text-lg mb-2 ${textHT}`}>
                           Visit Us
                        </h3>
                        <p className={`text-sm ${pStyle}`}>
                           123 Green Lane, Dhaka, Bangladesh
                        </p>
                     </div>
                  </div>

                  <div className="rounded-lg overflow-hidden shadow">
                     <iframe
                        title="Google Maps"
                        className="w-full h-60 border-0"
                        src="https://maps.google.com/maps?q=Dhaka%20Bangladesh&t=&z=13&ie=UTF8&iwloc=&output=embed"
                        allowFullScreen
                        loading="lazy"
                     ></iframe>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default ContactUs;
