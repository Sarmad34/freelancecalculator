
import React, { useState } from 'react';
import { Card, Input, Button, Disclaimer, FAQSection } from '../components/UI';
import { Currency } from '../types';
import { formatCurrency } from '../services/calculations';
import { PAGES } from '../seo/seoContent';

const RetainerCalculator: React.FC<{ currency: Currency }> = ({ currency }) => {
  const content = PAGES['/retainer-calculator'];
  const [hours, setHours] = useState(10);
  const [rate, setRate] = useState(90);
  const [discount, setDiscount] = useState(10);

  const monthlyTotal = hours * rate;
  const discountedTotal = monthlyTotal * (1 - discount / 100);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Retainer Fee Architect</h1>
        <p className="text-lg text-slate-600 max-w-2xl leading-relaxed font-medium">Switch from project-to-project to steady monthly recurring revenue.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
        <Card className="p-8">
          <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 pb-4 border-b">Monthly Commitment</h3>
          <Input label="Hours per Month" value={hours} onChange={setHours} suffix="Hrs" />
          <Input label="Your Standard Hourly Rate" value={rate} onChange={setRate} suffix={currency} />
          <Input label="Retainer Discount %" value={discount} onChange={setDiscount} suffix="%" />
          
          <div className="mt-8 p-10 bg-blue-600 text-white rounded-[2rem] text-center shadow-xl shadow-blue-200">
            <span className="text-xs uppercase tracking-widest font-bold opacity-80">Recommended Monthly Fee</span>
            <div className="text-5xl font-black my-2">{formatCurrency(discountedTotal, currency)}</div>
            <p className="text-sm opacity-80">Guaranteed Income vs {formatCurrency(monthlyTotal, currency)} raw hours</p>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 pb-4 border-b">The Retainer Advantage</h3>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xs flex-shrink-0">1</span>
                <div>
                  <h4 className="font-bold text-slate-900">Predictable Cash Flow</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">Cover your operating costs before the first day of the month.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-black text-xs flex-shrink-0">2</span>
                <div>
                  <h4 className="font-bold text-slate-900">Reduced Admin Burn</h4>
                  <p className="text-sm text-slate-500 leading-relaxed">One invoice per month instead of chasing project milestones.</p>
                </div>
              </li>
            </ul>
          </Card>
          <Disclaimer />
        </div>
      </div>
      <div className="bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-sm max-w-7xl mx-auto">
        <h2 className="mt-0 text-3xl font-black text-slate-900">{content?.h1}</h2>
        {content?.intro.map((p, i) => <p key={i} className="text-lg text-slate-600 font-medium leading-relaxed">{p}</p>)}
        <FAQSection faqs={content?.faqs || []} />
      </div>
    </div>
  );
};

export default RetainerCalculator;
