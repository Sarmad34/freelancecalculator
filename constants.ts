
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

export const FREELANCE_ROLES = [
  "Web Designer", "UI/UX Designer", "Frontend Developer", "Backend Developer", "Fullstack Developer",
  "Shopify Developer", "WordPress Developer", "Mobile App Developer", "Data Analyst", "Data Scientist",
  "SEO Specialist", "Content Writer", "Copywriter", "Video Editor", "Motion Designer",
  "Graphic Designer", "Social Media Manager", "Virtual Assistant", "Project Manager", "Sales Closer",
  "Bookkeeper", "Digital Marketer", "E-commerce Manager", "App Script Developer", "Cloud Engineer",
  "QA Tester", "Technical Writer", "Email Marketer", "Brand Strategist", "Illustrator"
];

export const PROJECT_TYPES = [
  "Landing Page", "E-commerce Site", "Marketing Strategy", "SEO Audit", "Mobile App Prototype",
  "Content Package", "Branding Identity", "Social Media Campaign", "Data Dashboard", "Technical Documentation",
  "System Architecture", "API Integration", "Explainer Video", "Email Template Set", "Logo Design"
];

export const ROLE_DATA: Record<string, { income: number; expenses: number; util: number; tips: string[] }> = {
  "Web Designer": { 
    income: 80000, expenses: 5000, util: 65, 
    tips: ["Charge extra for high-conversion landing pages", "Include a support retainer in your quotes", "Focus on ROI, not just aesthetics"] 
  },
  "UI/UX Designer": { 
    income: 95000, expenses: 6000, util: 70, 
    tips: ["Sell your discovery process as a separate phase", "User testing should be a paid add-on", "Maintain a UI kit to speed up billable work"] 
  },
  "Shopify Developer": { 
    income: 110000, expenses: 8000, util: 60, 
    tips: ["Upsell app configuration and migrations", "E-commerce clients value speed above all", "Charge for your expert theme knowledge"] 
  },
  "Copywriter": { 
    income: 70000, expenses: 3000, util: 55, 
    tips: ["Transition to per-project value pricing", "Charge by the result, not the word", "Specialize in high-ticket sales letters"] 
  },
  "Virtual Assistant": { 
    income: 45000, expenses: 2000, util: 80, 
    tips: ["Bundle services into monthly packages", "Automate common client tasks to save time", "Use a retainer model for steady income"] 
  },
  "default": { 
    income: 75000, expenses: 5000, util: 60, 
    tips: ["Track every billable minute", "Review your rates every 6 months", "Always save 25% for tax reserves"] 
  }
};
