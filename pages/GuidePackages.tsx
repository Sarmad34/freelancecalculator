
import React from 'react';
import { Link } from 'react-router-dom';

const GuidePackages = () => (
  <article className="max-w-4xl mx-auto px-4 py-12 md:py-20 prose prose-slate">
    <h1 className="text-4xl font-extrabold mb-8 text-slate-900 tracking-tight leading-tight">Pricing Packages That Sell: The Rule of Three</h1>
    
    <p className="lead text-xl text-slate-600 mb-10 leading-relaxed font-medium">Selling a "service" is hard. Selling a "package" is easy. In 2026, successful freelancers package their skills into discrete, tiered options that guide the client toward a decision.</p>

    <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-900">1. Why Single Prices Kill Conversions</h2>
    <p className="text-slate-700 leading-relaxed">When you present a client with a single price (e.g., "$3,000 for a website"), you are asking them a <strong>Yes/No</strong> question. Their brain looks for reasons to say "No."</p>
    <p className="text-slate-700 leading-relaxed">When you present three packages, you change the question to <strong>"Which one?"</strong>. This is the psychology of comparison.</p>

    <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-900">2. The Anatomy of a Tiered Quote</h2>
    <p className="text-slate-700 leading-relaxed">Follow the "Good, Better, Best" framework used by Apple, Starbucks, and major SaaS companies:</p>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10 not-prose">
      {/* Tier 1: Light Card */}
      <div className="p-8 bg-white border border-slate-200 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow group flex flex-col min-h-[320px]">
        <h4 className="font-black text-slate-900 mb-4 text-xs uppercase tracking-[0.2em]">Tier 1: The Anchor</h4>
        <p className="text-sm text-slate-600 leading-relaxed font-bold m-0 flex-grow">
          The MVP. Just enough to get the job done. High enough to be profitable, but clearly missing the 'best' features.
        </p>
      </div>
      
      {/* Tier 2: High Contrast Blue */}
      <div className="p-8 bg-blue-600 rounded-[2rem] shadow-xl shadow-blue-400/30 ring-8 ring-blue-50 flex flex-col scale-105 z-10 min-h-[320px]">
        <h4 className="font-black mb-4 text-white text-xs uppercase tracking-[0.2em]">Tier 2: The Target</h4>
        <p className="text-sm !text-white leading-relaxed font-black m-0 flex-grow">
          The Goldilocks zone. 70% of clients should choose this. It includes your most valuable standard features.
        </p>
      </div>
      
      {/* Tier 3: High Contrast Dark */}
      <div className="p-8 bg-slate-900 rounded-[2rem] shadow-xl shadow-slate-900/20 flex flex-col min-h-[320px]">
        <h4 className="font-black mb-4 text-white text-xs uppercase tracking-[0.2em]">Tier 3: The VIP</h4>
        <p className="text-sm !text-white leading-relaxed font-black m-0 flex-grow">
          The high-touch, premium option. Strategy calls, speed guarantees, and bonus features. Even if nobody buys it, it makes Tier 2 look like a bargain.
        </p>
      </div>
    </div>

    <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-900">3. Value-Adds that Don't Cost Time</h2>
    <p className="text-slate-700 leading-relaxed">The secret to high-margin packages in 2026 is adding value that doesn't scale linearly with your labor:</p>
    <ul className="space-y-2 text-slate-700">
      <li><strong>Priority Turnaround:</strong> Charge 25% extra for a 48-hour start date.</li>
      <li><strong>IP Transfer:</strong> Include source files only in the Premium tier.</li>
      <li><strong>On-Call Support:</strong> A 1-month Slack support window adds immense peace of mind.</li>
      <li><strong>Strategy Audit:</strong> A 1-hour "Discovery Call" that replaces a boring technical briefing.</li>
    </ul>

    <div className="bg-amber-50 p-8 rounded-3xl border border-amber-100 my-12">
      <h4 className="font-bold text-amber-900 mb-3 text-lg">Pro Tip: Deliverables vs Outcomes</h4>
      <p className="text-amber-800 text-base leading-relaxed font-medium">Don't list "5 Web Pages" in your package. List "High-Conversion Sales Funnel." Clients don't want pages; they want customers.</p>
    </div>

    <div className="flex flex-col items-center mt-16 pt-8 border-t border-slate-100">
      <Link to="/project-quote-calculator" className="inline-block px-10 py-5 bg-blue-600 text-white rounded-2xl no-underline font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-700 shadow-2xl shadow-blue-200 transition-all active:scale-95">
        Architect Package Tiers with AI
      </Link>
      <p className="text-[10px] text-slate-400 mt-6 font-black uppercase tracking-[0.3em] italic">Proprietary Pricing Logic • 2026 Benchmarks</p>
    </div>
  </article>
);

export default GuidePackages;
