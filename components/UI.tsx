
import React, { useState } from 'react';

export const Card: React.FC<{ children: React.ReactNode; className?: string; variant?: 'glass' | 'flat' | 'outline' }> = ({ children, className = "", variant = 'flat' }) => {
  const baseClasses = "rounded-3xl border shadow-sm overflow-hidden";
  const variantClasses = {
    flat: "bg-white border-slate-200",
    glass: "glass-card",
    outline: "bg-transparent border-slate-200 border-dashed"
  };

  let activeVariantClasses = variantClasses[variant];
  if (className.includes('bg-')) {
    activeVariantClasses = activeVariantClasses.replace('bg-white', '');
  }

  return (
    <div className={`${baseClasses} ${activeVariantClasses} ${className}`}>
      {children}
    </div>
  );
};

export const FAQSection: React.FC<{ faqs: Array<{q: string, a: string}>, className?: string }> = ({ faqs, className = "" }) => {
  if (!faqs || faqs.length === 0) return null;
  return (
    <div className={`mt-20 border-t border-slate-200 pt-20 ${className}`}>
      <h3 className="text-3xl font-black text-slate-900 mb-10 tracking-tight text-center md:text-left">Frequently Asked Questions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        {faqs.map((faq, i) => (
          <div key={i} className="group">
            <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-start gap-3">
              <span className="text-blue-600 font-black text-xl leading-none">Q.</span>
              {faq.q}
            </h4>
            <div className="flex items-start gap-3">
              <span className="text-transparent font-black text-xl leading-none select-none">Q.</span>
              <p className="text-slate-600 text-sm leading-relaxed font-medium">{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const CopyButton: React.FC<{ text: string; label?: string }> = ({ text, label = "Copy Results" }) => {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        setCopied(true);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
          setCopied(true);
        } catch (err) {
          setError(true);
        }
        document.body.removeChild(textArea);
      }
      setTimeout(() => {
        setCopied(false);
        setError(false);
      }, 2000);
    } catch (err) {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <button 
      onClick={handleCopy}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
        copied ? 'bg-green-500 text-white' : 
        error ? 'bg-red-500 text-white' : 
        'bg-slate-100 text-slate-600 hover:bg-slate-200'
      }`}
    >
      {copied ? (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
      ) : error ? (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
      ) : (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3" /></svg>
      )}
      {copied ? "Copied!" : error ? "Failed" : label}
    </button>
  );
};

export const Input: React.FC<{
  label: string;
  type?: string;
  value: any;
  onChange: (val: any) => void;
  suffix?: string;
  help?: string;
}> = ({ label, type = "number", value, onChange, suffix, help }) => (
  <div className="mb-5 last:mb-0">
    <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">{label}</label>
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(type === "number" ? parseFloat(e.target.value) || 0 : e.target.value)}
        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all font-semibold text-slate-900"
      />
      {suffix && (
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs pointer-events-none">
          {suffix}
        </span>
      )}
    </div>
    {help && <p className="mt-2 text-xs font-medium text-slate-400 leading-tight uppercase tracking-wider">{help}</p>}
  </div>
);

export const Button: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  disabled?: boolean;
  className?: string;
}> = ({ children, onClick, variant = 'primary', disabled, className = "" }) => {
  const base = "px-6 py-3 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200 active:scale-95",
    secondary: "bg-slate-900 text-white hover:bg-slate-950 active:scale-95",
    outline: "border-2 border-slate-200 text-slate-600 hover:border-blue-500 hover:text-blue-600 active:scale-95",
    ghost: "text-slate-500 hover:bg-slate-100",
  };
  return (
    <button disabled={disabled} onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export const Disclaimer: React.FC = () => (
  <div className="p-5 bg-amber-50 border border-amber-100 rounded-2xl flex gap-4 items-start print:hidden">
    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
    </div>
    <p className="text-sm text-amber-800 leading-relaxed font-medium">
      <strong>Professional Advice Notice:</strong> These results are data-modeled estimations for the 2026 economic landscape. They do not constitute certified financial, tax, or legal counsel. Verify all final business filings with a local qualified CPA.
    </p>
  </div>
);
