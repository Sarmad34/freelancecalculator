import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PAGES, PageSEO } from '../seo/seoContent';

export const SEO: React.FC = () => {
  const { pathname } = useLocation();
  // With HashRouter, paths usually don't have trailing slashes in the match
  const normalizedPath = pathname === '' || pathname === '/' ? '/' : pathname;
  
  // Find content, fallback to home if specific path is missing
  const content: PageSEO = PAGES[normalizedPath] || PAGES[normalizedPath + '/'] || PAGES['/'];

  useEffect(() => {
    if (!content) return;
    
    document.title = content.title;
    
    // Update Meta Description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', content.description);

    // Update Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://freelancercalculator.com/#${content.path}`);

    // Update JSON-LD
    let script = document.getElementById('json-ld-schema') as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = 'json-ld-schema';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    
    const schema = {
      "@context": "https://schema.org",
      "@type": content.schemaHints?.[0] || "WebPage",
      "name": content.h1,
      "description": content.description,
      "url": `https://freelancercalculator.com/#${content.path}`,
      "mainEntity": content.faqs && content.faqs.length > 0 ? {
        "@type": "FAQPage",
        "mainEntity": content.faqs.map(f => ({
          "@type": "Question",
          "name": f.q,
          "acceptedAnswer": { "@type": "Answer", "text": f.a }
        }))
      } : undefined
    };
    script.textContent = JSON.stringify(schema);
  }, [normalizedPath, content]);

  return null;
};