
import React, { useState } from 'react';
import { Card, Input, Disclaimer, CopyButton, FAQSection } from '../components/UI';
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

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">Net Worth Architect</h1>
        <p className="text-lg text-slate-600 max-w-2xl leading-relaxed font-medium">Calculate exactly how much you can spend vs how much you must save.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
        <div className="lg:col-span-4 space-y-4">
          <Card className="p-8">
            <Input label="Pre-Tax Profit" value={profit} onChange={setProfit} suffix={currency} />
            <Input label="Tax Reserve %" value={taxRate} onChange={setTaxRate} suffix="%" />
            <Input label="Wealth Savings %" value={extra} onChange={setExtra} suffix="%" />
          </Card>
        </div>
        <div className="lg:col-span-8 space-y-6">
          <Disclaimer />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 text-white rounded-[2rem] p-10 shadow-2xl">
              <span className="text-xs font-black opacity-70 uppercase tracking-widest">Annual Net Salary</span>
              <div className="text-5xl font-black mt-2 leading-none">{formatCurrency(takeHome, currency)}</div>
            </div>
            <div className="bg-red-600 text-white rounded-[2rem] p-10 flex flex-col justify-center shadow-xl">
              <span className="text-xs font-black opacity-70 uppercase tracking-widest">Tax Provision</span>
              <div className="text-4xl font-black mt-2">{formatCurrency(taxAmount, currency)}</div>
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

export default TaxEstimator;
