
import React from 'react';

const Contact = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 prose prose-slate text-center">
    <h1>Contact Us</h1>
    <p>Have a question about our calculators or want to suggest a new feature? We'd love to hear from you.</p>
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm not-prose my-12">
      <p className="text-slate-600 mb-2 font-medium">For support and inquiries:</p>
      <a href="mailto:hello@freelancercalculator.com" className="text-2xl font-bold text-blue-600 hover:underline">
        hello@freelancercalculator.com
      </a>
      <p className="mt-6 text-sm text-slate-400 italic">We typically respond within 24-48 business hours.</p>
    </div>
  </div>
);

export default Contact;
