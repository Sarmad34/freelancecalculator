
import React from 'react';
import { Link } from 'react-router-dom';
import { FAQSection } from '../components/UI';
import { PAGES } from '../seo/seoContent';

const GuidePackages = () => {
  const content = PAGES['/guides/pricing-packages'];
  return (
    <article className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      <div className="prose prose-slate max-w-none">
        <h1 className="text-4xl font-extrabold mb-8">Pricing Packages That Sell: The Rule of Three</h1>
        <p className="lead text-xl text-slate-600 mb-10">Selling a "service" is hard. Selling a "package" is easy.</p>
      </div>
      <FAQSection faqs={content?.faqs || []} />
    </article>
  );
};

export default GuidePackages;
