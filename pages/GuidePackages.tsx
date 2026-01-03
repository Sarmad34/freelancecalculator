
import React from 'react';
import { Link } from 'react-router-dom';

const GuidePackages = () => (
  <article className="max-w-4xl mx-auto px-4 py-12 md:py-20 prose prose-slate">
    <h1 className="text-4xl font-extrabold mb-8 text-slate-900">Pricing Packages That Sell: The Rule of Three</h1>
    
    <p className="lead text-xl text-slate-600 mb-10">Selling a "service" is hard. Selling a "package" is easy. In 2026, successful freelancers package their skills into discrete, tiered options that guide the client toward a decision.</p>

    <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-900">1. Why Single Prices Kill Conversions</h2>
    <p>When you present a client with a single price (e.g., "$3,000 for a website"), you are asking them a <strong>Yes/No</strong> question. Their brain looks for reasons to say "No."</p>
    <p>When you present three packages, you change the question to <strong>"Which one?"</strong>. This is the psychology of comparison.</p>

    <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-900">2. The Anatomy of a Tiered Quote</h2>
    <p>Follow the "Good, Better, Best" framework used by Apple, Starbucks, and major SaaS companies:</p>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10 not-prose">
      <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
        <h4 className="font-black text-slate-900 mb-3 text-sm uppercase tracking-wider">Tier 1: The Anchor</h4>
        <p className="text-sm text-slate-500 leading-relaxed font-medium m-0">
          The MVP. Just enough to get the job done. High enough to be profitable, but clearly missing the 'best' features.
        </p>
      </div>
      
      <div className="p-8 bg-blue-600 rounded-3xl shadow-xl shadow-blue-200 ring-4 ring-blue-50">
        <h4 className="font-black mb-3 text-white text-sm uppercase tracking-wider">Tier 2: The Target</h4>
        <p className="text-sm text-blue-50 leading-relaxed font-medium m-0">
          The Goldilocks zone. 70% of clients should choose this. It includes your most valuable standard features.
        </p>
      </div>
      
      <div className="p-8 bg-slate-900 rounded-3xl shadow-xl">
        <h4 className="font-black mb-3 text-white text-sm uppercase tracking-wider">Tier 3: The VIP</h4>
        <p className="text-sm text-slate-300 leading-relaxed font-medium m-0">
          The high-touch, premium option. Strategy calls, speed guarantees, and bonus features. Even if nobody buys it, it makes Tier 2 look like a bargain.
        </p>
      </div>
    </div>

    <h2 className="text-2xl font-bold mt-12 mb-4 text-slate-900">3. Value-Adds that Don't Cost Time</h2>
    <p>The secret to high-margin packages in 2026 is adding value that doesn't scale linearly with your labor:</p>
    <ul>
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
      <Link to="/project-quote-calculator" className="inline-block px-10 py-5 bg-blue-600 text-white rounded-2xl no-underline font-bold text-lg hover:bg-blue-700 shadow-2xl shadow-blue-200 transition-all active:scale-95">
        Test Your Package Tiers with AI
      </Link>
      <p className="text-xs text-slate-400 mt-4 font-bold uppercase tracking-widest italic">Powered by Gemini Pro Architecture</p>
    </div>
  </article>
);

export default GuidePackages;
