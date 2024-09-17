'use client'
import { useEffect } from "react";
const useToScrollTop = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);
};

export default useToScrollTop;
