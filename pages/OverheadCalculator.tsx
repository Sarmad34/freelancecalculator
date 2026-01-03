
import React, { useState, useMemo } from 'react';
import { Card, Input, Disclaimer, CopyButton, FAQSection } from '../components/UI';
import { Currency, OverheadState } from '../types';
import { formatCurrency } from '../services/calculations';
import { PAGES } from '../seo/seoContent';

const OverheadCalculator: React.FC<{ currency: Currency }> = ({ currency }) => {
  const content = PAGES['/overhead-expense-calculator'];
  const [state, setState] = useState<OverheadState>({ softwareSaaS: 1450, hardwareGear: 2200, marketingAds: 600, insuranceLegal: 950, educationTraining: 1200, officeUtilities: 2800 });
  const [billableHours, setBillableHours] = useState(1050);

  const totals = useMemo(() => {
    const annual = (Object.values(state) as number[]).reduce((a, b) => a + b, 0);
    const hourlyOverhead = billableHours > 0 ? annual / billableHours : 0;
    return { annual, hourlyOverhead };
  }, [state, billableHours]);

  const update = (key: keyof OverheadState, val: number) => setState(prev => ({ ...prev, [key]: val }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Business Burn Rate Auditor</h1>
        <p className="text-lg text-slate-600 max-w-2xl leading-relaxed font-medium">Identify 2026 SaaS sprawl and profit leakage.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
        <div className="lg:col-span-5 space-y-4">
          <Card className="p-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 pb-4 border-b">Expense Modeling</h3>
            <Input label="Software & AI (SaaS)" value={state.softwareSaaS} onChange={v => update('softwareSaaS', v)} suffix={currency} />
            <Input label="Hardware & Cycle Costs" value={state.hardwareGear} onChange={v => update('hardwareGear', v)} suffix={currency} />
            <Input label="Professional Services" value={state.insuranceLegal} onChange={v => update('insuranceLegal', v)} suffix={currency} />
          </Card>
          <Card className="p-8 bg-blue-50 border-blue-100">
            <h4 className="text-xs font-black text-blue-600 uppercase mb-4">Yearly Billable Baseline</h4>
            <Input label="Total Yearly Billable Hours" value={billableHours} onChange={setBillableHours} suffix="Hrs" />
          </Card>
        </div>
        <div className="lg:col-span-7 space-y-6">
          <Disclaimer />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 text-white rounded-[2rem] p-10 shadow-2xl">
              <span className="text-xs font-black opacity-60 uppercase tracking-widest">Annual Burn</span>
              <div className="text-5xl font-black mt-2">{formatCurrency(totals.annual, currency)}</div>
            </div>
            <div className="bg-white border-2 border-blue-600 rounded-[2rem] p-10">
              <span className="text-xs font-black text-blue-600 uppercase tracking-widest">Hourly Overhead Cost</span>
              <div className="text-5xl font-black mt-2 text-slate-900">{formatCurrency(totals.hourlyOverhead, currency)}</div>
            </div>
          </div>
          <div className="bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h2 className="text-3xl font-black text-slate-900 mb-6">{content?.h1}</h2>
            {content?.intro.map((p, i) => <p key={i} className="text-lg text-slate-600 font-medium mb-4 leading-relaxed">{p}</p>)}
            <FAQSection faqs={content?.faqs || []} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverheadCalculator;
