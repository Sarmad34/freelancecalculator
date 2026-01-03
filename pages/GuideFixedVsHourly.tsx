
import React from 'react';
import { Link } from 'react-router-dom';
import { FAQSection } from '../components/UI';
import { PAGES } from '../seo/seoContent';

const GuideFixedVsHourly = () => {
  const content = PAGES['/guides/fixed-price-vs-hourly'];
  return (
    <article className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      <div className="prose prose-slate max-w-none">
        <h1 className="text-4xl font-extrabold mb-8">Fixed Price vs Hourly: The 2026 Profitability Guide</h1>
        <p className="lead text-xl text-slate-600 mb-10">The debate between hourly billing and fixed-price quoting is about business survival in 2026.</p>
      </div>
      <FAQSection faqs={content?.faqs || []} />
    </article>
  );
};

export default GuideFixedVsHourly;
