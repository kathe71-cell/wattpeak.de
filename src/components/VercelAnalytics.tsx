import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';

export default function VercelAnalytics() {
  const location = useLocation();

  useEffect(() => {
    // Explicitly notify Vercel Web Analytics on SPA client route changes
    if (typeof window !== 'undefined' && window.va) {
      window.va('pageview', {
        route: location.pathname + location.search
      });
    }
  }, [location]);

  return <Analytics />;
}
