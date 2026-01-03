
import React from 'react';
import { Link } from 'react-router-dom';
import { FREELANCE_ROLES } from '../constants';
import { seoContent } from '../seo/seoContent';

const Home = () => {
  const content = seoContent["/"];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
          Professional <span className="text-blue-600">Freelance Pricing</span> Solutions for 2025
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-relaxed">
          The ultimate 2025 freelance calculator suite. Built for independent professionals who want to grow their revenue with high-trust financial tools.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/hourly-rate-calculator/" className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all">
            Find My Hourly Rate
          </Link>
          <Link to="/project-quote-calculator/" className="px-8 py-4 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-900 hover:-translate-y-1 transition-all">
            Build an AI Quote
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {[
          { title: "Transparent Math", desc: "Every calculation is based on standard accounting practices. We show you the impact of utilization, taxes, and overhead.", icon: "📊" },
          { title: "AI Quote Builder", desc: "Generate professional tiered packages and milestone schedules instantly using advanced Google Gemini models.", icon: "🤖" },
          { title: "Global Compatibility", desc: "Support for multiple currencies including USD, EUR, GBP, and PKR with localized formatting.", icon: "🌍" }
        ].map((feat, idx) => (
          <div key={idx} className="p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="text-4xl mb-4">{feat.icon}</div>
            <h3 className="text-xl font-bold mb-2">{feat.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </div>

      {/* SEO SECTION FOR HOME */}
      <div className="prose prose-slate max-w-4xl mx-auto my-20">
        <h2>{content.h1}</h2>
        {content.intro.map((p, i) => <p key={i}>{p}</p>)}
        {content.sections.map((s, i) => (
          <div key={i}>
            <h3>{s.h2}</h3>
            <p>{s.p}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-100 rounded-3xl p-8 md:p-12">
        <h2 className="text-2xl font-bold mb-8 text-center">Explore Pricing Guides by Role</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {FREELANCE_ROLES.slice(0, 15).map(role => (
            <Link 
              key={role} 
              to={`/hourly-rate-calculator/${role.toLowerCase().replace(/ /g, '-')}/`}
              className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:border-blue-400 hover:text-blue-600 transition-all text-center"
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
