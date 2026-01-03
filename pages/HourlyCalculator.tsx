
import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Card, Input, Disclaimer } from '../components/UI';
import { ROLE_DATA } from '../constants';
import { Currency, HourlyRateState } from '../types';
import { calculateHourlyRates, formatCurrency } from '../services/calculations';
import { PAGES } from '../seo/seoContent';

const HourlyCalculator: React.FC<{ currency: Currency }> = ({ currency }) => {
  const { role: roleSlug } = useParams();
  const [searchParams] = useSearchParams();

  const roleName = roleSlug ? roleSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'General Freelancer';
  const rolePreset = ROLE_DATA[roleName] || ROLE_DATA.default;

  const content = PAGES['/hourly-rate-calculator/'];

  const [state, setState] = useState<HourlyRateState>({
    targetIncome: parseFloat(searchParams.get('income') || '') || rolePreset.income,
    expenses: parseFloat(searchParams.get('expenses') || '') || rolePreset.expenses,
    weeksOff: 4,
    hoursPerWeek: 40,
    utilization: rolePreset.util,
    profitMargin: 10,
    taxReserve: 25,
    platformFee: 0,
  });

  const results = useMemo(() => calculateHourlyRates(state), [state]);

  const updateState = (key: keyof HourlyRateState, val: number) => {
    setState(prev => ({ ...prev, [key]: val }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span className="opacity-30">/</span>
          <span className="text-slate-900">{roleName} Pricing Model</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">2026 {roleName} Pricing Auditor</h1>
        <p className="text-lg text-slate-600 max-w-2xl leading-relaxed font-medium">The professional standard for high-level independent pricing. Factoring in utilization, overhead, and 2026 tax reserves.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
        {/* Sidebar Inputs */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="p-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 pb-4 border-b">1. Financial Targets</h3>
            <Input label="Desired Annual Net Pay" value={state.targetIncome} onChange={(v) => updateState('targetIncome', v)} suffix={currency} help="What you want in your personal pocket." />
            <Input label="Annual Business Expenses" value={state.expenses} onChange={(v) => updateState('expenses', v)} suffix={currency} help="Software, hardware, marketing." />
          </Card>

          <Card className="p-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 pb-4 border-b">2. Time & Efficiency</h3>
            <Input label="Billable Utilization %" value={state.utilization} onChange={(v) => updateState('utilization', v)} suffix="%" help="The % of time you actually charge for." />
            <Input label="Weeks Off / Year" value={state.weeksOff} onChange={(v) => updateState('weeksOff', v)} suffix="Weeks" />
            <Input label="Max Hours / Week" value={state.hoursPerWeek} onChange={(v) => updateState('hoursPerWeek', v)} suffix="Hrs" />
          </Card>

          <Card className="p-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 pb-4 border-b">3. Margins & Taxes</h3>
            <Input label="Business Profit Margin %" value={state.profitMargin} onChange={(v) => updateState('profitMargin', v)} suffix="%" />
            <Input label="Tax Reserve Fund %" value={state.taxReserve} onChange={(v) => updateState('taxReserve', v)} suffix="%" />
          </Card>
        </div>

        {/* Results Main Area */}
        <div className="lg:col-span-8 space-y-6">
          <Disclaimer />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Box 1: Hourly */}
            <div className="bg-blue-600 text-white rounded-[2rem] p-8 shadow-2xl shadow-blue-200 border border-blue-500 relative overflow-hidden group">
              <div className="relative z-10">
                <span className="text-[10px] uppercase tracking-widest font-black opacity-70 block mb-4">Recommended Hourly</span>
                <div className="text-5xl font-black mb-2">{formatCurrency(results.recommendedHourlyRate || 0, currency)}<span className="text-xl opacity-60">/hr</span></div>
                <p className="text-[10px] uppercase font-bold opacity-70">2026 Market Efficiency Rate</p>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
            </div>

            {/* Box 2: Day Rate */}
            <div className="bg-slate-900 text-white rounded-[2rem] p-8 shadow-2xl shadow-slate-200 border border-slate-800 relative overflow-hidden group">
              <div className="relative z-10">
                <span className="text-[10px] uppercase tracking-widest font-black opacity-70 block mb-4">Standard Day Rate</span>
                <div className="text-5xl font-black mb-2">{formatCurrency(results.dayRate8 || 0, currency)}</div>
                <p className="text-[10px] uppercase font-bold opacity-70">Based on 8-Hour Daily Block</p>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
            </div>

            {/* Box 3: Annual Gross */}
            <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm relative overflow-hidden group">
              <div className="relative z-10">
                <span className="text-[10px] uppercase tracking-widest font-black text-slate-400 block mb-4">Annual Gross Revenue</span>
                <div className="text-5xl font-black mb-2 text-slate-900">{formatCurrency(results.grossRequiredRevenue || 0, currency)}</div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Total Pre-Tax Earnings Goal</p>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform text-slate-900">
                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1v22m5-18H7a3 3 0 000 6h10a3 3 0 010 6H7" /></svg>
              </div>
            </div>
          </div>

          <div className="prose prose-slate max-w-none bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h2 className="mt-0 text-3xl font-black text-slate-900">Pricing Strategy for {roleName}s</h2>
            {content.intro.map((p, i) => <p key={i} className="text-lg text-slate-600 font-medium leading-relaxed">{p}</p>)}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {content.sections.map((s, idx) => (
                <div key={idx} className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
                  <h3 className="text-lg font-black text-slate-900 mb-4 mt-0">{s.h2}</h3>
                  {s.body.map((p, i) => <p key={i} className="text-sm text-slate-500 leading-relaxed mb-0">{p}</p>)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HourlyCalculator;
