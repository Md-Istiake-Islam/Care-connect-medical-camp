// src/hooks/useGoogleSignIn.js
import { useState, useCallback } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import axiosSecure from "../Utility/axiosSecure";

export const useGoogleSignIn = ({ googleSignIn, setUser, location }) => {
   const navigate = useNavigate();
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   const signInWithGoogle = useCallback(async () => {
      setLoading(true);
      setError(null);

      try {
         /* Google pop‑up */
         const { user } = await googleSignIn();
         setUser(user);

         const { displayName, email, photoURL } = user;
         const userData = { name: displayName, email, photo: photoURL };

         /* Check / create on backend */
         const res = await axiosSecure.post("/users", userData);
         if (res?.data?.insertedId || res?.data?.modifiedCount > 0) {
            Swal.fire({
               title: "Sign‑in successful",
               html: "<p class='swal-text'>Thank you for staying with us!</p>",
               icon: "success",
               draggable: true,
            });
            navigate(location.state || "/");
         }
      } catch (err) {
         setError(err);
         Swal.fire({
            title: "Oops…",
            text:
               err?.response?.data?.message ||
               err.message ||
               "Something went wrong.",
            icon: "error",
            draggable: true,
         });
      } finally {
         setLoading(false);
      }
   }, [googleSignIn, setUser, location, navigate]);

   return { signInWithGoogle, loading, error };
};
