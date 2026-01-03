
import React, { useState, useMemo } from 'react';
import { Card, Input, Button, Disclaimer, CopyButton } from '../components/UI';
import { Currency } from '../types';
import { formatCurrency } from '../services/calculations';
import { PAGES } from '../seo/seoContent';

const DayRateArchitect: React.FC<{ currency: Currency }> = ({ currency }) => {
  const content = PAGES['/day-rate-architect'];
  
  const [baseHourly, setBaseHourly] = useState(95);
  const [hoursPerDay, setHoursPerDay] = useState(7);
  const [safetyBuffer, setSafetyBuffer] = useState(15);
  const [expertisePremium, setExpertisePremium] = useState(10);

  const stats = useMemo(() => {
    const rawDay = baseHourly * hoursPerDay;
    const bufferAmount = rawDay * (safetyBuffer / 100);
    const premiumAmount = rawDay * (expertisePremium / 100);
    const finalDayRate = Math.round(rawDay + bufferAmount + premiumAmount);
    
    return {
      rawDay,
      bufferAmount,
      premiumAmount,
      finalDayRate,
      threeDaySprint: Math.round(finalDayRate * 3 * 0.95), // 5% discount for 3-day commitment
      weeklyBlock: Math.round(finalDayRate * 5 * 0.85),    // 15% discount for full week
    };
  }, [baseHourly, hoursPerDay, safetyBuffer, expertisePremium]);

  const reportText = `
2026 DAY RATE ARCHITECTURE
--------------------------
Base Hourly: ${formatCurrency(baseHourly, currency)}/hr
Daily Focus: ${hoursPerDay} Billable Hours
Safety Buffer: ${safetyBuffer}%
Expertise Premium: ${expertisePremium}%

RECOMMENDED RATES:
- Single Day Rate: ${formatCurrency(stats.finalDayRate, currency)}
- 3-Day Sprint Block: ${formatCurrency(stats.threeDaySprint, currency)}
- Full Weekly Block: ${formatCurrency(stats.weeklyBlock, currency)}

Effective Hourly (Day Rate): ${formatCurrency(stats.finalDayRate / hoursPerDay, currency)}/hr
`.trim();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 print:hidden">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
            <span className="text-blue-600">Value Modeling</span>
            <span className="opacity-30">/</span>
            <span className="text-slate-900">Time-Block Architect</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">Day Rate & Weekly Architect</h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed font-medium">Transition from "Pay per Minute" to "Pay per Focus Block." Secure your margins in the 2026 expert economy.</p>
        </div>
        <div className="flex gap-3">
          <CopyButton text={reportText} label="Copy Value Model" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
        <div className="lg:col-span-4 space-y-4">
          <Card className="p-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 pb-4 border-b">1. Efficiency Inputs</h3>
            <Input label="Your Baseline Hourly" value={baseHourly} onChange={setBaseHourly} suffix={currency} help="Used as the price floor." />
            <Input label="Billable Hours/Day" value={hoursPerDay} onChange={setHoursPerDay} suffix="Hrs" help="The deep-work focus limit." />
          </Card>

          <Card className="p-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 pb-4 border-b">2. Risk & Value Buffers</h3>
            <Input label="Safety Buffer %" value={safetyBuffer} onChange={setSafetyBuffer} suffix="%" help="Covers context switching & admin." />
            <Input label="Expertise Premium %" value={expertisePremium} onChange={setExpertisePremium} suffix="%" help="Your niche 'specialist' markup." />
          </Card>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <Disclaimer />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-blue-600 text-white rounded-[2rem] p-8 shadow-2xl shadow-blue-200 flex flex-col min-h-[280px]">
              <span className="text-[10px] uppercase tracking-widest font-black opacity-70 block mb-auto">Standard Day Rate</span>
              <div className="mt-8">
                <div className="text-5xl font-black mb-2">{formatCurrency(stats.finalDayRate, currency)}</div>
                <p className="text-[10px] uppercase font-bold opacity-70">Single-Day Focus Block</p>
              </div>
            </div>

            <div className="bg-slate-900 text-white rounded-[2.5rem] p-8 shadow-xl flex flex-col min-h-[280px]">
              <span className="text-[10px] uppercase tracking-widest font-black opacity-60 block mb-auto">3-Day Sprint</span>
              <div className="mt-8">
                <div className="text-5xl font-black mb-2 text-blue-400">{formatCurrency(stats.threeDaySprint, currency)}</div>
                <p className="text-[10px] uppercase font-bold opacity-50">High-Velocity Delivery Block</p>
              </div>
            </div>

            <div className="bg-white border-2 border-slate-200 rounded-[2.5rem] p-8 flex flex-col min-h-[280px]">
              <span className="text-[10px] uppercase tracking-widest font-black text-slate-400 block mb-auto">Weekly Retainer</span>
              <div className="mt-8">
                <div className="text-5xl font-black mb-2 text-slate-900">{formatCurrency(stats.weeklyBlock, currency)}</div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Exclusive 5-Day Availability</p>
              </div>
            </div>
          </div>

          <Card className="p-10 border-slate-200 bg-slate-50">
            <div className="flex flex-col md:flex-row gap-10">
              <div className="flex-1">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 mb-4">Effective Rate Analysis</h3>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-4xl font-black text-slate-900">{formatCurrency(stats.finalDayRate / hoursPerDay, currency)}</span>
                  <span className="text-sm font-bold text-slate-400 mb-1">/ hour</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  By billing a day rate, you are earning <strong>{Math.round(((stats.finalDayRate / hoursPerDay) / baseHourly - 1) * 100)}% more</strong> than your baseline hourly rate while providing the client with budget certainty.
                </p>
              </div>
              <div className="flex-1 space-y-4">
                <div className="p-4 bg-white rounded-2xl border border-slate-200">
                  <h4 className="text-[10px] font-black uppercase text-slate-400 mb-1">Scope Protection</h4>
                  <p className="text-[11px] text-slate-600 font-bold leading-tight italic">"This Day Rate covers 7 hours of dedicated focus. Extra hours beyond the block are billed at {formatCurrency(baseHourly * 1.5, currency)}/hr."</p>
                </div>
              </div>
            </div>
          </Card>

          <div className="prose prose-slate max-w-none bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-sm print:hidden">
            <h2 className="mt-0 text-3xl font-black text-slate-900">{content?.h1}</h2>
            {content?.intro.map((p, i) => <p key={i} className="text-lg text-slate-600 font-medium leading-relaxed">{p}</p>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayRateArchitect;
