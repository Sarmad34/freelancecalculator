
import React from 'react';
import { Link } from 'react-router-dom';

const GuideRates = () => (
  <article className="max-w-4xl mx-auto px-4 py-12 md:py-20 prose prose-slate">
    <h1 className="text-4xl font-extrabold mb-8">How to Set Your Freelance Rates: A Data-Driven Guide</h1>
    
    <p className="lead text-xl text-slate-600 mb-10">Setting your rates is the most critical decision you'll make in your freelance business. Too low, and you'll burn out. Too high without proof of value, and you'll struggle to find work.</p>

    <h2 className="text-2xl font-bold mt-12 mb-4">1. Understand Billable vs. Non-Billable Time</h2>
    <p>As a freelancer, you don't work 40 hours a week for clients. You are also the CEO, the Marketing Director, the IT Support, and the Accountant. This is known as "utilization." Most freelancers are only billable for about 50-60% of their time.</p>

    <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 my-8">
      <h4 className="font-bold text-blue-900 mb-2">The Golden Rule</h4>
      <p className="text-blue-800 text-sm">Your hourly rate must be high enough that working only 20-25 hours a week covers 100% of your living costs and business expenses.</p>
    </div>

    <h2 className="text-2xl font-bold mt-12 mb-4">2. Calculate Your "Minimum Viable Rate"</h2>
    <p>Before you look at market averages, look at your own bank account. What do you need to survive? This includes:</p>
    <ul>
      <li>Personal Salary (Rent, Food, Fun)</li>
      <li>Business Expenses (Software, Gear, Hosting)</li>
      <li>Tax Reserve (Usually 20-30%)</li>
      <li>Profit Buffer (For rainy days)</li>
    </ul>
    <Link to="/hourly-rate-calculator" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl no-underline font-bold mt-4 hover:bg-blue-700">
      Use Our Hourly Rate Calculator
    </Link>

    <h2 className="text-2xl font-bold mt-12 mb-4">3. Value-Based vs. Time-Based Pricing</h2>
    <p>Eventually, you want to move away from hourly rates. If you can build a landing page that makes a client $10,000, why should you only get paid for the 5 hours it took you? Value-based pricing looks at the return on investment (ROI) for the client.</p>

    <h2 className="text-2xl font-bold mt-12 mb-4">FAQs</h2>
    <div className="space-y-6">
      <div>
        <h4 className="font-bold mb-1">Should I show my rates on my website?</h4>
        <p className="text-slate-600 text-sm italic">It depends. Showing rates filters out low-budget clients but might scare off big clients who would have paid more for high-complexity work. A middle ground is showing "Packages start at $X."</p>
      </div>
    </div>
  </article>
);

export default GuideRates;
