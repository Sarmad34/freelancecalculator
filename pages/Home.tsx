import React from 'react';
import { Link } from 'react-router-dom';
import { FREELANCE_ROLES } from '../constants';
import { PAGES } from '../seo/seoContent';
import { TOOL_LINKS } from '../seo/internalLinks';

const ToolIcons = [
  // Hourly Rate
  <svg key="1" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  // Project Quote
  <svg key="2" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  // Retainer
  <svg key="3" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
  // Platform Fee
  <svg key="4" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  // Tax Estimator
  <svg key="5" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
];

const Home = () => {
  const content = PAGES['/'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
      <div className="max-w-4xl mb-20">
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tight leading-[1.1]">
          The Definitive <span className="text-blue-600 underline decoration-blue-100 underline-offset-8">Freelance Calculator</span>
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 mb-10 font-medium leading-relaxed max-w-2xl">
          Stop guessing your worth. Use transparent business math to set rates, price projects, and reach your 2025 financial goals.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link to="/hourly-rate-calculator/" className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95">
            Find My Hourly Rate
          </Link>
          <Link to="/project-quote-calculator/" className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-slate-200 hover:bg-slate-950 hover:-translate-y-1 transition-all active:scale-95">
            Build AI Quote
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-24">
        {TOOL_LINKS.map((tool, idx) => (
          <Link key={tool.href} to={tool.href} className="group p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all hover:border-blue-200 hover:-translate-y-1">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
              {ToolIcons[idx] || <span className="text-xl font-bold">{idx + 1}</span>}
            </div>
            <h3 className="text-lg font-bold mb-2 text-slate-900 leading-tight">{tool.label}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Professional estimation tool for pricing and business planning.</p>
          </Link>
        ))}
      </div>

      {/* SEO Section */}
      <div className="prose prose-slate max-w-4xl mx-auto py-16 border-t border-slate-100">
        <h2 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">{content.h1}</h2>
        {content.intro.map((p, i) => <p key={i} className="text-lg text-slate-600">{p}</p>)}
        
        {content.sections.map((section, idx) => (
          <div key={idx} className="mt-12">
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight">{section.h2}</h3>
            {section.body.map((p, i) => <p key={i}>{p}</p>)}
            {section.bullets && (
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mt-6 list-none pl-0">
                {section.bullets.map((b, i) => (
                  <li key={i} className="flex gap-3 text-slate-600 font-medium items-start">
                    <span className="w-6 h-6 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold">✓</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        <div className="bg-slate-50 rounded-3xl p-10 mt-20 border border-slate-100 not-prose">
          <h3 className="text-2xl font-bold mb-8 tracking-tight text-slate-900">Frequently Asked Questions</h3>
          <div className="space-y-8">
            {content.faqs.map((faq, i) => (
              <div key={i} className="group">
                <h4 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{faq.q}</h4>
                <p className="text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-24 pt-16 border-t border-slate-100">
        <h2 className="text-2xl font-bold mb-10 text-center tracking-tight text-slate-900">Calculate Rates for Your Specific Role</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {FREELANCE_ROLES.map(role => (
            <Link 
              key={role} 
              to={`/hourly-rate-calculator/${role.toLowerCase().replace(/ /g, '-')}/`}
              className="px-5 py-2.5 bg-white border border-slate-200 rounded-full text-sm font-semibold text-slate-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all shadow-sm active:scale-95"
            >
              {role}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;