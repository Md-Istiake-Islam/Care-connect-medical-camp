import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import Routes from "./Router/Routes.jsx";
import AuthProvider from "./Provider/AuthProvider/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ToggleThemeProvider from "./Provider/ThemeProvider/ToggleThemeProvider.jsx";
import { Toaster } from "react-hot-toast";
import SearchProvider from "./Provider/SearchProivder/SearchProvider.jsx";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
   <StrictMode>
      <ToggleThemeProvider>
         <SearchProvider>
            <QueryClientProvider client={queryClient}>
               <AuthProvider>
                  <RouterProvider router={Routes} />
               </AuthProvider>

               {/* Toasts will show across all pages */}
               <Toaster
                  position="top-center"
                  reverseOrder={false}
                  toastOptions={{
                     duration: 5000,
                  }}
               />

               {/* Devtools */}
               <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
         </SearchProvider>
      </ToggleThemeProvider>
   </StrictMode>
);
