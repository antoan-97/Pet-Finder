import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Add a small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      // Reset scroll position
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
      // Restore smooth scroll behavior
      document.documentElement.style.scrollBehavior = 'smooth';
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  return null;
}
