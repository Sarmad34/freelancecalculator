
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useSearchParams, Link, useLocation } from 'react-router-dom';
import { Card, Input, Button, Disclaimer } from '../components/UI';
import { ROLE_DATA } from '../constants';
import { Currency, HourlyRateState } from '../types';
import { calculateHourlyRates, formatCurrency } from '../services/calculations';
import { seoContent } from '../seo/seoContent';

const HourlyCalculator: React.FC<{ currency: Currency }> = ({ currency }) => {
  const { role: roleSlug } = useParams();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const path = location.pathname.endsWith('/') ? location.pathname : `${location.pathname}/`;
  const content = seoContent[path] || seoContent["/hourly-rate-calculator/"];

  const roleName = roleSlug ? roleSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'General Freelancer';
  const rolePreset = ROLE_DATA[roleName] || ROLE_DATA.default;

  const [state, setState] = useState<HourlyRateState>({
    targetIncome: parseFloat(searchParams.get('income') || '') || rolePreset.income,
    expenses: parseFloat(searchParams.get('expenses') || '') || rolePreset.expenses,
    weeksOff: parseFloat(searchParams.get('weeksOff') || '') || 4,
    hoursPerWeek: parseFloat(searchParams.get('hoursPerWeek') || '') || 40,
    utilization: parseFloat(searchParams.get('util') || '') || rolePreset.util,
    profitMargin: parseFloat(searchParams.get('profit') || '') || 10,
    taxReserve: parseFloat(searchParams.get('tax') || '') || 20,
    platformFee: parseFloat(searchParams.get('pFee') || '') || 0,
  });

  const results = useMemo(() => calculateHourlyRates(state), [state]);

  const updateState = (key: keyof HourlyRateState, val: number) => {
    setState(prev => ({ ...prev, [key]: val }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="prose prose-slate max-w-4xl mb-12">
        <h1>{content.h1}</h1>
        {content.intro.map((p, i) => <p key={i}>{p}</p>)}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8 not-prose">
          <div className="bg-slate-100 p-6 rounded-2xl border border-slate-200">
            <h2 className="text-lg font-bold mb-4 mt-0">How to use this tool</h2>
            <ul className="space-y-2">
              {content.howItWorks.map((item, i) => <li key={i} className="flex gap-2 text-sm text-slate-600 font-medium">✅ {item}</li>)}
            </ul>
          </div>
          <div className="bg-amber-50 p-6 rounded-2xl border border-amber-200">
            <h2 className="text-lg font-bold mb-4 mt-0">Avoid these mistakes</h2>
            <ul className="space-y-2">
              {content.commonMistakes.map((item, i) => <li key={i} className="flex gap-2 text-sm text-amber-800 font-medium">❌ {item}</li>)}
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-6 border-b pb-4">Business Goals</h3>
            <Input label="Target Annual Net Income" value={state.targetIncome} onChange={(v) => updateState('targetIncome', v)} suffix={currency} />
            <Input label="Annual Business Expenses" value={state.expenses} onChange={(v) => updateState('expenses', v)} suffix={currency} />
            <Input label="Weeks Off Per Year" value={state.weeksOff} onChange={(v) => updateState('weeksOff', v)} suffix="Weeks" />
            <Input label="Working Hours Per Week" value={state.hoursPerWeek} onChange={(v) => updateState('hoursPerWeek', v)} suffix="Hours" />
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-6 border-b pb-4">Adjustments</h3>
            <Input label="Billable Utilization %" value={state.utilization} onChange={(v) => updateState('utilization', v)} suffix="%" />
            <Input label="Profit Margin %" value={state.profitMargin} onChange={(v) => updateState('profitMargin', v)} suffix="%" />
            <Input label="Tax Reserve %" value={state.taxReserve} onChange={(v) => updateState('taxReserve', v)} suffix="%" />
          </Card>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <Disclaimer />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6 bg-blue-600 text-white border-none shadow-xl">
              <span className="text-xs uppercase tracking-wider font-bold opacity-80">Recommended Hourly</span>
              <div className="text-3xl font-black my-1">{formatCurrency(results.recommendedHourlyRate, currency)}</div>
            </Card>
            <Card className="p-6 bg-slate-900 text-white border-none shadow-xl">
              <span className="text-xs uppercase tracking-wider font-bold opacity-80">Day Rate (8h)</span>
              <div className="text-3xl font-black my-1">{formatCurrency(results.dayRate8, currency)}</div>
            </Card>
            <Card className="p-6 bg-white border-2 border-slate-100 shadow-xl">
              <span className="text-xs uppercase tracking-wider font-bold text-slate-400">Min. Gross Target</span>
              <div className="text-3xl font-black my-1">{formatCurrency(results.grossRequiredRevenue, currency)}</div>
            </Card>
          </div>

          <div className="prose prose-slate max-w-none bg-white p-8 rounded-2xl border border-slate-200">
             {content.sections.map((s, i) => (
                <div key={i} className="mb-8 last:mb-0">
                  <h2 className="text-xl font-bold mt-0 mb-3">{s.h2}</h2>
                  <p className="text-slate-600 text-sm leading-relaxed">{s.p}</p>
                </div>
             ))}
          </div>

          <Card className="p-8">
            <h3 className="text-xl font-bold mb-6">Frequently Asked Questions</h3>
            <div className="space-y-6">
              {content.faqs.map((faq, i) => (
                <div key={i} className="border-b border-slate-100 last:border-0 pb-6">
                  <h4 className="font-bold text-slate-900 mb-2">{faq.q}</h4>
                  <p className="text-slate-600 text-sm">{faq.a}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HourlyCalculator;
