
import React from 'react';
import { Link } from 'react-router-dom';
import { FAQSection } from '../components/UI';
import { PAGES } from '../seo/seoContent';

const GuideRates = () => {
  const content = PAGES['/guides/how-to-set-freelance-rates'];
  return (
    <article className="max-w-4xl mx-auto px-4 py-12 md:py-20">
      <div className="prose prose-slate max-w-none">
        <h1 className="text-4xl font-extrabold mb-8">How to Set Your Freelance Rates: A Data-Driven Guide</h1>
        <p className="lead text-xl text-slate-600 mb-10">Setting your rates is the most critical decision you'll make in your freelance business. Too low, and you'll burn out. Too high without proof of value, and you'll struggle to find work.</p>
        <h2 className="text-2xl font-bold mt-12 mb-4">1. Understand Billable vs. Non-Billable Time</h2>
        <p>As a freelancer, you don't work 40 hours a week for clients. Most freelancers are only billable for about 50-60% of their time.</p>
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 my-8">
          <h4 className="font-bold text-blue-900 mb-2">The Golden Rule</h4>
          <p className="text-blue-800 text-sm">Your hourly rate must be high enough that working only 20-25 hours a week covers 100% of your living costs and business expenses.</p>
        </div>
        <Link to="/hourly-rate-calculator" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl no-underline font-bold mt-4 hover:bg-blue-700">Use Our Hourly Rate Calculator</Link>
      </div>
      <FAQSection faqs={content?.faqs || []} />
    </article>
  );
};

export default GuideRates;
