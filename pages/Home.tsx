
import React from 'react';
import { Link } from 'react-router-dom';
import { FREELANCE_ROLES } from '../constants';

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight">
          The Professional <span className="text-blue-600">Freelance Calculator</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
          Stop guessing your worth. Accurate tools for hourly rates, project quotes, and business growth. Built by freelancers, for freelancers.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/hourly-rate-calculator" className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 hover:-translate-y-1 transition-all">
            Find My Hourly Rate
          </Link>
          <Link to="/project-quote-calculator" className="px-8 py-4 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-900 hover:-translate-y-1 transition-all">
            Build a Project Quote
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {[
          { title: "Transparent Math", desc: "No magic numbers. We show you exactly how your rates are calculated from expenses to utilization.", icon: "📊" },
          { title: "Professional Quotes", desc: "Generate tiered packages and milsetones instantly using Gemini AI for high-trust client proposals.", icon: "📄" },
          { title: "Privacy First", desc: "We don't store your data. Everything stays in your URL or local storage if you explicitly save it.", icon: "🛡️" }
        ].map((feat, idx) => (
          <div key={idx} className="p-8 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="text-4xl mb-4">{feat.icon}</div>
            <h3 className="text-xl font-bold mb-2">{feat.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-slate-100 rounded-3xl p-8 md:p-12">
        <h2 className="text-2xl font-bold mb-8 text-center">Specific Role Guides</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {FREELANCE_ROLES.slice(0, 15).map(role => (
            <Link 
              key={role} 
              to={`/hourly-rate-calculator/${role.toLowerCase().replace(/ /g, '-')}`}
              className="px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:border-blue-400 hover:text-blue-600 transition-all text-center"
            >
              {role}
            </Link>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link to="/hourly-rate-calculator" className="text-blue-600 font-semibold hover:underline">View all roles &rarr;</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
