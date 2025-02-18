"use client";
import axios from "axios";
const imgbb_api_key = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
const imgbb_api_url = `https://api.imgbb.com/1/upload?key=${imgbb_api_key}`;

const useToGetImgUrl = () => {
  const getImageUrl = async (imgFile: FileList | File[]) => {
    try {
      const formData = new FormData();
      formData.append('image', imgFile[0]);

      const response = await axios.post(imgbb_api_url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const imageUrl = response.data?.data.url;
      return imageUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  return getImageUrl;
};

export default useToGetImgUrl;
