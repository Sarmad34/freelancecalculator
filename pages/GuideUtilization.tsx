
import React from 'react';
import { Link } from 'react-router-dom';

const GuideUtilization = () => (
  <article className="max-w-4xl mx-auto px-4 py-12 md:py-20 prose prose-slate">
    <h1 className="text-4xl font-extrabold mb-8">Mastering Utilization: Why 40 Hours ≠ 40 Billable Hours</h1>
    
    <p className="lead text-xl text-slate-600 mb-10">The #1 mistake new freelancers make is assuming they will work 40 billable hours per week. In reality, most freelancers who try this end up working 60-70 total hours just to keep up.</p>

    <h2 className="text-2xl font-bold mt-12 mb-4">What is Utilization?</h2>
    <p>Utilization is a metric used by consulting firms to measure efficiency. It's calculated as:</p>
    <div className="bg-slate-100 p-4 font-mono text-sm rounded-lg text-center my-6">
      (Billable Hours / Total Available Hours) x 100
    </div>

    <h2 className="text-2xl font-bold mt-12 mb-4">Realistic Utilization Targets</h2>
    <ul className="space-y-4">
      <li><strong>Junior (80%):</strong> Usually doing more execution, less high-level sales.</li>
      <li><strong>Mid-Level (60-70%):</strong> Balancing deep work with client management.</li>
      <li><strong>Senior / Specialized (40-50%):</strong> Spending significant time on strategy, sales, and personal branding.</li>
    </ul>

    <h2 className="text-2xl font-bold mt-12 mb-4">How to Raise Your Utilization</h2>
    <p>You can't work more hours in a day, but you can work <em>smarter</em> hours:</p>
    <ul>
      <li><strong>Productized Services:</strong> Turn custom work into repeatable processes.</li>
      <li><strong>Automation:</strong> Use tools for invoicing, scheduling, and reporting.</li>
      <li><strong>Retainers:</strong> Cut out the "sales" phase for existing clients.</li>
    </ul>

    <Link to="/retainer-calculator" className="inline-block px-6 py-3 bg-slate-800 text-white rounded-xl no-underline font-bold mt-4">
      Calculate Your Retainer Potential
    </Link>
  </article>
);

export default GuideUtilization;
