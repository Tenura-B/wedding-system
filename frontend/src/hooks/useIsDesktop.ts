import { useState, useEffect } from 'react';

export default function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkIsDesktop = () => {
      if (typeof window === 'undefined') return;
      const isTouch = navigator.maxTouchPoints > 0 || 'ontouchstart' in window;
      const width = window.innerWidth;
      // Desktop: width is 1280px or higher, and it's either not a touch device
      // or it's a very large display (like > 1366px) where we still want desktop view.
      setIsDesktop(width >= 1280 && (!isTouch || width > 1366));
    };

    checkIsDesktop();
    window.addEventListener('resize', checkIsDesktop);
    return () => window.removeEventListener('resize', checkIsDesktop);
  }, []);

  return isDesktop;
}
