
import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Input, Button, Disclaimer, CopyButton } from '../components/UI';
import { FREELANCE_ROLES, PROJECT_TYPES } from '../constants';
import { Currency, ProjectQuoteResult, CopyBlocks } from '../types';
import { generateProjectQuote } from '../services/geminiService';
import { formatCurrency } from '../services/calculations';

// No need to declare window.aistudio as it is already provided by the platform environment

const ProjectQuoteCalculator: React.FC<{ currency: Currency }> = ({ currency }) => {
  const { role: roleSlug } = useParams();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ quote: ProjectQuoteResult; copy: CopyBlocks } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const initialRole = useMemo(() => {
    if (roleSlug) {
      return roleSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }
    return FREELANCE_ROLES[0];
  }, [roleSlug]);

  const [form, setForm] = useState({
    role: initialRole,
    projectType: PROJECT_TYPES[0],
    hours: 25,
    rate: 95,
    complexity: 'Medium'
  });

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
    setError(null);
    setSelectedTier(null);

    try {
      // Check if we need to prompt for an API key (Live Domain Requirement)
      /* @ts-ignore - aistudio is injected by the platform */
      if (window.aistudio) {
        /* @ts-ignore */
        const hasKey = await window.aistudio.hasSelectedApiKey();
        if (!hasKey) {
          /* @ts-ignore */
          await window.aistudio.openSelectKey();
          // Instructions suggest proceeding directly after opening
        }
      }

      const data = await generateProjectQuote({
        role: form.role,
        projectType: form.projectType,
        estimatedHours: form.hours,
        hourlyRate: form.rate,
        complexity: form.complexity,
        currency
      });
      setResult(data);
      setSelectedTier('Standard');
    } catch (err: any) {
      let msg = err.message || "An unexpected error occurred.";
      if (msg.includes("API_KEY")) {
        msg = "AI configuration required. Please ensure you have selected a valid API key in the platform settings.";
      }
      setError(msg);
      console.error("Quote Generation Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const dynamicEmail = useMemo(() => {
    if (!result || !selectedTier) return result?.copy.clientEmail || "";
    const pkg = result.quote.packages.find(p => p.name === selectedTier);
    if (!pkg) return result.copy.clientEmail;
    
    return result.copy.clientEmail.replace(
      /\[.*?\]/g, 
      (match) => match.includes('Price') ? formatCurrency(pkg.price, currency) : match.includes('Package') ? pkg.name : match
    );
  }, [result, selectedTier, currency]);

  const fullQuoteText = useMemo(() => {
    if (!result) return "";
    const { quote, copy } = result;
    return `
PROJECT QUOTE: ${quote.projectTitle}
ROLE: ${quote.role}
CURRENCY: ${quote.currency}

PACKAGES:
${quote.packages.map(p => `
[${p.name}] - ${formatCurrency(p.price, currency)}
Best For: ${p.bestFor}
Timeline: ${p.timelineWeeks} Weeks
Revisions: ${p.revisionsIncluded}
Includes: ${p.included.join(', ')}
`).join('\n')}

MILESTONES:
${quote.milestones.map(m => `- ${m.name}: ${m.percent}% (${formatCurrency(m.amount, currency)})`).join('\n')}

PROPOSAL SUMMARY:
${copy.proposalSummary}
    `.trim();
  }, [result, currency]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 print:hidden">
        <div>
          <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
            <span className="text-blue-600">Smart Pricing Suite</span>
            <span className="opacity-30">/</span>
            <span className="text-slate-900">Proposal Builder</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-3 tracking-tight leading-tight">Project Proposal Builder</h1>
          <p className="text-lg text-slate-600 max-w-2xl leading-relaxed font-medium">
            AI-powered tiered quoting engine for independent professionals. Model your value, not your hours.
          </p>
        </div>
        {result && (
          <div className="flex gap-3">
            <CopyButton text={fullQuoteText} label="Copy Full Quote" />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-4 print:hidden">
          <Card className="p-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 pb-4 border-b">Scope Definition</h3>
            
            <div className="mb-6">
              <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Professional Role</label>
              <select 
                value={form.role} 
                onChange={e => setForm({...form, role: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {FREELANCE_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>

            <div className="mb-6">
              <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Project Category</label>
              <select 
                value={form.projectType} 
                onChange={e => setForm({...form, projectType: e.target.value})}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none"
              >
                {PROJECT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>

            <Input label="Base Effort (Hours)" value={form.hours} onChange={v => setForm({...form, hours: v})} help="Estimated baseline labor hours." />
            <Input label="Target Rate" value={form.rate} onChange={v => setForm({...form, rate: v})} suffix={currency} help="Used as the price floor for calculation." />
            
            <div className="mb-8">
              <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Scope Complexity</label>
              <div className="grid grid-cols-3 gap-2">
                {['Low', 'Medium', 'High'].map(c => (
                  <button 
                    key={c}
                    onClick={() => setForm({...form, complexity: c})}
                    className={`py-3 text-[10px] font-black uppercase tracking-widest rounded-xl border-2 transition-all ${form.complexity === c ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <Button onClick={handleGenerate} disabled={loading} className="w-full py-5 text-base">
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Consulting Engine...
                </>
              ) : "Architect Tiered Quote"}
            </Button>

            {error && (
              <div className="mt-4 p-5 bg-red-50 border border-red-200 rounded-2xl shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  <p className="text-xs font-black text-red-600 uppercase tracking-widest">Configuration Required</p>
                </div>
                <p className="text-sm text-red-700 leading-relaxed font-medium">{error}</p>
                <button 
                  /* @ts-ignore - openSelectKey is on window.aistudio */
                  onClick={() => window.aistudio?.openSelectKey()} 
                  className="mt-3 text-xs font-black text-blue-600 hover:text-blue-700 underline uppercase tracking-widest"
                >
                  Select API Key
                </button>
              </div>
            )}
          </Card>
        </div>

        <div className="lg:col-span-8 space-y-5">
          <Disclaimer />
          
          {result ? (
            <div className="space-y-6 animate-in fade-in duration-500">
              <div className="bg-slate-900 text-white rounded-[2rem] p-7 md:p-10 border-none shadow-xl relative overflow-hidden print:bg-transparent print:text-slate-900 print:shadow-none print:p-0">
                <div className="relative z-10">
                  <span className="text-xs uppercase tracking-widest font-black opacity-60 block mb-3 print:text-blue-600">Executive Summary</span>
                  <p className="text-xl md:text-2xl font-medium leading-relaxed italic opacity-95 print:text-lg">
                    "{result.copy.proposalSummary}"
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {result.quote.packages.map((pkg, i) => (
                  <Card 
                    key={i} 
                    className={`p-7 border-4 transition-all relative overflow-hidden flex flex-col print:border-slate-200 print:shadow-none ${
                      selectedTier === pkg.name 
                        ? 'border-blue-600 shadow-2xl md:scale-105 z-10' 
                        : 'border-white opacity-70 hover:opacity-100'
                    }`}
                  >
                    {pkg.name === 'Standard' && (
                      <div className="absolute top-0 right-0 bg-blue-600 text-white text-[8px] font-black uppercase px-3 py-1 rounded-bl-xl tracking-[0.2em] print:hidden">Recommended</div>
                    )}
                    <div className="mb-5">
                      <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${pkg.name === 'Standard' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'}`}>
                        {pkg.name}
                      </span>
                      <div className="text-3xl font-black mt-5 mb-2 text-slate-900 tracking-tight">{formatCurrency(pkg.price, currency)}</div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{pkg.bestFor}</p>
                    </div>
                    
                    <div className="flex-grow space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-sm font-black text-slate-700">
                        <span className="w-5 h-5 bg-green-100 text-green-600 rounded flex items-center justify-center text-[10px]">✓</span>
                        {pkg.timelineWeeks} Weeks Total
                      </div>
                      <div className="flex items-center gap-2 text-sm font-black text-slate-700">
                        <span className="w-5 h-5 bg-green-100 text-green-600 rounded flex items-center justify-center text-[10px]">✓</span>
                        {pkg.revisionsIncluded} Revision Cycles
                      </div>
                      <div className="pt-3 border-t border-slate-100">
                        <h4 className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Deliverables:</h4>
                        <ul className="space-y-2">
                          {pkg.included.slice(0, 5).map((inc, j) => (
                            <li key={j} className="text-sm text-slate-600 font-medium leading-tight flex items-start gap-2">
                              <span className="text-blue-500 mt-1">•</span> {inc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <Button 
                      onClick={() => setSelectedTier(pkg.name)}
                      variant={selectedTier === pkg.name ? 'primary' : 'outline'} 
                      className="w-full !text-xs !uppercase !tracking-widest print:hidden !py-3"
                    >
                      {selectedTier === pkg.name ? 'Selected' : `Choose ${pkg.name}`}
                    </Button>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Card className="p-8">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-5 pb-3 border-b">Payment Schedule</h3>
                  <div className="space-y-4">
                    {result.quote.milestones.map((m, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <div>
                          <p className="text-sm font-black text-slate-900 mb-1 uppercase tracking-wider">{m.name}</p>
                          <p className="text-xs text-slate-400 font-bold">{m.due}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-base font-black text-blue-600">{m.percent}%</p>
                          <p className="text-xs font-bold text-slate-400">{formatCurrency(m.amount, currency)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="p-8 bg-slate-50 border-slate-200">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-5 pb-3 border-b">Agreement Terms</h3>
                  <ul className="space-y-4">
                    {result.quote.assumptions.map((a, i) => (
                      <li key={i} className="text-sm text-slate-600 font-medium flex gap-3 leading-relaxed">
                        <span className="text-blue-600 font-black flex-shrink-0">→</span> {a}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <h4 className="text-xs font-black uppercase text-slate-400 mb-2">Change Management</h4>
                    <p className="text-sm text-slate-600 font-medium italic leading-relaxed">
                      {result.quote.changeRequestPolicy}
                    </p>
                  </div>
                </Card>
              </div>

              <Card className="p-8 print:hidden">
                <div className="flex items-center justify-between mb-5 pb-3 border-b border-slate-100">
                  <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Proposal Email Template ({selectedTier})</h3>
                  <CopyButton text={dynamicEmail} label="Copy Delivery Email" />
                </div>
                <div className="p-6 bg-slate-900 text-blue-400 rounded-xl text-sm font-mono whitespace-pre-wrap leading-relaxed border border-slate-800 shadow-inner overflow-x-auto">
                  {dynamicEmail}
                </div>
              </Card>
            </div>
          ) : (
            <div className="py-16 flex flex-col items-center justify-center text-center p-10 border-4 border-dashed border-slate-200 rounded-[2.5rem] bg-white/50 animate-in fade-in zoom-in-95 duration-500">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-5">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.628.288a2 2 0 01-1.108.209A4.45 4.45 0 018 14.507V7a4 4 0 118 0v4M5 9l2 2m0 0l2-2m-2 2v10m8-10V7" /></svg>
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Generate Your Tiered Proposal</h3>
              <p className="text-slate-500 max-w-sm mb-6 text-base font-medium leading-relaxed">
                Enter your project details on the left. Our AI will model three specific price points based on market depth and complexity.
              </p>
              <div className="flex gap-3">
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                  Value Pricing
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                  Milestone Maps
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectQuoteCalculator;
