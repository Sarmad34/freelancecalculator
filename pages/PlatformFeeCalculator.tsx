
import React, { useState, useMemo } from 'react';
import { Card, Input, Button, Disclaimer, CopyButton, FAQSection } from '../components/UI';
import { Currency } from '../types';
import { formatCurrency, calculateNetFromGross, calculateGrossFromNet } from '../services/calculations';
import { PAGES } from '../seo/seoContent';

const PlatformFeeCalculator: React.FC<{ currency: Currency }> = ({ currency }) => {
  const content = PAGES['/platform-fee-calculator'];
  const [platform, setPlatform] = useState('Upwork');
  const [amount, setAmount] = useState(1500);
  const [mode, setMode] = useState<'forward' | 'reverse'>('forward');
  const [feeInput, setFeeInput] = useState(10);
  const [paymentFee, setPaymentFee] = useState(2.9);

  const stats = useMemo(() => {
    const totalPercentage = feeInput + paymentFee;
    if (totalPercentage >= 100) return { fee: 0, result: 0, label: "Error" };
    if (mode === 'forward') {
      const { fee, net } = calculateNetFromGross(amount, totalPercentage, 0.30);
      return { fee, result: net, label: "Real Take-Home (Net)" };
    } else {
      const gross = calculateGrossFromNet(amount, totalPercentage, 0.30);
      return { fee: gross - amount, result: gross, label: "Total Quote (Gross)" };
    }
  }, [amount, feeInput, paymentFee, mode]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight leading-tight">Platform Fee Architect</h1>
        <p className="text-lg text-slate-600 max-w-2xl leading-relaxed font-medium">Find exactly what to quote to protect your margin.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
        <div className="lg:col-span-5 space-y-4">
          <Card className="p-8">
            <div className="grid grid-cols-3 gap-2 mb-8 bg-slate-100 p-1.5 rounded-2xl">
              {['Upwork', 'Fiverr', 'Malt'].map(p => (
                <button key={p} onClick={() => { setPlatform(p); setFeeInput(p === 'Upwork' ? 10 : (p === 'Fiverr' ? 20 : 5)); }} className={`py-3 text-xs font-black uppercase rounded-xl transition-all ${platform === p ? 'bg-white text-blue-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}>{p}</button>
              ))}
            </div>
            <Input label={mode === 'forward' ? "Gross Quote" : "Target Net"} value={amount} onChange={setAmount} suffix={currency} />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Platform %" value={feeInput} onChange={setFeeInput} suffix="%" />
              <Input label="Payment %" value={paymentFee} onChange={setPaymentFee} suffix="%" />
            </div>
          </Card>
        </div>
        <div className="lg:col-span-7 space-y-6">
          <Disclaimer />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-600 text-white rounded-[2rem] p-10 shadow-2xl">
              <span className="text-xs font-black opacity-70 uppercase">{stats.label}</span>
              <div className="text-5xl font-black mt-2">{formatCurrency(stats.result, currency)}</div>
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

export default PlatformFeeCalculator;
