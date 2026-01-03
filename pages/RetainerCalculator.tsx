
import React, { useState } from 'react';
import { Card, Input, Button, Disclaimer } from '../components/UI';
import { Currency } from '../types';
import { formatCurrency } from '../services/calculations';

const RetainerCalculator: React.FC<{ currency: Currency }> = ({ currency }) => {
  const [hours, setHours] = useState(10);
  const [rate, setRate] = useState(90);
  const [discount, setDiscount] = useState(10);

  const monthlyTotal = hours * rate;
  const discountedTotal = monthlyTotal * (1 - discount / 100);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Retainer Fee Calculator</h1>
        <p className="text-slate-600">Switch from project-to-project to steady monthly recurring revenue.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="p-8">
          <h3 className="text-lg font-bold mb-6">Monthly Commitment</h3>
          <Input label="Hours per Month" value={hours} onChange={setHours} suffix="Hrs" />
          <Input label="Your Standard Hourly Rate" value={rate} onChange={setRate} suffix={currency} />
          <Input label="Retainer Discount % (Recommended)" value={discount} onChange={setDiscount} suffix="%" help="Freelancers often offer 5-15% discount for guaranteed monthly work." />
          
          <div className="mt-8 p-6 bg-blue-600 text-white rounded-2xl text-center">
            <span className="text-xs uppercase tracking-widest font-bold opacity-80">Recommended Monthly Fee</span>
            <div className="text-4xl font-black my-2">{formatCurrency(discountedTotal, currency)}</div>
            <p className="text-sm opacity-80">Saving client {formatCurrency(monthlyTotal - discountedTotal, currency)}/mo</p>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-8">
            <h3 className="text-xl font-bold mb-4">Why use a retainer?</h3>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <span className="text-blue-600 text-xl font-bold">1</span>
                <div>
                  <h4 className="font-bold text-sm">Predictable Revenue</h4>
                  <p className="text-xs text-slate-500">Cover your base living expenses before the month even starts.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 text-xl font-bold">2</span>
                <div>
                  <h4 className="font-bold text-sm">Priority Support</h4>
                  <p className="text-xs text-slate-500">The client is essentially paying to "rent" space in your calendar, ensuring they are always first in line.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-600 text-xl font-bold">3</span>
                <div>
                  <h4 className="font-bold text-sm">Efficiency Bonus</h4>
                  <p className="text-xs text-slate-500">As you learn the client's systems, you'll get faster, increasing your effective hourly rate.</p>
                </div>
              </li>
            </ul>
          </Card>

          <Card className="p-8 border-2 border-slate-100">
            <h3 className="text-lg font-bold mb-4">Sample SLA Terms</h3>
            <p className="text-sm text-slate-600 mb-4 italic leading-relaxed">
              "This retainer covers up to {hours} hours of work per month. Hours do not roll over. Overage hours will be billed at {formatCurrency(rate, currency)}/hr with a 48-hour response time guarantee."
            </p>
            <Button variant="outline" className="w-full">Copy Terms Snippet</Button>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RetainerCalculator;
