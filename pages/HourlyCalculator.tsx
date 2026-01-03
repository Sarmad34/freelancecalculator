
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Card, Input, Button, Disclaimer } from '../components/UI';
import { ROLE_DATA, FREELANCE_ROLES } from '../constants';
import { Currency, HourlyRateState } from '../types';
import { calculateHourlyRates, formatCurrency } from '../services/calculations';

const HourlyCalculator: React.FC<{ currency: Currency }> = ({ currency }) => {
  const { role: roleSlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const roleName = roleSlug ? roleSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : 'General Freelancer';
  const rolePreset = ROLE_DATA[roleName] || ROLE_DATA.default;

  const [state, setState] = useState<HourlyRateState>({
    targetIncome: parseFloat(searchParams.get('income') || '') || rolePreset.income,
    expenses: parseFloat(searchParams.get('expenses') || '') || rolePreset.expenses,
    weeksOff: parseFloat(searchParams.get('weeksOff') || '') || 4,
    hoursPerWeek: parseFloat(searchParams.get('hoursPerWeek') || '') || 40,
    utilization: parseFloat(searchParams.get('util') || '') || rolePreset.util,
    profitMargin: parseFloat(searchParams.get('profit') || '') || 10,
    taxReserve: parseFloat(searchParams.get('tax') || '') || 20,
    platformFee: parseFloat(searchParams.get('pFee') || '') || 0,
  });

  const results = useMemo(() => calculateHourlyRates(state), [state]);

  const updateState = (key: keyof HourlyRateState, val: number) => {
    setState(prev => ({ ...prev, [key]: val }));
  };

  useEffect(() => {
    const params: Record<string, string> = {};
    if (state.targetIncome !== rolePreset.income) params.income = state.targetIncome.toString();
    if (state.expenses !== rolePreset.expenses) params.expenses = state.expenses.toString();
    if (state.utilization !== rolePreset.util) params.util = state.utilization.toString();
    setSearchParams(params, { replace: true });
  }, [state, setSearchParams, rolePreset]);

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Share link copied to clipboard!");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <span className="text-slate-900 font-medium">Hourly Rate Calculator</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900">Hourly Rate Calculator for {roleName}</h1>
        <p className="text-slate-600">Calculate what you should charge based on your living costs, taxes, and billable time.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Panel */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-6 border-b pb-4">Business Goals</h3>
            <Input 
              label="Target Annual Net Income" 
              value={state.targetIncome} 
              onChange={(v) => updateState('targetIncome', v)} 
              suffix={currency}
              help="The amount you want to 'take home' personally after business expenses and taxes."
            />
            <Input 
              label="Annual Business Expenses" 
              value={state.expenses} 
              onChange={(v) => updateState('expenses', v)} 
              suffix={currency}
              help="Software, equipment, rent, insurance, etc."
            />
            <Input 
              label="Weeks Off Per Year" 
              value={state.weeksOff} 
              onChange={(v) => updateState('weeksOff', v)} 
              suffix="Weeks"
              help="Vacation, public holidays, and sick days."
            />
            <Input 
              label="Working Hours Per Week" 
              value={state.hoursPerWeek} 
              onChange={(v) => updateState('hoursPerWeek', v)} 
              suffix="Hours"
              help="Total time you spend 'at the office' each week."
            />
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold mb-6 border-b pb-4">Adjustments</h3>
            <Input 
              label="Billable Utilization %" 
              value={state.utilization} 
              onChange={(v) => updateState('utilization', v)} 
              suffix="%"
              help="Percent of your time actually spent on billable client work vs admin/marketing."
            />
            <Input 
              label="Profit Margin %" 
              value={state.profitMargin} 
              onChange={(v) => updateState('profitMargin', v)} 
              suffix="%"
              help="Extra buffer for business growth and unforeseen costs."
            />
            <Input 
              label="Tax Reserve %" 
              value={state.taxReserve} 
              onChange={(v) => updateState('taxReserve', v)} 
              suffix="%"
              help="Your estimated average income tax rate (Assumption)."
            />
          </Card>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-8 space-y-6">
          <Disclaimer />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6 bg-blue-600 text-white border-none shadow-xl shadow-blue-100">
              <span className="text-xs uppercase tracking-wider font-bold opacity-80">Min. Hourly Rate</span>
              <div className="text-3xl font-black my-1">{formatCurrency(results.hourlyBaseRate, currency)}</div>
              <p className="text-xs opacity-70">To cover income + expenses only</p>
            </Card>
            <Card className="p-6 bg-slate-900 text-white border-none">
              <span className="text-xs uppercase tracking-wider font-bold opacity-80">Recommended Hourly</span>
              <div className="text-3xl font-black my-1">{formatCurrency(results.recommendedHourlyRate, currency)}</div>
              <p className="text-xs opacity-70">Includes {state.profitMargin}% profit margin</p>
            </Card>
            <Card className="p-6 bg-white border-2 border-slate-100">
              <span className="text-xs uppercase tracking-wider font-bold text-slate-500">Suggested Day Rate</span>
              <div className="text-3xl font-black my-1 text-slate-900">{formatCurrency(results.dayRate8, currency)}</div>
              <p className="text-xs text-slate-500">Based on an 8-hour day</p>
            </Card>
          </div>

          <Card className="p-8">
            <h3 className="text-xl font-bold mb-6">Transparent Math Breakdown</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-slate-50">
                <span className="text-slate-600 text-sm">Target Pre-tax Revenue</span>
                <span className="font-semibold">{formatCurrency(results.requiredRevenueBeforeTax, currency)}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-50">
                <span className="text-slate-600 text-sm">Working Weeks per Year</span>
                <span className="font-semibold">{52 - state.weeksOff}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-50">
                <span className="text-slate-600 text-sm">Billable Hours per Year</span>
                <span className="font-semibold">{results.billableHoursYear.toFixed(0)} <span className="text-xs font-normal text-slate-400">({state.utilization}% of total)</span></span>
              </div>
            </div>

            <div className="mt-8 p-4 bg-slate-50 rounded-xl">
              <h4 className="font-bold text-sm mb-2">How it's calculated:</h4>
              <p className="text-xs text-slate-500 leading-relaxed italic">
                Revenue Required = (Target Income + Expenses) / (1 - Tax%)<br/>
                Hourly Rate = Revenue Required / (Working Weeks × Hours per Week × Utilization%)
              </p>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-6 border-blue-100 bg-blue-50/30">
              <h3 className="text-sm font-bold uppercase tracking-tight text-blue-800 mb-3">Rate Card Snippet</h3>
              <div className="p-3 bg-white border border-blue-200 rounded-lg text-xs font-mono text-slate-700 mb-3 select-all">
                {roleName} Standard Rate<br/>
                Hourly: {formatCurrency(results.recommendedHourlyRate, currency)}<br/>
                Day Rate: {formatCurrency(results.dayRate8, currency)}
              </div>
              <Button onClick={() => navigator.clipboard.writeText(`${roleName} Rate: ${formatCurrency(results.recommendedHourlyRate, currency)}/hr`)} variant="outline" className="w-full text-xs">Copy Text</Button>
            </Card>

            <Card className="p-6">
              <h3 className="text-sm font-bold uppercase tracking-tight text-slate-800 mb-3">Profitability Tips</h3>
              <ul className="text-xs space-y-2 text-slate-600">
                {rolePreset.tips.map((tip, idx) => (
                  <li key={idx} className="flex gap-2"><span>✨</span> {tip}</li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </div>

      <div className="mt-20 border-t pt-12">
        <h2 className="text-2xl font-bold mb-8 text-center">Resources for {roleName}s</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/project-quote-calculator" className="p-6 bg-white border rounded-2xl hover:border-blue-500 transition-all shadow-sm">
            <h4 className="font-bold mb-2">Price Your Projects</h4>
            <p className="text-xs text-slate-500">Move from hourly to value-based project fees with our AI builder.</p>
          </Link>
          <Link to="/guides/how-to-set-freelance-rates" className="p-6 bg-white border rounded-2xl hover:border-blue-500 transition-all shadow-sm">
            <h4 className="font-bold mb-2">Rate Setting Guide</h4>
            <p className="text-xs text-slate-500">A deep dive into the psychology of pricing for {roleName}s.</p>
          </Link>
          <Link to="/tax-take-home-estimator" className="p-6 bg-white border rounded-2xl hover:border-blue-500 transition-all shadow-sm">
            <h4 className="font-bold mb-2">Tax Estimator</h4>
            <p className="text-xs text-slate-500">See how much you'll actually keep after your self-employment taxes.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HourlyCalculator;
