
import React, { useState } from 'react';
import { Card, Input, Disclaimer, CopyButton, Button } from '../components/UI';
import { Currency } from '../types';
import { formatCurrency } from '../services/calculations';
import { PAGES } from '../seo/seoContent';

const TaxEstimator: React.FC<{ currency: Currency }> = ({ currency }) => {
  const content = PAGES['/tax-take-home-estimator'];
  const [profit, setProfit] = useState(120000);
  const [taxRate, setTaxRate] = useState(28);
  const [extra, setExtra] = useState(15);

  const taxAmount = profit * (taxRate / 100);
  const extraAmount = profit * (extra / 100);
  const takeHome = profit - taxAmount - extraAmount;

  const taxReport = `
2026 FINANCIAL TAKE-HOME PLAN
-----------------------------
Currency: ${currency}
Annual Business Profit: ${formatCurrency(profit, currency)}

BREAKDOWN:
- Tax Reserve (${taxRate}%): ${formatCurrency(taxAmount, currency)}
- Wealth/Savings (${extra}%): ${formatCurrency(extraAmount, currency)}
- Real Take-Home Salary: ${formatCurrency(takeHome, currency)}

MONTHLY SALARY: ${formatCurrency(takeHome / 12, currency)}
WEEKLY ALLOWANCE: ${formatCurrency(takeHome / 52, currency)}
  `.trim();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 print:hidden">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-4">
            <span className="text-blue-600">Wealth Architecture</span>
            <span className="opacity-30">/</span>
            <span className="text-slate-900">Tax & Net Worth Auditor</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">Net Worth Architect</h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed font-medium">Stop the "Post-Tax Panic." Calculate exactly how much you can spend vs how much you must save in 2026.</p>
        </div>
        <div className="flex gap-3">
          <CopyButton text={taxReport} label="Copy Wealth Plan" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
        <div className="lg:col-span-4 space-y-4">
          <Card className="p-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-8 pb-4 border-b">1. Annual Economics</h3>
            <Input label="Business Profit (Pre-Tax)" value={profit} onChange={setProfit} suffix={currency} help="Revenue minus business overhead." />
            <Input label="Tax Multiplier" value={taxRate} onChange={setTaxRate} suffix="%" help="2026 Recommended Benchmark: 28-32%." />
            <Input label="Long-term Savings / ROI" value={extra} onChange={setExtra} suffix="%" help="Aim for 15% to outpace 2026 inflation." />
          </Card>

          <Card className="p-8 bg-slate-50 border-slate-200">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">2026 Allocation Model</h4>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-black uppercase mb-2">
                  <span>Spendable Pay</span>
                  <span className="text-blue-600">{Math.max(0, 100 - taxRate - extra)}%</span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600" style={{ width: `${Math.max(0, 100 - taxRate - extra)}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-black uppercase mb-2">
                  <span>Tax Reserve</span>
                  <span className="text-red-500">{taxRate}%</span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500" style={{ width: `${taxRate}%` }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-black uppercase mb-2">
                  <span>Wealth Savings</span>
                  <span className="text-green-500">{extra}%</span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: `${extra}%` }}></div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-8 space-y-6">
          <Disclaimer />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 text-white rounded-[2rem] p-10 shadow-2xl relative overflow-hidden group col-span-1 md:col-span-2">
              <div className="relative z-10">
                <span className="text-xs uppercase tracking-widest font-black opacity-70 block mb-4">Real Net Salary (Annual)</span>
                <div className="text-6xl font-black mb-2 tracking-tighter leading-none">{formatCurrency(takeHome, currency)}</div>
                <div className="flex flex-wrap gap-4 mt-8">
                  <div className="px-6 py-4 bg-white/10 rounded-2xl border border-white/5 backdrop-blur-sm">
                    <span className="block text-[8px] uppercase font-black opacity-50 mb-1">Monthly</span>
                    <span className="text-2xl font-black">{formatCurrency(takeHome / 12, currency)}</span>
                  </div>
                  <div className="px-6 py-4 bg-white/10 rounded-2xl border border-white/5 backdrop-blur-sm">
                    <span className="block text-[8px] uppercase font-black opacity-50 mb-1">Weekly</span>
                    <span className="text-2xl font-black">{formatCurrency(takeHome / 52, currency)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-600 text-white rounded-[2.5rem] p-10 border-none shadow-xl relative overflow-hidden flex flex-col justify-center">
              <span className="text-xs uppercase tracking-widest font-black opacity-70 block mb-4">Tax Provision</span>
              <div className="text-3xl font-black mb-2 tracking-tighter">{formatCurrency(taxAmount, currency)}</div>
              <p className="text-xs uppercase font-bold opacity-60">Reserved for Govt.</p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-sm print:hidden">
            <h2 className="mt-0 text-3xl font-black text-slate-900">{content?.h1}</h2>
            {content?.intro.map((p, i) => <p key={i} className="text-lg text-slate-600 font-medium leading-relaxed">{p}</p>)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaxEstimator;
