
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
    title: "Freelance Calculator: The Financial Suite for the 2026 Economy",
    description: "Calculate your true value in 2026. Data-driven business modeling for hourly rates, Day rates, AI project quotes, and tax reserves.",
    h1: "The Definitive Freelance Financial Suite",
    intro: [
      "The freelance economy is undergoing a massive shift. In 2026, simply matching a corporate salary is no longer enough to build a sustainable career. You are a business, and businesses require margins, buffers, and reinvestment strategies.",
      "FreelanceCalc is a production-quality financial engineering tool. We've moved beyond simple multiplication to provide a holistic view of your business health, from utilization audits to value-based project pricing."
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
      { q: "Is my financial data secure?", a: "100%. We use local browser processing. Your inputs never touch a server unless you explicitly use our AI features for custom project quotes." },
      { q: "How should I handle 2026 inflation?", a: "We recommend a 5-8% annual 'Efficiency Adjustment' to your rates to maintain purchasing power as your expertise grows and tools become more expensive." },
      { q: "What is the 2026 Tax Reserve Model?", a: "For 2026, we suggest a 28-32% reserve for federal and state taxes, plus a mandatory 4% 'Equipment Lifecycle' fund." },
      { q: "Can I use this for global currencies?", a: "Yes. We support USD, GBP, EUR, and PKR with localized formatting, though tax logic defaults to standard professional benchmarks." },
      { q: "Why move from hourly to project pricing?", a: "Hourly pricing punishes you for being fast. Project-based pricing rewards your expertise. Our AI tool helps you make that transition safely." },
      { q: "How often should I audit my rates?", a: "We recommend a quarterly audit. As your 'Overhead Auditor' results change, your hourly base must adjust to maintain your target net income." }
    ],
    related: [...TOOL_LINKS, ...GUIDE_LINKS.slice(0, 3)],
    schemaHints: ["WebSite", "FinancialService", "FAQPage"],
    lastUpdated: "2026-01-01"
  },
  "/hourly-rate-calculator/": {
    path: "/hourly-rate-calculator/",
    title: "Freelance Hourly Rate Calculator | Professional 2026 Model",
    description: "Calculate your ideal freelance hourly rate using the 2026 Utilization Model. Factor in taxes, business overhead, and desired profit margins.",
    h1: "Hourly Rate Calculator: Find Your True Worth",
    intro: [
      "Our 2026 model uses the 'Working Backwards' method: starting with your desired net income and layering on the realities of being a business owner."
    ],
    sections: [
      {
        h2: "Understanding Billable Utilization",
        body: [
          "Even if you 'work' 40 hours a week, you aren't 'billing' 40 hours. You have client meetings, prospecting, learning, and billing admin. A sustainable utilization rate is usually between 55% and 65%."
        ]
      }
    ],
    faqs: [
      { q: "What is a good starting profit margin?", a: "For specialized freelancers, 15-20% is ideal. For those in high-competition roles, 10% is a safe baseline." }
    ],
    related: [{ href: "/overhead-expense-calculator/", label: "Overhead Auditor" }, { href: "/guides/how-to-set-freelance-rates/", label: "Expert Pricing Guide" }],
    schemaHints: ["SoftwareApplication", "FAQPage"],
    lastUpdated: "2026-01-01"
  }
};
