
import React from 'react';
import { Link } from 'react-router-dom';
import { FAQSection } from '../components/UI';
import { PAGES } from '../seo/seoContent';

const GuideInternational = () => {
  const content = PAGES['/guides/international-invoicing-tax'];
  return (
    <article className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      <div className="prose prose-slate max-w-none">
        <h1 className="text-4xl font-extrabold mb-8">Mastering International Invoicing in 2026</h1>
        <p className="lead text-xl text-slate-600 mb-10 font-medium">As a global freelancer, you are essentially a micro-multinational corporation.</p>
      </div>
      <FAQSection faqs={content?.faqs || []} />
    </article>
  );
};

export default GuideInternational;
