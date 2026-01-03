
import React, { useState, useMemo } from 'react';
import { Card, Input, Disclaimer } from '../components/UI';
import { Currency, OverheadState } from '../types';
import { formatCurrency } from '../services/calculations';

const OverheadCalculator: React.FC<{ currency: Currency }> = ({ currency }) => {
  const [state, setState] = useState<OverheadState>({
    softwareSaaS: 1200,
    hardwareGear: 2000,
    marketingAds: 500,
    insuranceLegal: 800,
    educationTraining: 1000,
    officeUtilities: 2400,
  });

  const [billableHours, setBillableHours] = useState(1000);

  const totals = useMemo(() => {
    // Fix: Explicitly cast to number[] to resolve 'unknown' type errors during arithmetic reduction
    const annual = (Object.values(state) as number[]).reduce((a, b) => a + b, 0);
    // Fix: annual is now correctly recognized as a number for division
    const hourlyOverhead = billableHours > 0 ? annual / billableHours : 0;
    return { annual, hourlyOverhead };
  }, [state, billableHours]);

  const update = (key: keyof OverheadState, val: number) => setState(prev => ({ ...prev, [key]: val }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Freelance Overhead Auditor</h1>
        <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">Most freelancers ignore their "Business Burn Rate." Use this auditor to find your true cost of doing business and stop losing profit to hidden subscriptions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-8">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-8 pb-4 border-b">Annual Operating Expenses</h3>
            <Input label="Software & SaaS Subscriptions" value={state.softwareSaaS} onChange={v => update('softwareSaaS', v)} suffix={currency} help="Adobe, Slack, CRM, Hosting, etc." />
            <Input label="Hardware & Equipment (Annualized)" value={state.hardwareGear} onChange={v => update('hardwareGear', v)} suffix={currency} help="Laptop, Monitor, Desk upgrades." />
            <Input label="Marketing & Client Acquisition" value={state.marketingAds} onChange={v => update('marketingAds', v)} suffix={currency} help="LinkedIn Premium, Ads, Events." />
            <Input label="Insurance, Tax Prep & Legal" value={state.insuranceLegal} onChange={v => update('insuranceLegal', v)} suffix={currency} help="Liability insurance, Accounting fees." />
            <Input label="Education & Professional Dev." value={state.educationTraining} onChange={v => update('educationTraining', v)} suffix={currency} help="Courses, Books, Coaching." />
            <Input label="Home Office / Utilities" value={state.officeUtilities} onChange={v => update('officeUtilities', v)} suffix={currency} help="Internet, Electricity, Co-working." />
          </Card>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <Disclaimer />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-8 bg-slate-900 text-white border-none shadow-2xl">
              <span className="text-xs uppercase tracking-widest font-black opacity-70">Total Annual Overhead</span>
              <div className="text-5xl font-black my-2">{formatCurrency(totals.annual, currency)}</div>
              <p className="text-[10px] uppercase font-bold opacity-60">This must be covered before profit</p>
            </Card>
            
            <Card className="p-8 border-2 border-blue-500 bg-blue-50">
              <span className="text-xs uppercase tracking-widest font-black text-blue-600">Hourly "Tax" On Yourself</span>
              <div className="text-5xl font-black my-2 text-slate-900">{formatCurrency(totals.hourlyOverhead, currency)}</div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Cost per billable hour</p>
            </Card>
          </div>

          <Card className="p-8">
            <h3 className="text-xl font-bold mb-6">Efficiency Check</h3>
            <Input label="Total Billable Hours per Year" value={billableHours} onChange={setBillableHours} suffix="Hours" help="Typical full-time freelancers bill 800-1200 hours." />
            
            <div className="mt-8 space-y-4">
              <p className="text-sm text-slate-600 leading-relaxed">
                For every hour you bill a client, you are spending <strong>{formatCurrency(totals.hourlyOverhead, currency)}</strong> just to keep your business running. If your hourly rate is $80, your real margin before taxes is only <strong>{formatCurrency(80 - totals.hourlyOverhead, currency)}</strong>.
              </p>
              <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                <h4 className="font-bold text-amber-800 text-sm mb-1">Pro Tip: The Subscription Trap</h4>
                <p className="text-xs text-amber-700">Audit your SaaS subscriptions every 3 months. Freelancers often waste $500+/year on tools they no longer use.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OverheadCalculator;
