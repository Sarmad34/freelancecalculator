
import React from 'react';
import { Link } from 'react-router-dom';
import { FAQSection } from '../components/UI';
import { PAGES } from '../seo/seoContent';

const GuideRetainers = () => {
  const content = PAGES['/guides/retainers-for-freelancers'];
  return (
    <article className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      <div className="prose prose-slate max-w-none">
        <h1 className="text-4xl font-extrabold mb-8">Retainers for Freelancers: Selling Availability over Activity</h1>
        <p className="lead text-xl text-slate-600 mb-10">Transition your best clients to a recurring retainer model to escape the rollercoaster.</p>
      </div>
      <FAQSection faqs={content?.faqs || []} />
    </article>
  );
};

export default GuideRetainers;
