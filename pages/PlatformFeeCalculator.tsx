
import React, { useState, useMemo } from 'react';
import { Card, Input, Button, Disclaimer, CopyButton } from '../components/UI';
import { Currency } from '../types';
import { formatCurrency, calculateNetFromGross, calculateGrossFromNet } from '../services/calculations';
import { PAGES } from '../seo/seoContent';

const PlatformFeeCalculator: React.FC<{ currency: Currency }> = ({ currency }) => {
  const content = PAGES['/platform-fee-calculator/'];
  const [platform, setPlatform] = useState('Upwork');
  const [amount, setAmount] = useState(1500);
  const [mode, setMode] = useState<'forward' | 'reverse'>('forward');
  const [feeInput, setFeeInput] = useState(10);
  const [paymentFee, setPaymentFee] = useState(2.9);

  const stats = useMemo(() => {
    const totalPercentage = feeInput + paymentFee;
    if (mode === 'forward') {
      const { fee, net } = calculateNetFromGross(amount, totalPercentage, 0.30);
      return { fee, result: net, label: "Real Take-Home (Net)" };
    } else {
      const gross = calculateGrossFromNet(amount, totalPercentage, 0.30);
      return { fee: gross - amount, result: gross, label: "Total Quote (Gross)" };
    }
  }, [amount, feeInput, paymentFee, mode]);

  const platformReport = `
2026 PLATFORM FEE ANALYSIS
--------------------------
Platform: ${platform}
Mode: ${mode === 'forward' ? 'Gross to Net' : 'Net to Gross'}
${mode === 'forward' ? 'Project Price: ' : 'Target Net: '}${formatCurrency(amount, currency)}

RESULTS:
- Commision (${feeInput}%): ${formatCurrency(amount * (feeInput/100), currency)}
- Payment Fees (${paymentFee}%): ${formatCurrency(amount * (paymentFee/100), currency)}
- ${stats.label}: ${formatCurrency(stats.result, currency)}
- Total Efficiency Loss: ${Math.round((stats.fee / (mode === 'forward' ? amount : stats.result)) * 100)}%
  `.trim();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 print:hidden">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
            <span className="text-blue-600">Net Profit Control</span>
            <span className="opacity-30">/</span>
            <span className="text-slate-900">Platform Auditor</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Platform Fee Architect</h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed font-medium">Don't absorb the 2026 platform commission. Find exactly what to quote to protect your margin.</p>
        </div>
        <div className="flex gap-3">
          <CopyButton text={platformReport} />
          <Button variant="outline" onClick={() => window.print()} className="!px-4 !py-2 !text-xs">Save PDF</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
        <div className="lg:col-span-5 space-y-4 print:col-span-12">
          <Card className="p-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 pb-4 border-b">1. Market Channel</h3>
            <div className="grid grid-cols-3 gap-2 mb-8 bg-slate-100 p-1.5 rounded-2xl">
              {['Upwork', 'Fiverr', 'Malt'].map(p => (
                <button 
                  key={p}
                  onClick={() => {
                    setPlatform(p);
                    setFeeInput(p === 'Upwork' ? 10 : (p === 'Fiverr' ? 20 : 5));
                    setPaymentFee(p === 'Malt' ? 0 : 2.9);
                  }}
                  className={`py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all ${platform === p ? 'bg-white text-blue-600 shadow-md' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {p}
                </button>
              ))}
            </div>

            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 pb-4 border-b">2. Calculation Vector</h3>
            <div className="flex gap-2 mb-8">
              <button 
                onClick={() => setMode('forward')}
                className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border-2 ${mode === 'forward' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'}`}
              >
                Quote → Wallet
              </button>
              <button 
                onClick={() => setMode('reverse')}
                className={`flex-1 py-3 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border-2 ${mode === 'reverse' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'}`}
              >
                Wallet → Quote
              </button>
            </div>

            <Input 
              label={mode === 'forward' ? "Gross Quote Amount" : "Desired Net Income"} 
              value={amount} 
              onChange={setAmount} 
              suffix={currency} 
            />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Platform %" value={feeInput} onChange={setFeeInput} suffix="%" />
              <Input label="Payment Fee %" value={paymentFee} onChange={setPaymentFee} suffix="%" />
            </div>
          </Card>
          
          <Card className="p-8 bg-slate-50 border-slate-200 print:hidden">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Hidden Fee Intelligence</h4>
            <ul className="space-y-3">
              <li className="text-[11px] text-slate-500 leading-snug"><strong>Withdrawal Fees:</strong> In 2026, most platforms charge $2 - $30 per bank transfer.</li>
              <li className="text-[11px] text-slate-500 leading-snug"><strong>Initiation Fees:</strong> Upwork now charges $2.95 per new contract initiated.</li>
              <li className="text-[11px] text-slate-500 leading-snug"><strong>Currency Loss:</strong> If working in USD but living in UK/EU/PK, expect a <strong>1.5% - 3%</strong> spread loss.</li>
            </ul>
          </Card>
        </div>

        <div className="lg:col-span-7 space-y-6 print:col-span-12">
          <Disclaimer />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-10 bg-blue-600 text-white border-none shadow-2xl relative overflow-hidden group">
              <div className="relative z-10">
                <span className="text-[10px] uppercase tracking-widest font-black opacity-70 block mb-4">{stats.label}</span>
                <div className="text-6xl font-black mb-2 tracking-tighter">{formatCurrency(stats.result, currency)}</div>
                <p className="text-[10px] uppercase font-bold opacity-70">2026 Platform Efficient Target</p>
              </div>
              <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform">
                <svg className="w-40 h-40" fill="currentColor" viewBox="0 0 24 24"><path d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </div>
            </Card>

            <Card className="p-10 border-4 border-slate-900 bg-white relative overflow-hidden group">
              <div className="relative z-10">
                <span className="text-[10px] uppercase tracking-widest font-black text-slate-400 block mb-4">Total Friction Loss</span>
                <div className="text-6xl font-black mb-2 text-slate-900 tracking-tighter">{formatCurrency(stats.fee, currency)}</div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Fees to Middlemen</p>
              </div>
            </Card>
          </div>

          <div className="prose prose-slate max-w-none bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm print:hidden">
            <h2 className="mt-0 text-3xl font-black text-slate-900">{content.h1}</h2>
            {content.intro.map((p, i) => <p key={i} className="text-lg text-slate-600 font-medium">{p}</p>)}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              <div className="p-8 bg-green-50 rounded-3xl border border-green-100">
                <h4 className="font-bold text-green-800 text-sm mb-2 mt-0">Upwork Benchmark</h4>
                <p className="text-xs text-green-700 leading-relaxed mb-0">Upwork has standardized at 10%. However, with Connects costs increasing in 2026, we recommend adding a <strong>2% 'acquisition buffer'</strong> to all project quotes.</p>
              </div>
              <div className="p-8 bg-slate-900 text-white rounded-3xl">
                <h4 className="font-bold text-blue-400 text-sm mb-2 mt-0">Fiverr Insight</h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-0">Fiverr's 20% fee is high but covers SEO. To compete in 2026, ensure your "Standard" tier anchors at 2x the cost of your "Basic" to maintain net profit parity.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformFeeCalculator;
