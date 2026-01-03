
import React from 'react';
import { Link } from 'react-router-dom';
import { FREELANCE_ROLES } from '../constants';
import { PAGES } from '../seo/seoContent';
import { TOOL_LINKS } from '../seo/internalLinks';

const ToolIcons = [
  <svg key="1" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  <svg key="2" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  <svg key="3" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
  <svg key="new" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  <svg key="4" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  <svg key="5" className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
];

const Home = () => {
  const content = PAGES['/'];

  return (
    <div className="w-full bg-slate-50">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-12 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-blue-100">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          2026 Economic Update Live
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight leading-[1.05]">
          The Definitive <span className="text-blue-600">Freelance Financial</span> Suite
        </h1>
        <p className="text-xl md:text-2xl text-slate-600 mb-10 font-medium leading-relaxed max-w-3xl mx-auto">
          Professional-grade pricing tools for independent contractors. Set rates, audit overhead, and hit your 2026 revenue goals with data.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link to="/hourly-rate-calculator/" className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold shadow-2xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all active:scale-95 text-lg">
            Audit My Rates
          </Link>
          <Link to="/project-quote-calculator/" className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold shadow-2xl shadow-slate-200 hover:bg-slate-950 hover:-translate-y-1 transition-all active:scale-95 text-lg">
            Architect AI Quote
          </Link>
        </div>
      </div>

      {/* Role-Specific Market Data */}
      <div className="max-w-7xl mx-auto px-4 mb-16">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px bg-slate-200 flex-grow max-w-[80px]"></div>
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] text-center whitespace-nowrap">2026 Industry Benchmarks</h2>
          <div className="h-px bg-slate-200 flex-grow max-w-[80px]"></div>
        </div>
        <div className="flex flex-wrap justify-center gap-2 max-w-5xl mx-auto">
          {FREELANCE_ROLES.map(role => (
            <Link 
              key={role} 
              to={`/hourly-rate-calculator/${role.toLowerCase().replace(/ /g, '-')}/`}
              className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-[11px] font-bold text-slate-500 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all shadow-sm active:scale-95 uppercase tracking-wider"
            >
              {role}
            </Link>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {TOOL_LINKS.map((tool, idx) => (
          <Link key={tool.href} to={tool.href} className="group p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all hover:border-blue-200 hover:-translate-y-1">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
              {ToolIcons[idx] || <span className="text-xl font-bold">{idx + 1}</span>}
            </div>
            <h3 className="text-lg font-bold mb-2 text-slate-900 leading-tight">{tool.label}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">Professional-grade modeling for Pricing, Utilization, and Cash Flow.</p>
          </Link>
        ))}
      </div>

      {/* Expert Strategy & FAQ - Full Width Section */}
      <div className="w-full bg-slate-900 py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">Expert Strategy & FAQ</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">Deep insights into the 2026 freelance economy and financial longevity.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-8">
            {content.faqs.map((faq, i) => (
              <div key={i} className="group bg-slate-800/50 p-8 rounded-[2rem] border border-slate-800 hover:border-blue-500/30 transition-all">
                <h4 className="text-xl font-bold text-blue-400 mb-3 group-hover:text-blue-300 transition-colors flex items-start gap-4">
                  <span className="text-blue-500/30 font-black text-2xl leading-none">Q.</span>
                  {faq.q}
                </h4>
                <div className="flex items-start gap-4">
                  <span className="text-slate-600 font-black text-2xl leading-none opacity-0 select-none">Q.</span>
                  <p className="text-slate-400 text-base leading-relaxed font-medium">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Content / SEO Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="prose prose-slate max-w-4xl mx-auto">
          <h2 className="text-4xl font-black text-slate-900 mb-8 tracking-tight">{content.h1}</h2>
          {content.intro.map((p, i) => <p key={i} className="text-xl text-slate-600 leading-relaxed mb-6">{p}</p>)}
        </div>
      </div>
    </div>
  );
};

export default Home;
