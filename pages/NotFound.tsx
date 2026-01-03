
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="max-w-4xl mx-auto px-4 py-20 text-center">
    <h1 className="text-6xl font-black text-slate-200 mb-4">404</h1>
    <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
    <p className="text-slate-600 mb-8">The calculator or guide you are looking for has moved or does not exist.</p>
    <Link to="/" className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold">
      Back to Home
    </Link>
  </div>
);

export default NotFound;
