
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { CURRENCIES } from './constants';
import { Currency } from './types';
import Home from './pages/Home';
import HourlyCalculator from './pages/HourlyCalculator';
import ProjectQuoteCalculator from './pages/ProjectQuoteCalculator';
import RetainerCalculator from './pages/RetainerCalculator';
import PlatformFeeCalculator from './pages/PlatformFeeCalculator';
import TaxEstimator from './pages/TaxEstimator';
import GuideRates from './pages/GuideRates';
import GuideUtilization from './pages/GuideUtilization';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import About from './pages/About';
import Contact from './pages/Contact';
import CookiePolicy from './pages/CookiePolicy';
import DisclaimerPage from './pages/Disclaimer';
import NotFound from './pages/NotFound';
import { SEO } from './seo/SEO';

export const toCanonicalPath = (path: string) => {
  if (path === '/') return '/';
  return path.endsWith('/') ? path : `${path}/`;
};

const TrailingSlashRedirect = () => {
  const location = useLocation();
  if (location.pathname !== '/' && !location.pathname.endsWith('/')) {
    return <Navigate to={{ pathname: `${location.pathname}/`, search: location.search }} replace />;
  }
  return null;
};

const Navbar = ({ currency, setCurrency }: { currency: Currency; setCurrency: (c: Currency) => void }) => (
  <header className="sticky top-0 z-50 glass-card bg-white/80 border-b border-slate-200">
    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 font-bold text-xl text-blue-600 tracking-tight">
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" />
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="hidden sm:inline">FreelanceCalc</span>
      </Link>

      <div className="flex items-center gap-4">
        <select 
          value={currency} 
          onChange={(e) => setCurrency(e.target.value as Currency)}
          className="bg-slate-100 border-none text-sm font-medium rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500"
        >
          {CURRENCIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/hourly-rate-calculator/" className="text-sm font-medium text-slate-600 hover:text-blue-600">Hourly Rate</Link>
          <Link to="/project-quote-calculator/" className="text-sm font-medium text-slate-600 hover:text-blue-600">Projects</Link>
          <Link to="/retainer-calculator/" className="text-sm font-medium text-slate-600 hover:text-blue-600">Retainers</Link>
        </nav>
      </div>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-slate-900 text-slate-400 py-12 mt-20">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div className="col-span-2">
        <h3 className="text-white font-bold mb-4">Freelance Calculator</h3>
        <p className="text-sm max-w-sm mb-4">Empowering independent professionals with high-trust financial tools. Built to help you charge what you're worth.</p>
        <div className="flex gap-4 text-xs">
          <Link to="/about/" className="hover:text-white">About Us</Link>
          <Link to="/contact/" className="hover:text-white">Contact</Link>
          <Link to="/disclaimer/" className="hover:text-white">Disclaimer</Link>
        </div>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-4 text-sm">Calculators</h4>
        <ul className="space-y-2 text-sm">
          <li><Link to="/hourly-rate-calculator/" className="hover:text-white">Hourly Rate</Link></li>
          <li><Link to="/project-quote-calculator/" className="hover:text-white">Project Quote</Link></li>
          <li><Link to="/retainer-calculator/" className="hover:text-white">Retainers</Link></li>
          <li><Link to="/platform-fee-calculator/" className="hover:text-white">Platform Fees</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="text-white font-semibold mb-4 text-sm">Legal</h4>
        <ul className="space-y-2 text-sm">
          <li><Link to="/privacy/" className="hover:text-white">Privacy Policy</Link></li>
          <li><Link to="/terms/" className="hover:text-white">Terms of Service</Link></li>
          <li><Link to="/cookie-policy/" className="hover:text-white">Cookie Policy</Link></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-xs text-center md:text-left">
      <p>&copy; {new Date().getFullYear()} Freelance Calculator. All rights reserved. Professional tools for independent growth.</p>
    </div>
  </footer>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const App = () => {
  const [currency, setCurrency] = useState<Currency>('USD');

  return (
    <Router>
      <SEO />
      <TrailingSlashRedirect />
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Navbar currency={currency} setCurrency={setCurrency} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hourly-rate-calculator/" element={<HourlyCalculator currency={currency} />} />
            <Route path="/hourly-rate-calculator/:role/" element={<HourlyCalculator currency={currency} />} />
            <Route path="/project-quote-calculator/" element={<ProjectQuoteCalculator currency={currency} />} />
            <Route path="/project-quote-calculator/:role/" element={<ProjectQuoteCalculator currency={currency} />} />
            <Route path="/retainer-calculator/" element={<RetainerCalculator currency={currency} />} />
            <Route path="/platform-fee-calculator/" element={<PlatformFeeCalculator currency={currency} />} />
            <Route path="/tax-take-home-estimator/" element={<TaxEstimator currency={currency} />} />
            <Route path="/guides/how-to-set-freelance-rates/" element={<GuideRates />} />
            <Route path="/guides/billable-hours-utilization/" element={<GuideUtilization />} />
            <Route path="/privacy/" element={<Privacy />} />
            <Route path="/terms/" element={<Terms />} />
            <Route path="/about/" element={<About />} />
            <Route path="/contact/" element={<Contact />} />
            <Route path="/cookie-policy/" element={<CookiePolicy />} />
            <Route path="/disclaimer/" element={<DisclaimerPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
