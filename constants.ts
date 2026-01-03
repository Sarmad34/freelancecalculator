
import { Currency } from './types';

export const CURRENCIES: { label: string; value: Currency; symbol: string }[] = [
  { label: 'USD ($)', value: 'USD', symbol: '$' },
  { label: 'EUR (€)', value: 'EUR', symbol: '€' },
  { label: 'GBP (£)', value: 'GBP', symbol: '£' },
  { label: 'INR (₹)', value: 'INR', symbol: '₹' },
  { label: 'AUD (A$)', value: 'AUD', symbol: 'A$' },
  { label: 'CAD (C$)', value: 'CAD', symbol: 'C$' },
  { label: 'JPY (¥)', value: 'JPY', symbol: '¥' },
  { label: 'AED (د.إ)', value: 'AED', symbol: 'AED' },
  { label: 'PKR (₨)', value: 'PKR', symbol: '₨' },
];

export const COUNTRIES = [
  { code: 'US', name: 'United States', taxRate: 28, colIndex: 1.0, currency: 'USD' },
  { code: 'GB', name: 'United Kingdom', taxRate: 22, colIndex: 0.9, currency: 'GBP' },
  { code: 'DE', name: 'Germany', taxRate: 38, colIndex: 0.85, currency: 'EUR' },
  { code: 'PK', name: 'Pakistan', taxRate: 15, colIndex: 0.22, currency: 'PKR' },
  { code: 'IN', name: 'India', taxRate: 25, colIndex: 0.28, currency: 'INR' },
  { code: 'AU', name: 'Australia', taxRate: 32, colIndex: 0.95, currency: 'AUD' },
  { code: 'CA', name: 'Canada', taxRate: 26, colIndex: 0.88, currency: 'CAD' },
  { code: 'AE', name: 'United Arab Emirates', taxRate: 0, colIndex: 0.82, currency: 'AED' },
  { code: 'FR', name: 'France', taxRate: 35, colIndex: 0.85, currency: 'EUR' },
  { code: 'SG', name: 'Singapore', taxRate: 17, colIndex: 0.95, currency: 'SGD' },
  { code: 'BR', name: 'Brazil', taxRate: 27, colIndex: 0.42, currency: 'BRL' },
  { code: 'UA', name: 'Ukraine', taxRate: 5, colIndex: 0.35, currency: 'USD' },
] as const;

export const FREELANCE_ROLES = [
  "Software Architect", "AI Engineer", "Web Designer", "UI/UX Designer", "Frontend Developer", 
  "Backend Developer", "Fullstack Developer", "Shopify Expert", "WordPress Specialist", 
  "Mobile App Developer", "Data Analyst", "Machine Learning Engineer", "SEO Specialist", 
  "Content Strategist", "Direct Response Copywriter", "Video Editor", "Motion Designer",
  "Brand Identity Designer", "Social Media Manager", "Virtual Assistant", "Project Manager", 
  "Fractional CMO", "Bookkeeper", "Growth Marketer", "E-commerce Manager", "DevOps Engineer", 
  "QA Automation Tester", "Technical Writer", "Email Marketing Specialist", "Illustrator"
];

export const PROJECT_TYPES = [
  "Full Platform Rebuild",
  "MVP Development (SaaS)",
  "E-commerce Migration",
  "iOS/Android Application",
  "Brand Identity System",
  "Technical SEO Audit",
  "Content Engine Setup",
  "AI Integration Sprint",
  "UI/UX Research Project",
  "Security & Cloud Audit"
];

export const ROLE_DATA: Record<string, { income: number; expenses: number; util: number; tips: string[] }> = {
  "Software Architect": { 
    income: 155000, expenses: 8500, util: 75, 
    tips: ["Charge for system design as a flat fee", "Architecture audits should be $2.5k+ per day", "Emphasize long-term scalability"] 
  },
  "AI Engineer": { 
    income: 175000, expenses: 14000, util: 70, 
    tips: ["Sell specialized model fine-tuning", "Token cost management is a high-value upsell", "Charge a 'Compute Fee' if using your own GPUs"] 
  },
  "Web Designer": { 
    income: 90000, expenses: 5000, util: 65, 
    tips: ["Focus on high-conversion landing pages", "Support retainers are your bread and butter", "Productize your discovery phase"] 
  },
  "UI/UX Designer": { 
    income: 110000, expenses: 6000, util: 70, 
    tips: ["Discovery workshops are paid events", "Prototype testing is a separate billable line", "Sell design systems, not just screens"] 
  },
  "Shopify Expert": { 
    income: 120000, expenses: 9000, util: 65, 
    tips: ["Migrations are high-risk/high-reward", "Upsell speed optimization audits", "Charge based on the revenue lift you provide"] 
  },
  "Direct Response Copywriter": { 
    income: 105000, expenses: 3000, util: 55, 
    tips: ["Performance bonuses can double your base", "A/B testing is a strategic add-on", "Focus on high-ticket sales pages"] 
  },
  "Virtual Assistant": { 
    income: 52000, expenses: 2000, util: 85, 
    tips: ["Batch client tasks to increase efficiency", "Retainer-only model for sanity", "Sell specialized admin skills like CRM setup"] 
  },
  "default": { 
    income: 85000, expenses: 6000, util: 60, 
    tips: ["Track every billable minute", "Review your rates every 6 months", "Always save for tax before spending"] 
  }
};
