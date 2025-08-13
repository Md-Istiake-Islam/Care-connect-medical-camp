import axios from "axios";
import { useState, useCallback } from "react";

export const useUploadImgToImgBB = () => {
   //manage url, loading and error state
   const [url, setUrl] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   // create uploadImage function to upload file on the ImgBB server
   const uploadImage = useCallback(async (file) => {
      // guard for check if file doesn't exists
      if (!file) {
         setError("No file provided");
         return null;
      }

      // handle loading and error
      setLoading(true);
      setError(null);

      // try to upload image into the server
      try {
         //create new form data and set image as a child of form data
         const fd = new FormData();
         fd.append("image", file);

         //upload image to the server
         const { data } = await axios.post(
            `https://api.imgbb.com/1/upload?key=${
               import.meta.env.VITE_ImgBB_API_Key
            }`,
            fd,
            { headers: { "Content-Type": "multipart/form-data" } }
         );

         const imageUrl = data?.data?.url || null; // fallback to null
         setUrl(imageUrl);
         return imageUrl;
      } catch (err) {
         setError(err?.response?.data?.error?.message || err.message);
         return null;
      } finally {
         setLoading(false);
      }
   }, []);

   return { uploadImage, url, loading, error };
};
