
import React from 'react';

export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden ${className}`}>
    {children}
  </div>
);

export const Input: React.FC<{
  label: string;
  type?: string;
  value: any;
  onChange: (val: any) => void;
  suffix?: string;
  help?: string;
}> = ({ label, type = "number", value, onChange, suffix, help }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(type === "number" ? parseFloat(e.target.value) || 0 : e.target.value)}
        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
      />
      {suffix && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">
          {suffix}
        </span>
      )}
    </div>
    {help && <p className="mt-1 text-xs text-slate-500">{help}</p>}
  </div>
);

export const Button: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  className?: string;
}> = ({ children, onClick, variant = 'primary', disabled, className = "" }) => {
  const base = "px-4 py-2 rounded-lg font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 active:scale-95",
    secondary: "bg-slate-800 text-white hover:bg-slate-900 active:scale-95",
    outline: "border border-slate-300 text-slate-700 hover:bg-slate-50 active:scale-95",
  };
  return (
    <button disabled={disabled} onClick={onClick} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export const Disclaimer: React.FC = () => (
  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg mb-6 flex gap-3 items-start">
    <svg className="w-5 h-5 text-amber-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    <p className="text-xs text-amber-800 leading-relaxed">
      <strong>Disclaimer:</strong> This tool provides estimates for planning purposes only. It does not constitute financial, legal, or tax advice. Always consult with a qualified professional.
    </p>
  </div>
);
