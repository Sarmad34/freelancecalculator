
import React, { useState } from 'react';
import { Card, Input, Disclaimer } from '../components/UI';
import { Currency } from '../types';
import { formatCurrency } from '../services/calculations';

const TaxEstimator: React.FC<{ currency: Currency }> = ({ currency }) => {
  const [profit, setProfit] = useState(100000);
  const [taxRate, setTaxRate] = useState(25);
  const [extra, setExtra] = useState(5);

  const taxAmount = profit * (taxRate / 100);
  const extraAmount = profit * (extra / 100);
  const takeHome = profit - taxAmount - extraAmount;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Take-Home Pay Estimator</h1>
        <p className="text-slate-600">Quickly estimate what actually hits your bank account after taxes and savings.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Disclaimer />
          <Card className="p-8">
            <h3 className="text-lg font-bold mb-6">Income Assumptions</h3>
            <Input label="Estimated Annual Profit" value={profit} onChange={setProfit} suffix={currency} help="Revenue minus business expenses." />
            <Input label="Estimated Average Tax %" value={taxRate} onChange={setTaxRate} suffix="%" />
            <Input label="Retirement / Savings %" value={extra} onChange={setExtra} suffix="%" />
          </Card>
          
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 bg-slate-50 border-none">
              <span className="text-xs text-slate-500 block mb-1">Yearly Take-Home</span>
              <span className="text-xl font-bold">{formatCurrency(takeHome, currency)}</span>
            </Card>
            <Card className="p-4 bg-slate-50 border-none">
              <span className="text-xs text-slate-500 block mb-1">Monthly Take-Home</span>
              <span className="text-xl font-bold">{formatCurrency(takeHome / 12, currency)}</span>
            </Card>
          </div>
        </div>

        <div className="space-y-6">
          <Card className="p-8 bg-slate-900 text-white border-none shadow-2xl">
            <h3 className="text-xl font-bold mb-6">Breakdown</h3>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-sm opacity-70">Total Profit</span>
                <span className="font-bold">{formatCurrency(profit, currency)}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-sm text-red-400">Tax Reserve</span>
                <span className="font-bold text-red-400">-{formatCurrency(taxAmount, currency)}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-sm text-blue-400">Personal Savings</span>
                <span className="font-bold text-blue-400">-{formatCurrency(extraAmount, currency)}</span>
              </div>
            </div>
            <div className="text-center">
              <span className="text-xs uppercase tracking-widest opacity-60">Estimated Real Income</span>
              <div className="text-5xl font-black mt-2 mb-4">{formatCurrency(takeHome, currency)}</div>
              <p className="text-xs opacity-50 italic">Note: This is an estimation based solely on your percentage inputs.</p>
            </div>
          </Card>

          <Card className="p-8">
            <h4 className="font-bold mb-4">Official Resources</h4>
            <div className="space-y-3">
              <a href="https://www.gov.uk/estimate-self-assessment-tax-bill" target="_blank" className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50">
                <span className="text-sm font-medium">UK: HMRC Self Assessment Estimator</span>
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
              <a href="https://www.irs.gov/individuals/tax-withholding-estimator" target="_blank" className="flex items-center justify-between p-3 border border-slate-200 rounded-lg hover:bg-slate-50">
                <span className="text-sm font-medium">USA: IRS Tax Estimator</span>
                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TaxEstimator;
