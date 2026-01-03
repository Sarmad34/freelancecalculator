
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

  // Find role by matching slug, handling slashes and spaces
  const initialRole = useMemo(() => {
    if (!roleSlug) return 'Web Designer';
    const match = FREELANCE_ROLES.find(r => r.toLowerCase().replace(/[\/\s]+/g, '-') === roleSlug);
    return match || 'Web Designer';
  }, [roleSlug]);

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

  // Sync state if URL changes externally
  useEffect(() => {
    if (initialRole !== state.role) {
      updateState('role', initialRole);
    }
  }, [initialRole]);

  const results = useMemo(() => calculateHourlyRates(state), [state]);

  const updateState = (key: keyof HourlyRateState, val: any) => {
    setState(prev => {
      const newState = { ...prev, [key]: val };
      
      // Dynamic Role Intelligence
      if (key === 'role') {
        const preset = ROLE_DATA[val as string] || ROLE_DATA.default;
        newState.targetIncome = preset.income;
        newState.expenses = preset.expenses;
        newState.utilization = preset.util;
      }

      // Dynamic Geographic Tax
      if (key === 'freelancerCountry') {
        const country = COUNTRIES.find(c => c.code === val);
        if (country) newState.taxReserve = country.taxRate;
      }

      return newState;
    });
  };

  const handleRoleChange = (newRole: string) => {
    // FIX: replace spaces AND slashes to prevent route break
    const slug = newRole.toLowerCase().replace(/[\/\s]+/g, '-');
    navigate(`/hourly-rate-calculator/${slug}`);
    updateState('role', newRole);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
          <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span className="opacity-30">/</span>
          <span className="text-slate-900">{state.role} Auditor</span>
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-3 tracking-tight leading-tight">
          {state.role} <span className="text-blue-600">Pricing Auditor</span>
        </h1>
        <p className="text-base md:text-lg text-slate-600 max-w-2xl leading-relaxed font-medium">
          Professional-grade financial modeling for {state.role}s. Calibrated for 2026 tax profiles in {COUNTRIES.find(c => c.code === state.freelancerCountry)?.name}.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-6 border-slate-100 shadow-sm overflow-visible">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 pb-4 border-b">1. Market Intelligence</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Service Discipline</label>
                <select 
                  value={state.role} 
                  onChange={(e) => handleRoleChange(e.target.value)} 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer text-sm"
                >
                  {FREELANCE_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">My Location</label>
                  <select 
                    value={state.freelancerCountry} 
                    onChange={(e) => updateState('freelancerCountry', e.target.value)} 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer text-sm"
                  >
                    {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Client Market</label>
                  <select 
                    value={state.clientCountry} 
                    onChange={(e) => updateState('clientCountry', e.target.value)} 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer text-sm"
                  >
                    {COUNTRIES.map(c => <option key={c.code} value={c.code}>{c.name}</option>)}
                  </select>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white border-slate-100 shadow-sm">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6 pb-4 border-b">2. Financial Goals</h3>
            <Input label="Target Annual Net" value={state.targetIncome} onChange={(v) => updateState('targetIncome', v)} suffix={currency} />
            <Input label="Annual Expenses" value={state.expenses} onChange={(v) => updateState('expenses', v)} suffix={currency} />
          </Card>

          <Card className="p-6 bg-slate-900 text-white border-none shadow-xl">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-6 pb-4 border-b border-white/5">3. Business Efficiency</h3>
            <Input label="Billable Utilization %" value={state.utilization} onChange={(v) => updateState('utilization', v)} suffix="%" />
            <div className="grid grid-cols-2 gap-4">
               <Input label="Tax Res %" value={state.taxReserve} onChange={(v) => updateState('taxReserve', v)} suffix="%" />
               <Input label="Profit %" value={state.profitMargin} onChange={(v) => updateState('profitMargin', v)} suffix="%" />
            </div>
          </Card>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <Disclaimer />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Target Hourly - Compact & Beautiful */}
            <div className="group bg-blue-600 text-white rounded-[2rem] p-7 shadow-xl shadow-blue-100 border border-blue-500 flex flex-col justify-between transition-all hover:-translate-y-1">
              <div>
                <span className="text-[9px] uppercase tracking-[0.2em] font-black opacity-60 block mb-6">Recommended Hourly</span>
                <div className="text-4xl font-black tabular-nums tracking-tighter">
                  {formatCurrency(results.recommendedHourlyRate || 0, currency)}<span className="text-sm opacity-50 ml-1">/hr</span>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10">
                <span className="text-[9px] font-bold opacity-40 uppercase tracking-widest italic">Base Survival + Profit</span>
              </div>
            </div>
            
            {/* Day Rate - Slate Aesthetics */}
            <div className="group bg-slate-900 text-white rounded-[2rem] p-7 shadow-xl shadow-slate-200 border border-slate-800 flex flex-col justify-between transition-all hover:-translate-y-1">
              <div>
                <span className="text-[9px] uppercase tracking-[0.2em] font-black text-blue-400 block mb-6">Standard Day Rate</span>
                <div className="text-4xl font-black tabular-nums tracking-tighter">
                  {formatCurrency(results.dayRate8 || 0, currency)}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/5">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">8-Hour Focus Block</span>
              </div>
            </div>

            {/* Annual Goal - Minimalist White */}
            <div className="group bg-white rounded-[2rem] p-7 border border-slate-200 shadow-sm flex flex-col justify-between transition-all hover:-translate-y-1 hover:border-blue-200">
              <div>
                <span className="text-[9px] uppercase tracking-[0.2em] font-black text-slate-400 block mb-6">Revenue Target</span>
                <div className="text-4xl font-black text-slate-900 tabular-nums tracking-tighter">
                  {formatCurrency(results.grossRequiredRevenue || 0, currency)}
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-50">
                <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Gross Annual Pre-Tax</span>
              </div>
            </div>
          </div>

          <div className="prose prose-slate max-w-none bg-white p-10 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
            <h2 className="mt-0 text-2xl font-black text-slate-900 tracking-tight">
              2026 Strategy: {state.role}
            </h2>
            <div className="h-1 w-12 bg-blue-600 rounded-full mb-8"></div>
            
            {content?.intro.map((p, i) => <p key={i} className="text-base text-slate-600 font-medium leading-relaxed mb-6">{p}</p>)}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 mb-12">
              {content?.sections.map((s, idx) => (
                <div key={idx} className="p-8 bg-slate-50 rounded-2xl border border-slate-100 shadow-sm transition-all hover:bg-white hover:border-blue-100">
                  <h3 className="text-sm font-black text-slate-900 mb-3 uppercase tracking-tight">{s.h2}</h3>
                  {s.body.map((p, i) => <p key={i} className="text-xs text-slate-500 leading-relaxed mb-0 font-medium">{p}</p>)}
                </div>
              ))}
            </div>

            <div className="bg-slate-950 text-white p-10 rounded-[2rem] mb-12">
              <h3 className="text-lg font-black mb-6 flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-[10px]">!</span>
                Industry Tips
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(ROLE_DATA[state.role] || ROLE_DATA.default).tips.map((tip, i) => (
                  <li key={i} className="flex gap-3 text-xs font-medium text-slate-400">
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
