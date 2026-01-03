
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
  related: RelatedLink[];
  schemaHints: string[];
  lastUpdated: string;
};

export const PAGES: Record<string, PageSEO> = {
  "/": {
    path: "/",
    title: "Freelance Calculator: The Financial Suite for the Independent Economy",
    description: "Stop guessing your worth. Use data-driven business modeling to calculate hourly rates, Day rates, AI project quotes, and tax reserves for 2025.",
    h1: "The Definitve Freelance Financial Suite",
    intro: [
      "The freelance economy is shifting. In 2025, simply matching a corporate salary is no longer enough to build a sustainable career. You are a business, and businesses require margins, buffers, and reinvestment strategies.",
      "FreelanceCalc is a production-quality financial engineering tool built by independent professionals. We've moved beyond simple multiplication to provide a holistic view of your business health, from utilization audits to value-based project pricing."
    ],
    sections: [
      {
        h2: "The True Cost of Being Independent",
        body: [
          "Most freelancers undercharge by 30-40% because they fail to account for 'Hidden Leakage'—the time spent on non-billable admin, marketing, and professional development.",
          "Our suite of tools is designed to expose these leaks. Whether you're a high-end consultant or a specialized creative, our logic helps you find the 'Golden Rate': a price point that covers your lifestyle, your growth, and your inevitable downtime."
        ]
      },
      {
        h2: "Data-Driven Pricing Tools for 2025",
        body: ["Access our specialized calculators to de-risk your business strategy:"],
        bullets: [
          "Hourly Rate Modeler: Factoring in utilization and tax reserves.",
          "Overhead Auditor: Tracking the 'SaaS Tax' and equipment cycles.",
          "AI Project Architect: Building tiered packages that anchor your value.",
          "Platform Net Estimator: Calculating real take-home after Upwork/Fiverr commissions.",
          "Retainer Designer: Transitioning from project-based feast to recurring famine."
        ]
      }
    ],
    faqs: [
      { q: "Why should I use a freelance-specific calculator?", a: "Standard calculators ignore 'utilization'—the fact that you only bill for roughly 60% of your time. Our model accounts for the missing 40%." },
      { q: "Is my financial data secure?", a: "Completely. We use client-side processing. Your inputs never leave your browser unless you explicitly use our AI features for project quotes." },
      { q: "What is the 2025 Tax Model?", a: "It suggests a 25-30% reserve for federal, state, and self-employment taxes, plus a 5% health/emergency buffer." }
    ],
    related: [...TOOL_LINKS, ...GUIDE_LINKS.slice(0, 3)],
    schemaHints: ["WebSite", "FinancialService", "FAQPage"],
    lastUpdated: "2025-01-05"
  },
  "/hourly-rate-calculator/": {
    path: "/hourly-rate-calculator/",
    title: "Freelance Hourly Rate Calculator | Professional 2025 Model",
    description: "Calculate your ideal freelance hourly rate using the Utilization Model. Factor in taxes, business overhead, and desired profit margins.",
    h1: "Hourly Rate Calculator: Find Your True Worth",
    intro: [
      "The traditional advice of 'doubling your employee hourly rate' is outdated and dangerous. It fails to account for the volatility of independent work.",
      "Our 2025 model uses the 'Working Backwards' method: starting with your desired net income and layering on the realities of being a business owner."
    ],
    sections: [
      {
        h2: "Understanding Billable Utilization",
        body: [
          "Even if you 'work' 40 hours a week, you aren't 'billing' 40 hours. You have client meetings, prospecting, learning, and billing admin. A sustainable utilization rate is usually between 55% and 65%.",
          "If you price based on a 40-hour billable week but only work 25 billable hours, you are effectively operating at a 40% loss before you even pay for software."
        ]
      },
      {
        h2: "The Buffer Logic",
        body: [
          "We include a 'Profit Margin' buffer. This isn't your salary; it's the business's capital. This funds your next laptop, your health insurance premiums, and your retirement contributions."
        ]
      }
    ],
    faqs: [
      { q: "What is a good starting profit margin?", a: "For specialized freelancers, 15-20% is ideal. For those in high-competition roles, 10% is a safe baseline." }
    ],
    related: [{ href: "/overhead-expense-calculator/", label: "Overhead Auditor" }, { href: "/guides/how-to-set-freelance-rates/", label: "Expert Pricing Guide" }],
    schemaHints: ["SoftwareApplication", "FAQPage"],
    lastUpdated: "2025-01-05"
  },
  "/project-quote-calculator/": {
    path: "/project-quote-calculator/",
    title: "AI Project Pricing Tool | Tiered Quote Architect",
    description: "Build professional tiered project quotes (Basic, Standard, Premium) using AI-driven scope analysis and value-anchoring techniques.",
    h1: "AI Project Quote Architect",
    intro: [
      "Stop trading hours for dollars. When you bill hourly, you are punished for being efficient. When you bill per project, you are rewarded for your expertise.",
      "Our AI Architect uses the 'Decoy Pricing' model to help you present your work in a way that anchors value and increases your average contract size."
    ],
    sections: [
      {
        h2: "The Psychology of Tiers",
        body: [
          "By presenting three options, you change the client's question from 'Should I hire this person?' to 'Which of these three versions do I want?'",
          "The 'Standard' tier should be your target. The 'Basic' is your safety net. The 'Premium' is your upside—often including strategy or support that adds massive value with minimal extra effort."
        ]
      }
    ],
    faqs: [
      { q: "How does the AI determine scope?", a: "It analyzes industry-standard deliverables for your specific role and project type, then splits them into logical complexity tiers." }
    ],
    related: [{ href: "/retainer-calculator/", label: "Retainer Calculator" }, { href: "/hourly-rate-calculator/", label: "Hourly Rate Modeler" }],
    schemaHints: ["SoftwareApplication", "FAQPage"],
    lastUpdated: "2025-01-05"
  },
  "/overhead-expense-calculator/": {
    path: "/overhead-expense-calculator/",
    title: "Freelance Overhead Auditor | Track Your Burn Rate",
    description: "Identify hidden business costs. Calculate your hourly overhead tax and optimize your freelance software and hardware spend.",
    h1: "Freelance Overhead Auditor",
    intro: [
      "Profit isn't what you earn; it's what you keep. Many freelancers fail to realize they are paying a 'hidden tax' on every hour they work just to cover their subscriptions and gear.",
      "This tool breaks down your annual operating expenses into a clear hourly overhead cost, allowing you to price accurately and identify waste."
    ],
    sections: [
      {
        h2: "The SaaS Subscription Trap",
        body: [
          "In the modern economy, software costs are a significant drain on freelance margins. From CRM systems to design suites, the 'death by a thousand $19/mo subs' is real.",
          "Our auditor helps you see the cumulative impact of these costs over a 1000-hour billable year."
        ]
      }
    ],
    faqs: [
      { q: "What should my overhead goal be?", a: "Ideally, business overhead should not exceed 10-15% of your total revenue." }
    ],
    related: [{ href: "/tax-take-home-estimator/", label: "Tax Estimator" }, { href: "/platform-fee-calculator/", label: "Platform Fee Tool" }],
    schemaHints: ["SoftwareApplication", "FAQPage"],
    lastUpdated: "2025-01-05"
  },
  "/retainer-calculator/": {
    path: "/retainer-calculator/",
    title: "Freelance Retainer Calculator | Stable Income Strategy",
    description: "Calculate professional retainer fees. Transition to monthly recurring revenue (MRR) with clear SLAs and priority availability modeling.",
    h1: "The Retainer Designer",
    intro: [
      "The 'Feast and Famine' cycle is the biggest threat to freelance longevity. Retainers solve this by trading a small discount for guaranteed availability and revenue.",
      "A professional retainer is not 'bulk buying hours'—it is an 'Availability Insurance Policy' for your client."
    ],
    sections: [
      {
        h2: "Service Level Agreements (SLAs)",
        body: [
          "When you sell a retainer, you aren't just selling 10 hours; you're selling a 24-48 hour response time. This priority is where your real value lies.",
          "We recommend a tiered discount: 5% for 10 hours, 10% for 20 hours, etc., but always with a 'no rollover' policy to maintain your calendar health."
        ]
      }
    ],
    faqs: [
      { q: "Do hours roll over in a retainer?", a: "Professionally, no. Rollover hours create 'debt' in your future calendar that can prevent you from taking on new high-value projects." }
    ],
    related: [...TOOL_LINKS.slice(0, 2)],
    schemaHints: ["SoftwareApplication", "FAQPage"],
    lastUpdated: "2025-01-05"
  }
};
