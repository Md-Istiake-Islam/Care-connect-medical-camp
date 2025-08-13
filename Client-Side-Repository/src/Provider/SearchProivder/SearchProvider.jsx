import React, { useState } from "react";
import SearchContext from "./SearchContext";

const SearchProvider = ({ children }) => {
   // create search context
   const [searchTerm, setSearchTerm] = useState("");

   const SearchData = {
      searchTerm,
      setSearchTerm,
   };
   return (
      <SearchContext.Provider value={SearchData}>
         {children}
      </SearchContext.Provider>
   );
};

export default SearchProvider;
