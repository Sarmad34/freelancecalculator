
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Input, Button, Disclaimer } from '../components/UI';
import { FREELANCE_ROLES, PROJECT_TYPES } from '../constants';
import { Currency, ProjectQuoteResult, CopyBlocks } from '../types';
import { generateProjectQuote } from '../services/geminiService';
import { formatCurrency } from '../services/calculations';

const ProjectQuoteCalculator: React.FC<{ currency: Currency }> = ({ currency }) => {
  const { role: roleSlug } = useParams();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ quote: ProjectQuoteResult; copy: CopyBlocks } | null>(null);

  // Sync role from URL slug if available
  const initialRole = roleSlug 
    ? roleSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : FREELANCE_ROLES[0];

  const [form, setForm] = useState({
    role: initialRole,
    projectType: PROJECT_TYPES[0],
    hours: 20,
    rate: 85,
    complexity: 'Medium'
  });

  // Re-sync if the URL changes
  useEffect(() => {
    if (roleSlug) {
      const decodedRole = roleSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      if (FREELANCE_ROLES.includes(decodedRole)) {
        setForm(prev => ({ ...prev, role: decodedRole }));
      }
    }
  }, [roleSlug]);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const data = await generateProjectQuote({
        role: form.role,
        projectType: form.projectType,
        estimatedHours: form.hours,
        hourlyRate: form.rate,
        complexity: form.complexity,
        currency
      });
      setResult(data);
    } catch (err) {
      alert("Failed to generate quote. Check console or API key.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const exportPDF = () => {
    alert("In a real app, this would trigger a jspdf download of the quote.");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Project Quote Builder {form.role !== FREELANCE_ROLES[0] ? `for ${form.role}s` : ''}</h1>
        <p className="text-slate-600">Instantly generate tiered pricing and a professional proposal structure using AI.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-bold mb-6">Project Details</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">Your Role</label>
              <select 
                value={form.role} 
                onChange={e => setForm({...form, role: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {FREELANCE_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-slate-700 mb-1">Project Type</label>
              <select 
                value={form.projectType} 
                onChange={e => setForm({...form, projectType: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {PROJECT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <Input label="Estimated Baseline Hours" value={form.hours} onChange={v => setForm({...form, hours: v})} />
            <Input label="Your Hourly Rate" value={form.rate} onChange={v => setForm({...form, rate: v})} suffix={currency} />
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-1">Complexity</label>
              <div className="flex gap-2">
                {['Low', 'Medium', 'High'].map(c => (
                  <button 
                    key={c}
                    onClick={() => setForm({...form, complexity: c})}
                    className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-all ${form.complexity === c ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <Button onClick={handleGenerate} disabled={loading} className="w-full py-3 text-base">
              {loading ? "Generating with AI..." : "Generate Professional Quote"}
            </Button>
          </Card>
        </div>

        <div className="lg:col-span-8">
          {result ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <span className="text-sm text-slate-500">Proposal for: <strong>{form.projectType}</strong></span>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setResult(null)}>Reset</Button>
                  <Button onClick={exportPDF}>Export PDF</Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {result.quote.packages.map((pkg, i) => (
                  <Card key={i} className={`p-6 border-2 transition-all ${pkg.name === 'Standard' ? 'border-blue-500 shadow-lg scale-105' : 'border-white'}`}>
                    <div className="text-center">
                      <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${pkg.name === 'Standard' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
                        {pkg.name}
                      </span>
                      <div className="text-3xl font-black my-4">{formatCurrency(pkg.price, currency)}</div>
                      <p className="text-xs text-slate-500 mb-6">{pkg.bestFor}</p>
                    </div>
                    <ul className="text-xs space-y-2 mb-6">
                      <li className="flex items-center gap-2">✅ {pkg.timelineWeeks} Weeks Timeline</li>
                      <li className="flex items-center gap-2">✅ {pkg.revisionsIncluded} Revision Rounds</li>
                      {pkg.included.map((inc, j) => <li key={j} className="flex items-start gap-2">✅ {inc}</li>)}
                    </ul>
                    <Button variant={pkg.name === 'Standard' ? 'primary' : 'outline'} className="w-full text-xs">Select Package</Button>
                  </Card>
                ))}
              </div>

              <Card className="p-8">
                <h3 className="text-lg font-bold mb-4">Milestone Schedule</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {result.quote.milestones.map((m, i) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-xl">
                      <div className="flex justify-between text-sm font-bold mb-1">
                        <span>{m.name}</span>
                        <span>{m.percent}%</span>
                      </div>
                      <div className="text-xs text-slate-500">{m.due}</div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-8">
                <h3 className="text-lg font-bold mb-4">Professional Email Template</h3>
                <div className="p-4 bg-slate-900 text-slate-200 rounded-xl text-sm font-mono whitespace-pre-wrap leading-relaxed">
                  {result.copy.clientEmail}
                </div>
                <Button variant="outline" className="mt-4" onClick={() => navigator.clipboard.writeText(result.copy.clientEmail)}>
                  Copy Email Text
                </Button>
              </Card>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-12 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">No Quote Generated Yet</h3>
              <p className="text-slate-500 max-w-sm mb-6">Fill in the project details on the left and our AI will suggest the best packages for your role.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectQuoteCalculator;
