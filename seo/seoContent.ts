
import { TOOL_LINKS, GUIDE_LINKS, TRUST_LINKS } from "./internalLinks";

export type FAQ = { q: string; a: string };
export type RelatedLink = { href: string; label: string };

export type PageSEO = {
  path: string;
  title: string;
  description: string;
  h1: string;
  intro: string[];
  sections: Array<{ h2: string; body: string[]; bullets?: string[] }>;
  faqs: FAQ[];
  related: readonly RelatedLink[];
  schemaHints: string[];
  lastUpdated: string;
};

export const PAGES: Record<string, PageSEO> = {
  "/": {
    path: "/",
    title: "Freelance Calculator: The Financial Suite for the 2026 Economy",
    description: "Calculate your true value in 2026. Data-driven business modeling for hourly rates, Day rates, and tax reserves.",
    h1: "The Definitive Freelance Financial Suite",
    intro: [
      "The freelance economy is undergoing a massive shift. In 2026, simply matching a corporate salary is no longer enough to build a sustainable career. You are a business, and businesses require margins, buffers, and reinvestment strategies.",
      "FreelanceCalc is a production-quality financial engineering tool. We've moved beyond simple multiplication to provide a holistic view of your business health, from utilization audits to tax strategy."
    ],
    sections: [
      {
        h2: "The True Cost of Independence in 2026",
        body: [
          "Most freelancers undercharge by 30-40% because they fail to account for 'Hidden Leakage'—the time spent on non-billable admin, marketing, and professional development.",
          "Our suite of tools is designed to expose these leaks. Whether you're a high-end consultant or a specialized creative, our logic helps you find the 'Golden Rate': a price point that covers your lifestyle, your growth, and your inevitable downtime."
        ]
      }
    ],
    faqs: [
      { q: "Why do I need a 2026-specific calculator?", a: "The 2026 economy reflects higher SaaS overheads and shifting self-employment tax brackets. Standard calculators use outdated 2020 logic that leads to profit leakage." },
      { q: "What is the 'Utilization Gap'?", a: "Standard calculators assume you bill 40 hours a week. In reality, most high-performing freelancers only bill 22-26 hours. Our model accounts for this 40% non-billable gap." },
      { q: "Is my financial data secure?", a: "100%. We use local browser processing. Your inputs never touch a server, ensuring total privacy." },
      { q: "How should I handle 2026 inflation?", a: "We recommend a 5-7% annual 'Cost of Living Adjustment' (COLA) built directly into your profit margin. Our tools help you find the surplus needed to stay ahead of currency devaluation." },
      { q: "What is a 'Safety Buffer' in pricing?", a: "A Safety Buffer is a 15-20% markup applied to fixed-price or day-rate quotes. It covers 'Scope Seep'—the small, unrecorded tasks that eat into your profit margins." },
      { q: "Why is a Day Rate better than Hourly?", a: "Day rates decouple your income from minutes. They discourage client micromanagement and reward your efficiency. If a task takes 4 hours instead of 8, your day rate ensures you capture that expert efficiency as profit." }
    ],
    related: [...TOOL_LINKS, ...GUIDE_LINKS.slice(0, 3)],
    schemaHints: ["WebSite", "FinancialService", "FAQPage"],
    lastUpdated: "2026-01-01"
  },
  "/hourly-rate-calculator": {
    path: "/hourly-rate-calculator",
    title: "Freelance Hourly Rate Calculator | 2026 Utilization Model",
    description: "Calculate the hourly rate you actually need to survive and thrive as a freelancer in 2026. Factors in taxes, expenses, and non-billable time.",
    h1: "Hourly Rate Auditor",
    intro: ["Your hourly rate is the foundation of your business. In 2026, setting a rate isn't just about 'what the market pays'—it's about covering your operational burn and retirement goals."],
    sections: [
      { h2: "The Formula for Success", body: ["We use a reverse-engineered salary model. We start with your desired take-home pay, add business overhead, and divide by realistic billable hours."] }
    ],
    faqs: [],
    related: TOOL_LINKS,
    schemaHints: ["FinancialService"],
    lastUpdated: "2026-01-01"
  },
  "/day-rate-architect": {
    path: "/day-rate-architect",
    title: "Day Rate & Weekly Architect | Freelance Value Pricing",
    description: "Architect your transition from hourly billing to high-value day rates and weekly blocks. Calculate buffers for 2026 market standards.",
    h1: "Day Rate & Weekly Architect",
    intro: ["Stop selling minutes and start selling results. Use this tool to model how day-rates and weekly 'Sprints' can double your effective hourly rate while simplifying client management."],
    sections: [],
    faqs: [],
    related: TOOL_LINKS,
    schemaHints: ["FinancialService"],
    lastUpdated: "2026-01-01"
  },
  "/overhead-expense-calculator": {
    path: "/overhead-expense-calculator",
    title: "Freelance Overhead Auditor | Burn Rate Calculator",
    description: "Audit your business expenses and identify SaaS sprawl. Calculate your business cost per billable hour.",
    h1: "Overhead Auditor",
    intro: ["Hidden expenses are the silent killer of freelance profit. Our auditor identifies exactly how much your toolset costs you per hour worked."],
    sections: [],
    faqs: [],
    related: TOOL_LINKS,
    schemaHints: ["FinancialService"],
    lastUpdated: "2026-01-01"
  },
  "/platform-fee-calculator": {
    path: "/platform-fee-calculator",
    title: "Platform Fee Calculator | Upwork & Fiverr Margin Control",
    description: "Calculate net pay after platform commissions. Reverse-calculate your quote to ensure you take home your desired rate.",
    h1: "Platform Fee Auditor",
    intro: ["Platform commissions can eat 10-20% of your revenue instantly. This tool helps you quote higher to protect your bottom line."],
    sections: [],
    faqs: [],
    related: TOOL_LINKS,
    schemaHints: ["FinancialService"],
    lastUpdated: "2026-01-01"
  },
  "/tax-take-home-estimator": {
    path: "/tax-take-home-estimator",
    title: "Freelance Tax & Take-Home Estimator",
    description: "Estimate your real take-home pay after tax reserves and wealth savings. Plan your 2026 financial freedom.",
    h1: "Net Worth Architect",
    intro: ["Revenue is a vanity metric; take-home pay is sanity. Architect your savings and tax reserves with precision."],
    sections: [],
    faqs: [],
    related: TOOL_LINKS,
    schemaHints: ["FinancialService"],
    lastUpdated: "2026-01-01"
  },
  "/guides/fixed-price-vs-hourly": {
    path: "/guides/fixed-price-vs-hourly",
    title: "Fixed Price vs Hourly Billing | 2026 Strategic Guide",
    description: "Compare fixed-price quotes with hourly billing. Learn why value-based pricing is the key to scaling your freelance profit in 2026.",
    h1: "Fixed Price vs Hourly: Choosing Your Profit Model",
    intro: ["Stop trading your life for an hourly rate. Learn how to architect fixed quotes that protect your time and reward your expertise."],
    sections: [],
    faqs: [],
    related: TOOL_LINKS,
    schemaHints: ["Article"],
    lastUpdated: "2026-01-01"
  },
  "/guides/pricing-packages": {
    path: "/guides/pricing-packages",
    title: "How to Build Tiered Pricing Packages for Freelancers",
    description: "Master the art of tiered pricing. Learn the 'Rule of Three' and how to build high-conversion project packages in 2026.",
    h1: "High-Conversion Pricing Packages",
    intro: ["Transform your service into a product. Use psychology-backed tiered pricing to close bigger deals with less resistance."],
    sections: [],
    faqs: [],
    related: TOOL_LINKS,
    schemaHints: ["Article"],
    lastUpdated: "2026-01-01"
  },
  "/guides/retainers-for-freelancers": {
    path: "/guides/retainers-for-freelancers",
    title: "Freelance Retainer Guide: Building Recurring Revenue",
    description: "Learn how to pitch and structure monthly retainers. Kill the freelance rollercoaster with predictable recurring revenue in 2026.",
    h1: "Retainers: The Path to Stable Revenue",
    intro: ["The ultimate guide to recurring revenue. Learn how to sell availability and priority to your best clients."],
    sections: [],
    faqs: [],
    related: TOOL_LINKS,
    schemaHints: ["Article"],
    lastUpdated: "2026-01-01"
  }
};
