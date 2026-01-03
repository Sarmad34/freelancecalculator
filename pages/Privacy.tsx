
import React from 'react';

const Privacy = () => (
  <div className="max-w-4xl mx-auto px-4 py-12 prose prose-slate">
    <h1>Privacy Policy</h1>
    <p>At Freelance Calculator, we prioritize your privacy. We do not store any of the numbers you input into our calculators on our servers.</p>
    <h2>Data Collection</h2>
    <p>All calculations happen locally in your browser. We do not use persistent databases for your sensitive financial goals. Some settings (like preferred currency) may be stored in your browser's local storage for your convenience.</p>
    <h2>AI Interactions</h2>
    <p>When you use our AI-powered quote builder, the project parameters are sent to Google Gemini API to generate the response. No personal identifying information is sent to the AI.</p>
  </div>
);

export default Privacy;
