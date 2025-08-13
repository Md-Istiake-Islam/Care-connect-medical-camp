import { Calendar } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { Controller } from "react-hook-form";

const DateTimeField = ({ errors, control, pStyle, darkMode }) => {
   // control datepicker open and close
   const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
   const [isClicked, setIsClicked] = useState(false);
   const wrapperRef = useRef(null);

   useEffect(() => {
      const handelClickOutSideWrapper = (e) => {
         if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
            setIsDatePickerOpen(false);
         }
      };
      const cleanClickEventListener = () => {
         document.addEventListener("click", handelClickOutSideWrapper);
      };

      return () => cleanClickEventListener();
   }, []);

   return (
      <div>
         <label className="flex items-center justify-between mb-2">
            <div
               className={`flex items-center text-sm font-semibold ${pStyle}`}
            >
               <Calendar className="w-4 h-4 mr-2 text-purple-600" />
               Date & Time *
            </div>
            {errors.dateObj && (
               <p className="text-red-500 text-sm mt-1">
                  {errors.dateObj.message}
               </p>
            )}
         </label>

         <div
            ref={wrapperRef}
            className={`relative border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
               darkMode
                  ? "bg-gray-600/20 hover:bg-gray-600/30 border-gray-700"
                  : " bg-gray-50 border-gray-300 hover:border-gray-400"
            }`}
         >
            <Controller
               name="dateObj"
               control={control}
               rules={{
                  required: "Date & Time is required",
               }}
               render={({ field }) => (
                  <>
                     <DatePicker
                        {...field}
                        selected={field.value}
                        onChange={(date) => {
                           field.onChange(date);
                           setIsDatePickerOpen((prev) => !prev);
                        }}
                        showTimeSelect
                        timeFormat="hh:mm aa"
                        dateFormat="MMMM d, yyyy h:mm aa"
                        placeholderText="Select date and time"
                        open={isDatePickerOpen}
                        popperClassName="!z-50"
                        className={`w-full px-4 py-3 focus:border-0 focus:outline-0 z-50 ${
                           darkMode ? " text-gray-300" : " "
                        }`}
                     />

                     {/* clickable calendar icon */}
                     <button
                        type="button"
                        onClick={() => {
                           setIsDatePickerOpen((prev) => !prev);
                           setIsClicked((pre) => !pre);
                           setTimeout(() => {
                              setIsClicked((pre) => !pre);
                           }, 100);
                        }}
                        className={`${
                           isClicked ? "scale-95" : "scale-100"
                        } absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none`}
                     >
                        <Calendar />
                     </button>
                  </>
               )}
            />
         </div>
      </div>
   );
};

export default DateTimeField;
