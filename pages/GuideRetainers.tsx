
import React from 'react';
import { Link } from 'react-router-dom';

const GuideRetainers = () => (
  <article className="max-w-4xl mx-auto px-4 py-12 md:py-20 prose prose-slate">
    <h1 className="text-4xl font-extrabold mb-8">Retainers for Freelancers: Selling Availability over Activity</h1>
    
    <p className="lead text-xl text-slate-600 mb-10">The "Freelance Rollercoaster" is the result of project-based thinking. To build a business that scales in 2026, you must transition your best clients to a recurring retainer model.</p>

    <h2 className="text-2xl font-bold mt-12 mb-4">1. What is a "Modern Retainer"?</h2>
    <p>In 2026, a retainer is not just a block of hours. It is an <strong>SLA (Service Level Agreement)</strong>. You are being paid for three things:</p>
    <ol>
      <li><strong>Priority:</strong> The client knows you won't be "too busy" when they need you.</li>
      <li><strong>Continuity:</strong> You know their brand, their code, and their goals better than anyone else.</li>
      <li><strong>Certainty:</strong> Recurring billing provides stability for both parties.</li>
    </ol>

    <h2 className="text-2xl font-bold mt-12 mb-4">2. The Three Types of Retainers</h2>
    <div className="space-y-6">
      <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm">
        <h4 className="text-lg font-bold text-blue-600 mb-2 mt-0">A. The Pay-for-Access Model</h4>
        <p className="text-sm text-slate-600 leading-relaxed mb-0">The client pays a flat monthly fee (e.g., $1,000) just to have you "on call." This covers 2-3 hours of work, but anything extra is billed at a discounted "Member Rate."</p>
      </div>
      <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm">
        <h4 className="text-lg font-bold text-slate-900 mb-2 mt-0">B. The Maintenance/Support Model</h4>
        <p className="text-sm text-slate-600 leading-relaxed mb-0">Standard for developers and IT. Covers security patches, small bug fixes, and hosting management. Pure insurance for the client.</p>
      </div>
      <div className="p-8 bg-white border border-slate-200 rounded-3xl shadow-sm">
        <h4 className="text-lg font-bold text-green-600 mb-2 mt-0">C. The Strategic Growth Model</h4>
        <p className="text-sm text-slate-600 leading-relaxed mb-0">The gold standard. You aren't "maintaining" things; you are improving them. Monthly audits, constant split-testing, or content production.</p>
      </div>
    </div>

    <h2 className="text-2xl font-bold mt-12 mb-4">3. How to Pitch a Retainer</h2>
    <p>Never pitch a retainer as "I want you to pay me every month." Pitch it as a <strong>Performance Lock</strong>:</p>
    <blockquote className="border-l-4 border-blue-600 bg-slate-50 p-6 italic text-slate-700">
      "Now that we've finished the main build, I want to make sure the momentum doesn't drop. My schedule for next month is filling up, but I've reserved a block for 3 clients who want priority response times and monthly health checks. Would you like to lock in one of those spots?"
    </blockquote>

    <div className="mt-12 bg-slate-900 text-white p-10 rounded-[2.5rem]">
      <h3 className="text-2xl font-black mb-4">Calculate Your MRR Potential</h3>
      <p className="text-slate-400 mb-8 font-medium">Find the "Sweet Spot" between hours committed and recurring revenue.</p>
      <Link to="/retainer-calculator" className="inline-block px-8 py-4 bg-blue-600 text-white rounded-2xl no-underline font-bold hover:bg-blue-700 transition-all">
        Open Retainer Calculator
      </Link>
    </div>
  </article>
);

export default GuideRetainers;
