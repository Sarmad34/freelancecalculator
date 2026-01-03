
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { CURRENCIES } from './constants';
import { Currency } from './types';
import Home from './pages/Home';
import HourlyCalculator from './pages/HourlyCalculator';
import DayRateArchitect from './pages/DayRateArchitect';
import RetainerCalculator from './pages/RetainerCalculator';
import OverheadCalculator from './pages/OverheadCalculator';
import PlatformFeeCalculator from './pages/PlatformFeeCalculator';
import TaxEstimator from './pages/TaxEstimator';
import About from './pages/About';
import Contact from './pages/Contact';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import CookiePolicy from './pages/CookiePolicy';
import DisclaimerPage from './pages/Disclaimer';
import EditorialPolicy from './pages/EditorialPolicy';
import GuideRates from './pages/GuideRates';
import GuideUtilization from './pages/GuideUtilization';
import GuideFixedVsHourly from './pages/GuideFixedVsHourly';
import GuidePackages from './pages/GuidePackages';
import GuideRetainers from './pages/GuideRetainers';
import Sitemap from './pages/Sitemap';
import { SEO } from './components/SEO';
import { TRUST_LINKS, TOOL_LINKS, GUIDE_LINKS } from './seo/internalLinks';
import { Logo } from './components/Logo';

const Navbar = ({ currency, setCurrency }: { currency: Currency; setCurrency: (c: Currency) => void }) => (
  <header className="sticky top-0 z-50 glass-card bg-white/95 border-b border-slate-200">
    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-3 font-black text-2xl text-slate-900 tracking-tighter hover:opacity-80 transition-opacity">
        <Logo className="w-9 h-9" />
        <span className="hidden sm:inline"><span className="text-blue-600">Freelance</span>Calc</span>
      </Link>

      <div className="flex items-center gap-6">
        <nav className="hidden lg:flex items-center gap-8">
          {TOOL_LINKS.slice(0, 3).map(link => (
            <Link key={link.href} to={link.href} className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
          <select 
            value={currency} 
            onChange={(e) => setCurrency(e.target.value as Currency)}
            className="bg-slate-100 border-none text-xs font-bold rounded-full px-4 py-2 focus:ring-2 focus:ring-blue-500 cursor-pointer hover:bg-slate-200 transition-colors"
          >
            {CURRENCIES.map(c => <option key={c.value} value={c.value}>{c.symbol} {c.value}</option>)}
          </select>
        </div>
      </div>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-slate-900 text-slate-400 pt-20 pb-10 mt-20">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-1">
        <div className="flex items-center gap-2 mb-6">
          <Logo className="w-8 h-8" />
          <h3 className="text-white font-black text-xl tracking-tight">FreelanceCalc</h3>
        </div>
        <p className="text-sm leading-relaxed mb-6">Professional-grade financial modeling and pricing psychology for independent contractors, consultants, and creative professionals.</p>
        <div className="flex gap-4">
          <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors font-bold text-white text-xs">X</a>
          <a href="#" className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors font-bold text-white text-xs">LN</a>
        </div>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Pricing Suite</h4>
        <ul className="space-y-3 text-sm">
          {TOOL_LINKS.map(link => (
            <li key={link.href}><Link to={link.href} className="hover:text-white transition-colors">{link.label}</Link></li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Expert Guides</h4>
        <ul className="space-y-3 text-sm">
          {GUIDE_LINKS.slice(0, 5).map(link => (
            <li key={link.href}><Link to={link.href} className="hover:text-white transition-colors">{link.label}</Link></li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-widest">Corporate</h4>
        <ul className="space-y-3 text-sm">
          {TRUST_LINKS.map(link => (
            <li key={link.href}><Link to={link.href} className="hover:text-white transition-colors">{link.label}</Link></li>
          ))}
          <li><Link to="/sitemap" className="hover:text-white transition-colors">Visual Sitemap</Link></li>
        </ul>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 mt-20 pt-8 border-t border-slate-800 text-[11px] font-medium uppercase tracking-widest flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500">
      <p>&copy; {new Date().getFullYear()} Freelance Calculator. Built for the Independent Economy.</p>
      <div className="flex gap-6">
        <span className="text-slate-400">Secure AES-256 Encryption</span>
        <span className="text-slate-400">Zero Data Retention Policy</span>
      </div>
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
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-sans">
        <Navbar currency={currency} setCurrency={setCurrency} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/hourly-rate-calculator" element={<HourlyCalculator currency={currency} />} />
            <Route path="/hourly-rate-calculator/:role" element={<HourlyCalculator currency={currency} />} />
            <Route path="/day-rate-architect" element={<DayRateArchitect currency={currency} />} />
            <Route path="/retainer-calculator" element={<RetainerCalculator currency={currency} />} />
            <Route path="/overhead-expense-calculator" element={<OverheadCalculator currency={currency} />} />
            <Route path="/platform-fee-calculator" element={<PlatformFeeCalculator currency={currency} />} />
            <Route path="/tax-take-home-estimator" element={<TaxEstimator currency={currency} />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/disclaimer" element={<DisclaimerPage />} />
            <Route path="/editorial-policy" element={<EditorialPolicy />} />
            <Route path="/guides/how-to-set-freelance-rates" element={<GuideRates />} />
            <Route path="/guides/billable-hours-utilization" element={<GuideUtilization />} />
            <Route path="/guides/fixed-price-vs-hourly" element={<GuideFixedVsHourly />} />
            <Route path="/guides/pricing-packages" element={<GuidePackages />} />
            <Route path="/guides/retainers-for-freelancers" element={<GuideRetainers />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;