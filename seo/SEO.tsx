
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { seoContent } from './seoContent';

export const SEO: React.FC = () => {
  const { pathname } = useLocation();
  // Ensure we match with trailing slash
  const path = pathname.endsWith('/') ? pathname : `${pathname}/`;
  const content = seoContent[path] || seoContent["/"];
  const canonical = `https://freelancercalculator.com${path}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://freelancercalculator.com/" },
      { "@type": "ListItem", "position": 2, "name": content.h1, "item": canonical }
    ]
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": content.faqs.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.a }
    }))
  };

  const mainEntityJsonLd = content.type === 'SoftwareApplication' ? {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": content.h1,
    "operatingSystem": "All",
    "applicationCategory": "BusinessApplication",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
  } : {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": content.h1,
    "description": content.description,
    "author": { "@type": "Organization", "name": "Freelance Calculator" }
  };

  return (
    <>
      <Helmet>
        <title>{content.title}</title>
        <meta name="description" content={content.description} />
        <link rel="canonical" href={canonical} />
        
        {/* Open Graph */}
        <meta property="og:title" content={content.title} />
        <meta property="og:description" content={content.description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        
        {/* JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(mainEntityJsonLd)}</script>
      </Helmet>
    </>
  );
};
