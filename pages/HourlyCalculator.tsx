
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom';
import { Card, Input, Disclaimer, FAQSection } from '../components/UI';
import { ROLE_DATA, FREELANCE_ROLES, COUNTRIES } from '../constants';
import { Currency, HourlyRateState } from '../types';
import { calculateHourlyRates, formatCurrency } from '../services/calculations';
import { PAGES } from '../seo/seoContent';

const HourlyCalculator: React.FC<{ currency: Currency }> = ({ currency }) => {
  const { role: roleSlug } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const initialRole = roleSlug ? roleSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'Web Designer';
  const rolePreset = ROLE_DATA[initialRole] || ROLE_DATA.default;
  const content = PAGES['/hourly-rate-calculator'];

  const [state, setState] = useState<HourlyRateState>({
    role: initialRole,
    freelancerCountry: 'US',
    clientCountry: 'US',
    targetIncome: parseFloat(searchParams.get('income') || '') || rolePreset.income,
    expenses: parseFloat(searchParams.get('expenses') || '') || rolePreset.expenses,
    weeksOff: 4,
    hoursPerWeek: 40,
    utilization: rolePreset.util,
    profitMargin: 10,
    taxReserve: 28,
    platformFee: 0,
  });

  const results = useMemo(() => calculateHourlyRates(state), [state]);

  // Handle dynamic updates when Role or Country changes
  const updateState = (key: keyof HourlyRateState, val: any) => {
    setState(prev => {
      const newState = { ...prev, [key]: val };
      
      // If role changes, reset target income and expenses to the role's 2026 benchmarks
      if (key === 'role') {
        const preset = ROLE_DATA[val as string] || ROLE_DATA.default;
        newState.targetIncome = preset.income;
        newState.expenses = preset.expenses;
        newState.utilization = preset.util;
      }

      // If freelancer country changes, adjust the tax reserve automatically
      if (key === 'freelancerCountry') {
        const country = COUNTRIES.find(c => c.code === val);
        if (country) newState.taxReserve = country.taxRate;
      }

      return newState;
    });
  };

  const handleRoleChange = (newRole: string) => {
    const slug = newRole.toLowerCase().replace(/ /g, '-');
    navigate(`/hourly-rate-calculator/${slug}`);
    updateState('role', newRole);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span className="opacity-30">/</span>
          <span className="text-slate-900">{state.role} Auditor</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-[1.1]">
          {state.role} <span className="text-blue-600">Pricing Auditor</span>
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl leading-relaxed font-medium">
          Professional-grade independent pricing. Updated with 2026 tax and market benchmarks for {COUNTRIES.find(c => c.code === state.freelancerCountry)?.name}.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
        <div className="lg:col-span-4 space-y-6">
          {/* Section 1: Dynamic Profile */}
          <Card className="p-8 border-slate-100 shadow-sm overflow-visible">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 pb-4 border-b">1. Market Intelligence</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Service Discipline</label>
                <select 
                  value={state.role} 
                  onChange={(e) => handleRoleChange(e.target.value)} 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer"
                >
                  {FREELANCE_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                <p className="mt-2 text-[10px] text-blue-600 font-bold uppercase tracking-wider">Updates Income Presets</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">My Base</label>
                  <select 
                    value={state.freelancerCountry} 
                    onChange={(e) => updateState('freelancerCountry', e.target.value)} 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer"
                  >
                    {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
                  </select>
                  <p className="mt-2 text-[10px] text-blue-600 font-bold uppercase tracking-wider italic">Updates Tax Preset</p>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Target Market</label>
                  <select 
                    value={state.clientCountry} 
                    onChange={(e) => updateState('clientCountry', e.target.value)} 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer"
                  >
                    {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </Card>

          {/* Section 2: Revenue Targets */}
          <Card className="p-8 bg-white border-slate-100 shadow-sm">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 pb-4 border-b">2. Revenue Targets</h3>
            <Input label="Desired Annual Net Pay" value={state.targetIncome} onChange={(v) => updateState('targetIncome', v)} suffix={currency} />
            <Input label="Annual Business Expenses" value={state.expenses} onChange={(v) => updateState('expenses', v)} suffix={currency} />
          </Card>

          {/* Section 3: Efficiency & Tax */}
          <Card className="p-8 bg-slate-900 text-white border-none shadow-xl">
            <h3 className="text-xs font-black uppercase tracking-widest text-white/50 mb-6 pb-4 border-b border-white/5">3. Efficiency & Tax</h3>
            <Input label="Billable Utilization %" value={state.utilization} onChange={(v) => updateState('utilization', v)} suffix="%" />
            <div className="grid grid-cols-2 gap-4">
               <Input label="Tax Res %" value={state.taxReserve} onChange={(v) => updateState('taxReserve', v)} suffix="%" />
               <Input label="Profit %" value={state.profitMargin} onChange={(v) => updateState('profitMargin', v)} suffix="%" />
            </div>
          </Card>
        </div>

        <div className="lg:col-span-8 space-y-8">
          <Disclaimer />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-600 text-white rounded-[2rem] p-8 shadow-2xl shadow-blue-200 border border-blue-500 flex flex-col justify-between min-h-[160px] transition-transform hover:-translate-y-1">
              <span className="text-[10px] uppercase tracking-widest font-black opacity-70 block mb-4">Recommended Hourly</span>
              <div>
                <div className="text-5xl font-black tabular-nums">{formatCurrency(results.recommendedHourlyRate || 0, currency)}<span className="text-xl opacity-60">/hr</span></div>
              </div>
            </div>
            
            <div className="bg-slate-900 text-white rounded-[2rem] p-8 shadow-2xl shadow-slate-200 border border-slate-800 flex flex-col justify-between min-h-[160px] transition-transform hover:-translate-y-1">
              <span className="text-[10px] uppercase tracking-widest font-black opacity-70 block mb-4">Standard Day Rate</span>
              <div>
                <div className="text-5xl font-black tabular-nums">{formatCurrency(results.dayRate8 || 0, currency)}</div>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm flex flex-col justify-between min-h-[160px] transition-transform hover:-translate-y-1 hover:border-blue-200">
              <span className="text-[10px] uppercase tracking-widest font-black text-slate-400 block mb-4">Annual Revenue Goal</span>
              <div>
                <div className="text-5xl font-black text-slate-900 tabular-nums">{formatCurrency(results.grossRequiredRevenue || 0, currency)}</div>
              </div>
            </div>
          </div>

          <div className="prose prose-slate max-w-none bg-white p-10 md:p-14 rounded-[3rem] border border-slate-100 shadow-sm relative">
            <h2 className="mt-0 text-3xl font-black text-slate-900">
              {state.role} in {COUNTRIES.find(c => c.code === state.freelancerCountry)?.name}
            </h2>
            <div className="h-1 w-20 bg-blue-600 rounded-full mb-10"></div>
            
            {content?.intro.map((p, i) => <p key={i} className="text-lg text-slate-600 font-medium leading-relaxed mb-8">{p}</p>)}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 mb-16">
              {content?.sections.map((s, idx) => (
                <div key={idx} className="p-10 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-sm transition-all hover:bg-white hover:border-blue-100">
                  <h3 className="text-lg font-black text-slate-900 mb-4 mt-0 uppercase tracking-tight">{s.h2}</h3>
                  {s.body.map((p, i) => <p key={i} className="text-sm text-slate-500 leading-relaxed mb-0 font-medium">{p}</p>)}
                </div>
              ))}
            </div>

            <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] mb-16">
              <h3 className="text-xl font-black mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs">!</span>
                2026 Strategy Tips for {state.role}s
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(ROLE_DATA[state.role] || ROLE_DATA.default).tips.map((tip, i) => (
                  <li key={i} className="flex gap-4 text-sm font-medium text-slate-300">
                    <span className="text-blue-500 font-black">→</span> {tip}
                  </li>
                ))}
              </ul>
            </div>

            <FAQSection faqs={content?.faqs || []} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HourlyCalculator;
