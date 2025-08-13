import React, { useCallback } from "react";

export const useFormateDateTime = () => {
   const formateDateTime = useCallback((dateObj) => {
      // Format date: YYYY-MM-DD
      console.log(dateObj);
      const formattedDate = dateObj.toISOString().split("T")[0];

      // Format time: 12-hour with AM/PM
      const hours24 = dateObj.getHours();
      const minutes = dateObj.getMinutes();
      const hours12 = hours24 % 12 || 12;
      const ampm = hours24 >= 12 ? "PM" : "AM";

      const formattedTime = `${hours12.toString().padStart(2, "0")}:${minutes
         .toString()
         .padStart(2, "0")} ${ampm}`;

      return { formattedDate, formattedTime };
   }, []);
   return { formateDateTime };
};
