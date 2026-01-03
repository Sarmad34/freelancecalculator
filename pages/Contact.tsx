
import React from 'react';

const Contact = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 prose prose-slate text-center">
    <h1>Contact Us</h1>
    <p>Have a question or feedback about our tools? We'd love to hear from you.</p>
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm not-prose my-12 inline-block">
      <p className="text-slate-600 mb-2 font-medium">Email us at:</p>
      <a href="mailto:support@freelancecalculator.com" className="text-2xl font-bold text-blue-600 hover:underline">
        support@freelancecalculator.com
      </a>
    </div>
    <p className="text-sm text-slate-500">We aim to respond to all inquiries within 48 business hours.</p>
  </div>
);

export default Contact;
