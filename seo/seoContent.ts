
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
      { q: "Is my financial data secure?", a: "100%. We use local browser processing. Your inputs never touch a server, ensuring total privacy." }
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
    description: "Architect your transition from hourly billing to high-value day rates and weekly blocks.",
    h1: "Day Rate & Weekly Architect",
    intro: ["Stop selling minutes and start selling results. Use this tool to model how day-rates and weekly 'Sprints' can double your effective hourly rate."],
    sections: [],
    faqs: [],
    related: TOOL_LINKS,
    schemaHints: ["FinancialService"],
    lastUpdated: "2026-01-01"
  },
  "/retainer-calculator": {
    path: "/retainer-calculator",
    title: "Freelance Retainer Calculator | Recurring Revenue Planner",
    description: "Calculate recurring revenue packages and monthly service fees to stabilize your freelance income.",
    h1: "Retainer Architect",
    intro: ["Kill the freelance rollercoaster. Transition your clients to monthly recurring revenue (MRR) with predictable service level agreements."],
    sections: [],
    faqs: [],
    related: TOOL_LINKS,
    schemaHints: ["FinancialService"],
    lastUpdated: "2026-01-01"
  },
  "/overhead-expense-calculator": {
    path: "/overhead-expense-calculator",
    title: "Freelance Overhead Auditor | Burn Rate Calculator",
    description: "Audit your business expenses and identify SaaS sprawl.",
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
    description: "Calculate net pay after platform commissions.",
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
    description: "Estimate your real take-home pay after tax reserves and wealth savings.",
    h1: "Net Worth Architect",
    intro: ["Revenue is a vanity metric; take-home pay is sanity. Architect your savings and tax reserves with precision."],
    sections: [],
    faqs: [],
    related: TOOL_LINKS,
    schemaHints: ["FinancialService"],
    lastUpdated: "2026-01-01"
  },
  "/about": {
    path: "/about",
    title: "About FreelanceCalc | Our Mission and Methodology",
    description: "Learn about the philosophy behind our financial tools and our commitment to freelancer success.",
    h1: "About the Project",
    intro: ["We build tools for the independent economy."],
    sections: [], faqs: [], related: TRUST_LINKS, schemaHints: ["AboutPage"], lastUpdated: "2026-01-01"
  },
  "/contact": {
    path: "/contact",
    title: "Contact Us | FreelanceCalc Support",
    description: "Get in touch with our team for support or feedback.",
    h1: "Connect With Us",
    intro: ["We're here to help you scale."],
    sections: [], faqs: [], related: TRUST_LINKS, schemaHints: ["ContactPage"], lastUpdated: "2026-01-01"
  },
  "/privacy": {
    path: "/privacy",
    title: "Privacy Policy | Your Data Security",
    description: "How we handle your privacy and ensure your financial data remains local.",
    h1: "Privacy Policy",
    intro: ["Your data never leaves your browser."],
    sections: [], faqs: [], related: TRUST_LINKS, schemaHints: ["WebPage"], lastUpdated: "2026-01-01"
  },
  "/terms": {
    path: "/terms",
    title: "Terms of Use | FreelanceCalc",
    description: "The rules for using our pricing tools and knowledge base.",
    h1: "Terms of Service",
    intro: ["Using our suite effectively and legally."],
    sections: [], faqs: [], related: TRUST_LINKS, schemaHints: ["WebPage"], lastUpdated: "2026-01-01"
  },
  "/cookie-policy": {
    path: "/cookie-policy",
    title: "Cookie Policy | Transparency",
    description: "How we use cookies to save your preferences locally.",
    h1: "Cookie Policy",
    intro: ["We use cookies for personalization."],
    sections: [], faqs: [], related: TRUST_LINKS, schemaHints: ["WebPage"], lastUpdated: "2026-01-01"
  },
  "/disclaimer": {
    path: "/disclaimer",
    title: "Legal Disclaimer | Financial Accuracy",
    description: "Our legal notice regarding financial estimations and professional advice.",
    h1: "Disclaimer",
    intro: ["Always consult a certified professional."],
    sections: [], faqs: [], related: TRUST_LINKS, schemaHints: ["WebPage"], lastUpdated: "2026-01-01"
  },
  "/editorial-policy": {
    path: "/editorial-policy",
    title: "Editorial Policy | Content Standards",
    description: "How we verify the accuracy of our financial models and guides.",
    h1: "Editorial Policy",
    intro: ["High standards for high-stakes finance."],
    sections: [], faqs: [], related: TRUST_LINKS, schemaHints: ["WebPage"], lastUpdated: "2026-01-01"
  },
  "/sitemap": {
    path: "/sitemap",
    title: "Sitemap | Platform Directory",
    description: "A complete visual map of the FreelanceCalc ecosystem.",
    h1: "Platform Directory",
    intro: ["Navigate all tools and guides easily."],
    sections: [], faqs: [], related: [...TOOL_LINKS, ...GUIDE_LINKS], schemaHints: ["WebPage"], lastUpdated: "2026-01-01"
  }
};
