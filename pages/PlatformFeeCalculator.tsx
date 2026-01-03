
import React, { useState, useMemo } from 'react';
import { Card, Input, Button } from '../components/UI';
import { Currency } from '../types';
import { formatCurrency, calculateNetFromGross, calculateGrossFromNet } from '../services/calculations';

const PlatformFeeCalculator: React.FC<{ currency: Currency }> = ({ currency }) => {
  const [platform, setPlatform] = useState('Upwork');
  const [amount, setAmount] = useState(1000);
  const [mode, setMode] = useState<'forward' | 'reverse'>('forward');
  const [feeInput, setFeeInput] = useState(10);

  const stats = useMemo(() => {
    if (mode === 'forward') {
      return calculateNetFromGross(amount, feeInput, 0);
    } else {
      const gross = calculateGrossFromNet(amount, feeInput, 0);
      return { fee: gross - amount, gross };
    }
  }, [amount, feeInput, mode]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Platform Fee Calculator</h1>
        <p className="text-slate-600">Understand the real "take home" from Upwork, Fiverr, and others.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <Card className="p-8">
            <div className="flex gap-2 mb-8 bg-slate-100 p-1 rounded-xl">
              {['Upwork', 'Fiverr', 'Custom'].map(p => (
                <button 
                  key={p}
                  onClick={() => {
                    setPlatform(p);
                    setFeeInput(p === 'Upwork' ? 10 : (p === 'Fiverr' ? 20 : 5));
                  }}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${platform === p ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="flex gap-4 mb-8">
              <button 
                onClick={() => setMode('forward')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg border ${mode === 'forward' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200'}`}
              >
                Estimate Net (I know gross)
              </button>
              <button 
                onClick={() => setMode('reverse')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg border ${mode === 'reverse' ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200'}`}
              >
                Price to Receive X Net
              </button>
            </div>

            <Input 
              label={mode === 'forward' ? "Gross Project Amount" : "Desired Net Amount"} 
              value={amount} 
              onChange={setAmount} 
              suffix={currency} 
            />
            <Input label="Platform Fee %" value={feeInput} onChange={setFeeInput} suffix="%" />

            <div className="mt-8 pt-8 border-t space-y-4">
              {mode === 'forward' ? (
                <>
                  <div className="flex justify-between text-slate-600">
                    <span>Platform Fee ({feeInput}%)</span>
                    <span>-{formatCurrency(stats.fee, currency)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-slate-900">
                    <span>You Receive (Net)</span>
                    <span>{formatCurrency((stats as any).net, currency)}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between text-slate-600">
                    <span>Platform Fee</span>
                    <span>{formatCurrency(stats.fee, currency)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-slate-900">
                    <span>Price to Quote</span>
                    <span>{formatCurrency((stats as any).gross, currency)}</span>
                  </div>
                </>
              )}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-7">
          <Card className="p-8 h-full">
            <h3 className="text-xl font-bold mb-6">Platform Fee Guide</h3>
            <div className="space-y-6">
              <div className="p-4 bg-green-50 border border-green-100 rounded-xl">
                <h4 className="font-bold text-green-800 text-sm mb-1">Upwork</h4>
                <p className="text-xs text-green-700 leading-relaxed">As of 2024, Upwork has moved toward a flat 10% fee for all freelancers. However, Enterprise clients or legacy contracts may still vary. Check your contract for exact numbers.</p>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                <h4 className="font-bold text-blue-800 text-sm mb-1">Fiverr</h4>
                <p className="text-xs text-blue-700 leading-relaxed">Fiverr generally takes a 20% commission on every transaction. If you want to net $80, you must list your service at $100.</p>
              </div>
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl">
                <h4 className="font-bold text-slate-800 text-sm mb-1">Pro Tip: Payment Processing</h4>
                <p className="text-xs text-slate-600 leading-relaxed">Don't forget Stripe or PayPal fees, which are usually around 2.9% + $0.30 per transaction. This is often in addition to your platform fee.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PlatformFeeCalculator;
