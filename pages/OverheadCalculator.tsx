
import React, { useState, useMemo } from 'react';
import { Card, Input, Disclaimer, CopyButton, Button } from '../components/UI';
import { Currency, OverheadState } from '../types';
import { formatCurrency } from '../services/calculations';
import { PAGES } from '../seo/seoContent';

const OverheadCalculator: React.FC<{ currency: Currency }> = ({ currency }) => {
  const content = PAGES['/overhead-expense-calculator'];
  const [state, setState] = useState<OverheadState>({
    softwareSaaS: 1450,
    hardwareGear: 2200,
    marketingAds: 600,
    insuranceLegal: 950,
    educationTraining: 1200,
    officeUtilities: 2800,
  });

  const [billableHours, setBillableHours] = useState(1050);

  const totals = useMemo(() => {
    const annual = (Object.values(state) as number[]).reduce((a, b) => a + b, 0);
    const hourlyOverhead = billableHours > 0 ? annual / billableHours : 0;
    return { annual, hourlyOverhead };
  }, [state, billableHours]);

  const auditReport = `
2026 BUSINESS OVERHEAD AUDIT
----------------------------
Currency: ${currency}
Annual Total Burn: ${formatCurrency(totals.annual, currency)}
Billable Hours: ${billableHours}
Hourly Overhead Tax: ${formatCurrency(totals.hourlyOverhead, currency)}

BREAKDOWN:
- Software/AI: ${formatCurrency(state.softwareSaaS, currency)}
- Hardware: ${formatCurrency(state.hardwareGear, currency)}
- Marketing: ${formatCurrency(state.marketingAds, currency)}
- Insurance/Legal: ${formatCurrency(state.insuranceLegal, currency)}
- Education: ${formatCurrency(state.educationTraining, currency)}
- Office/Utilities: ${formatCurrency(state.officeUtilities, currency)}
  `.trim();

  const update = (key: keyof OverheadState, val: number) => setState(prev => ({ ...prev, [key]: val }));

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 print:hidden">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
            <span className="text-blue-600">Profit Engineering</span>
            <span className="opacity-30">/</span>
            <span className="text-slate-900">Overhead Auditor</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Business Burn Rate Auditor</h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed font-medium">Identify 2026 SaaS sprawl and profit leakage. Find exactly how much your business tools "cost" you per billable hour.</p>
        </div>
        <div className="flex gap-3">
          <CopyButton text={auditReport} />
          <Button variant="outline" onClick={() => window.print()} className="!px-4 !py-2 !text-xs">Save PDF</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
        <div className="lg:col-span-5 space-y-4 print:col-span-12">
          <Card className="p-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-8 pb-4 border-b">2026 Expense Modeling</h3>
            <Input label="Software & AI (SaaS)" value={state.softwareSaaS} onChange={v => update('softwareSaaS', v)} suffix={currency} help="Research indicates 2026 SaaS costs are up 12% vs 2024." />
            <Input label="Hardware & Cycle Costs" value={state.hardwareGear} onChange={v => update('hardwareGear', v)} suffix={currency} help="Pro-rated annual cost of 3-year refresh cycle." />
            <Input label="Marketing & Growth" value={state.marketingAds} onChange={v => update('marketingAds', v)} suffix={currency} />
            <Input label="Professional Services" value={state.insuranceLegal} onChange={v => update('insuranceLegal', v)} suffix={currency} help="Legal, Insurance, Accounting." />
            <Input label="Workspace & Connectivity" value={state.officeUtilities} onChange={v => update('officeUtilities', v)} suffix={currency} />
          </Card>

          <Card className="p-8 bg-blue-50 border-blue-100 print:hidden">
            <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-4">Research: 2026 Benchmarks</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-600 italic">Dev/Engineering</span>
                <span className="px-2 py-1 bg-white rounded font-black text-slate-900">8% - 12%</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-600 italic">Creative/Design</span>
                <span className="px-2 py-1 bg-white rounded font-black text-slate-900">14% - 18%</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-600 italic">Consulting/Sales</span>
                <span className="px-2 py-1 bg-white rounded font-black text-slate-900">5% - 9%</span>
              </div>
              <p className="text-[10px] text-blue-800/60 leading-tight pt-2 border-t border-blue-100 font-medium italic">Higher % in creative roles is due to specialized Adobe/Figma costs and GPU hardware cycles.</p>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-7 space-y-6 print:col-span-12">
          <Disclaimer />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-8 bg-slate-900 text-white border-none shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                <span className="text-[10px] uppercase tracking-widest font-black opacity-70 block mb-4">Total Business Burn</span>
                <div className="text-6xl font-black mb-2 tracking-tighter">{formatCurrency(totals.annual, currency)}</div>
                <p className="text-[10px] uppercase font-bold opacity-60">Fixed annual operating budget</p>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-110 transition-transform">
                <svg className="w-40 h-40" fill="currentColor" viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
            </Card>
            
            <Card className="p-8 border-4 border-blue-600 bg-white relative overflow-hidden group">
              <div className="relative z-10">
                <span className="text-[10px] uppercase tracking-widest font-black text-blue-600 block mb-4">Hourly Cost (Operational)</span>
                <div className="text-6xl font-black mb-2 text-slate-900 tracking-tighter">{formatCurrency(totals.hourlyOverhead, currency)}</div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Burn per billable unit</p>
              </div>
            </Card>
          </div>

          <Card className="p-8">
            <h3 className="text-lg font-black mb-6 flex items-center gap-3">
              <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-black">!</span>
              Efficiency Factor Analysis
            </h3>
            <Input label="Your Total Yearly Billable Hours" value={billableHours} onChange={setBillableHours} suffix="Hours" help="Pro Tip: High-demand roles average 900-1,100 hours per year." />
            
            <div className="mt-8 pt-8 border-t border-slate-100">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Profitability Alert</h4>
                  <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600" style={{ width: `${Math.min(100, (totals.hourlyOverhead / 100) * 100)}%` }}></div>
                  </div>
                  <p className="mt-3 text-xs text-slate-500 font-medium leading-relaxed">
                    At a $100/hr market rate, your tools consume <strong>{Math.round((totals.hourlyOverhead / 100) * 100)}%</strong> of your gross revenue.
                  </p>
                </div>
                <div className="flex-1 bg-slate-50 p-6 rounded-2xl">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Strategy: Consolidation</h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed font-medium">By switching to annual billing in 2026, the average freelancer can reduce annual burn by <strong>22%</strong>, increasing net profit by up to 4%.</p>
                </div>
              </div>
            </div>
          </Card>

          <div className="prose prose-slate max-w-none bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm mt-12 print:hidden">
            <h2 className="mt-0 text-3xl font-black text-slate-900">{content?.h1}</h2>
            {content?.intro.map((p, i) => <p key={i} className="text-lg text-slate-600 font-medium leading-relaxed">{p}</p>)}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {content?.sections.map((s, idx) => (
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

export default OverheadCalculator;
