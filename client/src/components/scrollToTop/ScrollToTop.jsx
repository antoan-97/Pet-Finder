import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Force immediate scroll without smooth behavior
    window.scrollTo(0, 0);
    
    // Alternative: if you want to keep smooth scrolling, 
    // wrap it in a setTimeout to ensure it runs after route change
    // setTimeout(() => {
    //   window.scrollTo({
    //     top: 0,
    //     left: 0,
    //     behavior: 'smooth'
    //   });
    // }, 0);
  }, [pathname]);

  return null;
}
