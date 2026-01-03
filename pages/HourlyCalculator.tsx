
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
        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <span className="text-slate-900">{roleName} Pricing</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4">{roleName} Hourly Rate Calculator</h1>
        <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">The professional standard for freelance pricing. Factor in utilization, overhead, and tax reserves for 2025.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-8">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-8 pb-4 border-b">Income Targets</h3>
            <Input label="Target Annual Net Income" value={state.targetIncome} onChange={(v) => updateState('targetIncome', v)} suffix={currency} />
            <Input label="Business Expenses / Year" value={state.expenses} onChange={(v) => updateState('expenses', v)} suffix={currency} />
            <Input label="Desired Weeks Off" value={state.weeksOff} onChange={(v) => updateState('weeksOff', v)} suffix="Weeks" />
            <Input label="Max Hours / Week" value={state.hoursPerWeek} onChange={(v) => updateState('hoursPerWeek', v)} suffix="Hrs" />
          </Card>

          <Card className="p-8">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-8 pb-4 border-b">Business Buffers</h3>
            <Input label="Billable Utilization %" value={state.utilization} onChange={(v) => updateState('utilization', v)} suffix="%" help="Average: 60%" />
            <Input label="Profit Margin %" value={state.profitMargin} onChange={(v) => updateState('profitMargin', v)} suffix="%" />
            <Input label="Tax Reserve %" value={state.taxReserve} onChange={(v) => updateState('taxReserve', v)} suffix="%" />
          </Card>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <Disclaimer />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-8 bg-blue-600 text-white border-none shadow-2xl">
              <span className="text-xs uppercase tracking-widest font-black opacity-70">Hourly Base Rate</span>
              <div className="text-4xl font-black my-2">{formatCurrency(results.recommendedHourlyRate, currency)}</div>
              <p className="text-[10px] uppercase font-bold opacity-60">Ideal for {roleName}s</p>
            </Card>
            <Card className="p-8 bg-slate-900 text-white border-none shadow-xl">
              <span className="text-xs uppercase tracking-widest font-black opacity-70">Day Rate (8h)</span>
              <div className="text-4xl font-black my-2">{formatCurrency(results.dayRate8, currency)}</div>
              <p className="text-[10px] uppercase font-bold opacity-60">Based on recommended rate</p>
            </Card>
            <Card className="p-8 bg-white border-2 border-slate-100">
              <span className="text-xs uppercase tracking-widest font-black text-slate-400">Min. Gross Revenue</span>
              <div className="text-4xl font-black my-2 text-slate-900">{formatCurrency(results.grossRequiredRevenue, currency)}</div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Total yearly target</p>
            </Card>
          </div>

          {/* Long-form SEO content for AdSense approval */}
          <div className="prose prose-slate max-w-none bg-white p-10 rounded-3xl border border-slate-100 shadow-sm">
            <h2 className="mt-0">{content.h1} for Professionals</h2>
            {content.intro.map((p, i) => <p key={i}>{p}</p>)}
            
            {content.sections.map((s, idx) => (
              <div key={idx} className="mt-10">
                <h3 className="font-bold text-slate-900">{s.h2}</h3>
                {s.body.map((p, i) => <p key={i} className="text-sm">{p}</p>)}
              </div>
            ))}

            <div className="mt-12 p-8 bg-slate-50 rounded-2xl not-prose">
              <h3 className="text-xl font-bold mb-6">Rate Calculation FAQs</h3>
              <div className="space-y-6">
                {content.faqs.map((faq, i) => (
                  <div key={i}>
                    <h4 className="font-bold text-slate-900 text-sm mb-2">{faq.q}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HourlyCalculator;
