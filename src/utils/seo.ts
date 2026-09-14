import { useEffect } from 'react';

export interface SeoMetaProps {
  title: string;
  description: string;
  canonicalPath: string; // e.g. "/ertragsrechner" or "/"
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
}

const BASE_URL = 'https://wattpeak.de';

/**
 * Sauberes, robustes Metadaten- & Canonical-Management für alle SPA-Routen
 */
export function useDocumentMeta({ title, description, canonicalPath, structuredData }: SeoMetaProps) {
  useEffect(() => {
    // 1. Title
    const fullTitle = title.includes('wattpeak.de') ? title : `${title} | wattpeak.de`;
    document.title = fullTitle;

    // 2. Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', description);

    // 3. Canonical URL
    const cleanPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
    const canonicalUrl = cleanPath === '/' ? `${BASE_URL}/` : `${BASE_URL}${cleanPath}`;
    
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 4. Open Graph Tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', fullTitle);
    
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);

    // 5. JSON-LD Structured Data
    let scriptTag = document.getElementById('page-structured-data');
    if (structuredData) {
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'page-structured-data';
        scriptTag.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(structuredData);
    } else if (scriptTag) {
      scriptTag.remove();
    }
  }, [title, description, canonicalPath, structuredData]);
}
