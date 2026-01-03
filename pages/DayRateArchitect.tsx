
import React, { useState, useMemo } from 'react';
import { Card, Input, Button, Disclaimer, CopyButton, FAQSection } from '../components/UI';
import { Currency } from '../types';
import { formatCurrency } from '../services/calculations';
import { PAGES } from '../seo/seoContent';

const DayRateArchitect: React.FC<{ currency: Currency }> = ({ currency }) => {
  const content = PAGES['/day-rate-architect'];
  const [baseHourly, setBaseHourly] = useState(135);
  const [hoursPerDay, setHoursPerDay] = useState(7);
  const [safetyBuffer, setSafetyBuffer] = useState(15);
  const [expertisePremium, setExpertisePremium] = useState(10);

  const stats = useMemo(() => {
    const rawDay = baseHourly * hoursPerDay;
    const bufferAmount = rawDay * (safetyBuffer / 100);
    const premiumAmount = rawDay * (expertisePremium / 100);
    const finalDayRate = Math.round(rawDay + bufferAmount + premiumAmount);
    const threeDaySprint = Math.round(finalDayRate * 3 * 0.95);
    const weeklyRetainer = Math.round(finalDayRate * 5 * 0.88);
    
    return { rawDay, bufferAmount, premiumAmount, finalDayRate, threeDaySprint, weeklyRetainer };
  }, [baseHourly, hoursPerDay, safetyBuffer, expertisePremium]);

  const reportText = `2026 DAY RATE ARCHITECTURE\n---\nStandard Day: ${formatCurrency(stats.finalDayRate, currency)}\n3-Day Sprint: ${formatCurrency(stats.threeDaySprint, currency)}\nWeekly Retainer: ${formatCurrency(stats.weeklyRetainer, currency)}`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6 print:hidden">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mb-3">
            Value Pricing Module
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-3 tracking-tight leading-tight">
            Value Architect: <span className="text-blue-600">Day Rates</span>
          </h1>
          <p className="text-base md:text-lg text-slate-600 leading-relaxed font-medium">
            Model focus-based pricing that reflects your 2026 seniority and eliminates the penalty for being fast.
          </p>
        </div>
        <div className="flex gap-3 h-fit">
          <CopyButton text={reportText} label="Copy Model" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-6 bg-white border-slate-100 shadow-sm overflow-visible">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest text-slate-900">Baseline</h3>
            </div>
            <Input label="Target Hourly Baseline" value={baseHourly} onChange={setBaseHourly} suffix={currency} />
            <Input label="Daily Capacity" value={hoursPerDay} onChange={setHoursPerDay} suffix="Hrs" />
          </Card>

          <Card className="p-6 bg-slate-900 text-white border-none shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-7 h-7 rounded-lg bg-white/10 text-white flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest text-white/70">Premiums</h3>
            </div>
            <Input label="Operational Buffer %" value={safetyBuffer} onChange={setSafetyBuffer} suffix="%" />
            <Input label="Expertise Premium %" value={expertisePremium} onChange={setExpertisePremium} suffix="%" />
          </Card>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <Disclaimer />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Standard Day - Refined Tile */}
            <div className="group relative bg-blue-600 rounded-[2rem] p-7 shadow-xl shadow-blue-100 border border-blue-500 flex flex-col justify-between transition-all hover:-translate-y-1">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[9px] font-black text-white/70 uppercase tracking-[0.2em]">Standard Day</span>
                  <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-[9px] font-bold text-white">1D</div>
                </div>
                <div className="text-4xl font-black text-white tracking-tighter tabular-nums mb-1">
                  {formatCurrency(stats.finalDayRate, currency)}
                </div>
              </div>
              <div className="pt-4 border-t border-white/10">
                <span className="text-[9px] font-black text-white/50 uppercase tracking-widest">Focus Block</span>
              </div>
            </div>

            {/* 3-Day Sprint - Dark Tile */}
            <div className="group relative bg-slate-900 rounded-[2rem] p-7 shadow-xl shadow-slate-100 border border-slate-800 flex flex-col justify-between transition-all hover:-translate-y-1">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[9px] font-black text-blue-400 uppercase tracking-[0.2em]">3-Day Sprint</span>
                  <div className="w-6 h-6 rounded-lg bg-blue-500/10 flex items-center justify-center text-[9px] font-bold text-blue-400">3D</div>
                </div>
                <div className="text-4xl font-black text-blue-400 tracking-tighter tabular-nums mb-1">
                  {formatCurrency(stats.threeDaySprint, currency)}
                </div>
              </div>
              <div className="pt-4 border-t border-white/5">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic">Efficiency Gain</span>
              </div>
            </div>

            {/* Weekly Retainer - Minimalist Tile */}
            <div className="group relative bg-white rounded-[2rem] p-7 shadow-sm border border-slate-200 flex flex-col justify-between transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
              <div>
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Weekly Block</span>
                  <div className="w-6 h-6 rounded-lg bg-slate-50 flex items-center justify-center text-[9px] font-bold text-slate-400">5D</div>
                </div>
                <div className="text-4xl font-black text-slate-900 tracking-tighter tabular-nums mb-1">
                  {formatCurrency(stats.weeklyRetainer, currency)}
                </div>
              </div>
              <div className="pt-4 border-t border-slate-50">
                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Full Capacity</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
            <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">{content?.h1}</h2>
            {content?.intro.map((p, i) => (
              <p key={i} className="text-base text-slate-600 font-medium leading-relaxed mb-6 max-w-3xl">{p}</p>
            ))}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10 mb-10">
               <div className="p-8 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                 <h4 className="text-[10px] font-black text-blue-700 uppercase tracking-widest mb-3">Profitability Hack</h4>
                 <p className="text-xs text-slate-600 font-medium leading-relaxed">Day rates capture the value of your *outcomes*. As you get faster with experience (and AI), your hourly income stays flat, but your Day Rate profit increases.</p>
               </div>
               <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100">
                 <h4 className="text-[10px] font-black text-slate-700 uppercase tracking-widest mb-3">Client Perception</h4>
                 <p className="text-xs text-slate-600 font-medium leading-relaxed">High-end clients prefer buying "Blocks" of time because it signifies seniority and removes the need for granular time-tracking audits.</p>
               </div>
            </div>
            
            <FAQSection faqs={content?.faqs || []} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DayRateArchitect;
