import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToHash() {
  const location = useLocation();
  const prevPathname = useRef(location.pathname);
  const prevHash = useRef(location.hash);

  useEffect(() => {
    const isPathnameChanged = prevPathname.current !== location.pathname;
    const isHashChanged = prevHash.current !== location.hash;

    prevPathname.current = location.pathname;
    prevHash.current = location.hash;

    if (location.hash) {
      if (isPathnameChanged || isHashChanged) {
        const id = location.hash.replace('#', '');
        const scrollToElement = () => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        };

        const timer = setTimeout(scrollToElement, 80);
        return () => clearTimeout(timer);
      }
    } else if (isPathnameChanged || (isHashChanged && !location.hash)) {
      // Scroll to top when navigating to a different page or returning to page root without hash
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, location.hash]);

  return null;
}
