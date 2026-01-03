import React from 'react';
import { Link } from 'react-router-dom';
import { TOOL_LINKS, GUIDE_LINKS, TRUST_LINKS } from '../seo/internalLinks';
import { Card } from '../components/UI';

const Sitemap = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Visual Sitemap</h1>
        <p className="text-lg text-slate-600 font-medium">A complete directory of all tools, strategic guides, and legal documentation within the FreelanceCalc platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="p-8">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 mb-6 pb-4 border-b">Pricing Tools</h2>
          <ul className="space-y-4">
            <li><Link to="/" className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors">Home Dashboard</Link></li>
            {TOOL_LINKS.map(link => (
              <li key={link.href}>
                <Link to={link.href} className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-8">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 pb-4 border-b">Knowledge Base</h2>
          <ul className="space-y-4">
            {GUIDE_LINKS.map(link => (
              <li key={link.href}>
                <Link to={link.href} className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-8 bg-slate-50 border-slate-200">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mb-6 pb-4 border-b">Corporate & Trust</h2>
          <ul className="space-y-4">
            {TRUST_LINKS.map(link => (
              <li key={link.href}>
                <Link to={link.href} className="text-sm font-bold text-slate-900 hover:text-blue-600 transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a href="/sitemap.xml" target="_blank" className="text-sm font-bold text-blue-600 hover:underline">
                View XML Sitemap (For Bots)
              </a>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default Sitemap;