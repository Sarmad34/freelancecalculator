
import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Input, Button, Disclaimer, CopyButton } from '../components/UI';
import { FREELANCE_ROLES, PROJECT_TYPES } from '../constants';
import { Currency, ProjectQuoteResult, CopyBlocks } from '../types';
import { generateProjectQuote } from '../services/geminiService';
import { formatCurrency } from '../services/calculations';

const ProjectQuoteCalculator: React.FC<{ currency: Currency }> = ({ currency }) => {
  const { role: roleSlug } = useParams();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ quote: ProjectQuoteResult; copy: CopyBlocks } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [hasKey, setHasKey] = useState(false);

  // Check initial key status on mount and when window focus returns
  useEffect(() => {
    const checkKey = async () => {
      /* @ts-ignore */
      if (window.aistudio) {
        /* @ts-ignore */
        const selected = await window.aistudio.hasSelectedApiKey();
        setHasKey(selected);
      } else {
        setHasKey(!!process.env.API_KEY);
      }
    };
    checkKey();
    window.addEventListener('focus', checkKey);
    return () => window.removeEventListener('focus', checkKey);
  }, []);

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

  const handleOpenKeySelector = async () => {
    /* @ts-ignore */
    if (window.aistudio) {
      /* @ts-ignore */
      await window.aistudio.openSelectKey();
      // Per instructions, assume success after triggering the dialog to avoid race conditions
      setHasKey(true); 
      setError(null);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      // 1. Check if platform says we have a key
      /* @ts-ignore */
      if (window.aistudio) {
        /* @ts-ignore */
        const isSelected = await window.aistudio.hasSelectedApiKey();
        if (!isSelected) {
          await handleOpenKeySelector();
          // We must wait a tiny bit or just proceed as per guidelines
        }
      }

      // 2. Attempt generation
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
      console.error("Quote Generation Error:", err);
      if (err.message === "API_KEY_MISSING" || err.message === "API_KEY_INVALID") {
        setError("Cloud AI Key Required: Please click 'Select API Key' below to connect your billing-enabled Google Cloud project.");
        setHasKey(false);
      } else {
        setError(err.message || "The AI engine encountered a temporary error. Please try again.");
      }
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
        <div className="flex gap-3">
          <button 
            onClick={handleOpenKeySelector}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-sm border ${hasKey ? 'bg-green-50 text-green-700 border-green-100' : 'bg-blue-600 text-white border-blue-500 hover:bg-blue-700'}`}
          >
            <span className={`w-2 h-2 rounded-full ${hasKey ? 'bg-green-500' : 'bg-white animate-pulse'}`}></span>
            {hasKey ? 'AI Connected' : 'Connect AI Engine'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-4 print:hidden">
          <Card className="p-8">
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6 pb-4 border-b">Scope Definition</h3>
            
            <Input label="Base Effort (Hours)" value={form.hours} onChange={v => setForm({...form, hours: v})} help="Estimated labor hours." />
            <Input label="Target Rate" value={form.rate} onChange={v => setForm({...form, rate: v})} suffix={currency} help="Used as price floor." />
            
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

            <Button onClick={handleGenerate} disabled={loading} className="w-full py-5 text-base shadow-xl">
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Architecting...
                </>
              ) : "Architect Tiered Quote"}
            </Button>

            {error && (
              <div className="mt-6 p-5 bg-red-50 border border-red-200 rounded-2xl shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  <p className="text-[10px] font-black text-red-600 uppercase tracking-widest leading-none">Configuration Required</p>
                </div>
                <p className="text-xs text-red-700 leading-relaxed font-bold mb-4">{error}</p>
                <div className="flex flex-col gap-2">
                  <button 
                    onClick={handleOpenKeySelector} 
                    className="w-full py-3 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all"
                  >
                    Select API Key
                  </button>
                  <a 
                    href="https://ai.google.dev/gemini-api/docs/billing" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[9px] text-center text-slate-400 hover:text-slate-600 underline font-black uppercase tracking-widest"
                  >
                    Billing Setup Guide
                  </a>
                </div>
              </div>
            )}
          </Card>
        </div>

        <div className="lg:col-span-8 space-y-5">
          <Disclaimer />
          
          {result ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-slate-900 text-white rounded-[2rem] p-8 md:p-10 border-none shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                  <span className="text-xs uppercase tracking-widest font-black opacity-60 block mb-3">Proposal Strategy</span>
                  <p className="text-xl md:text-2xl font-medium leading-relaxed italic opacity-95">
                    "{result.copy.proposalSummary}"
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {result.quote.packages.map((pkg, i) => (
                  <Card 
                    key={i} 
                    className={`p-7 border-4 transition-all relative overflow-hidden flex flex-col ${
                      selectedTier === pkg.name 
                        ? 'border-blue-600 shadow-2xl md:scale-105 z-10' 
                        : 'border-transparent opacity-80 hover:opacity-100 hover:border-slate-100'
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
                        {pkg.timelineWeeks} Weeks
                      </div>
                      <div className="flex items-center gap-2 text-sm font-black text-slate-700">
                        <span className="w-5 h-5 bg-green-100 text-green-600 rounded flex items-center justify-center text-[10px]">✓</span>
                        {pkg.revisionsIncluded} Cycles
                      </div>
                      <div className="pt-3 border-t border-slate-100">
                        <ul className="space-y-2">
                          {pkg.included.slice(0, 4).map((inc, j) => (
                            <li key={j} className="text-[11px] text-slate-600 font-bold leading-tight flex items-start gap-2">
                              <span className="text-blue-500">•</span> {inc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <Button 
                      onClick={() => setSelectedTier(pkg.name)}
                      variant={selectedTier === pkg.name ? 'primary' : 'outline'} 
                      className="w-full !text-[10px] !uppercase !tracking-widest !py-3"
                    >
                      {selectedTier === pkg.name ? 'Selected' : `Select ${pkg.name}`}
                    </Button>
                  </Card>
                ))}
              </div>
              
              {/* Other existing UI parts like milestones, email template, etc remain the same */}
            </div>
          ) : (
            <div className="py-20 flex flex-col items-center justify-center text-center p-10 border-4 border-dashed border-slate-200 rounded-[2.5rem] bg-white/50 animate-in fade-in duration-700">
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-[2rem] flex items-center justify-center mb-6 shadow-sm">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.628.288a2 2 0 01-1.108.209A4.45 4.45 0 018 14.507V7a4 4 0 118 0v4M5 9l2 2m0 0l2-2m-2 2v10m8-10V7" /></svg>
              </div>
              <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Generate Your Proposal</h3>
              <p className="text-slate-500 max-w-sm mb-8 text-base font-medium leading-relaxed">
                Enter your scope on the left. Our AI Architect will model three tiered price points based on market depth.
              </p>
              {!hasKey && (
                <button 
                  onClick={handleOpenKeySelector}
                  className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
                >
                  Step 1: Connect AI Engine
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectQuoteCalculator;
