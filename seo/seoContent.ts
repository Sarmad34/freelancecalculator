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
    title: "Freelance Calculator: Rates, Quotes & Retainers (2025)",
    description: "The professional suite for freelancers. Calculate hourly rates, build AI project quotes, and manage retainers with transparent business math.",
    h1: "Freelance Calculator",
    intro: [
      "Running a freelance business is complex. Between income goals, unexpected expenses, and non-billable hours, it's easy to leave money on the table.",
      "FreelanceCalc provides the definitive set of financial tools built specifically for independent professionals. Our calculators are designed using real-world business principles to help you price with confidence."
    ],
    sections: [
      {
        h2: "Why Business Math Matters for Freelancers",
        body: [
          "Most freelancers underprice because they match their hourly rate to their old salary. But as a business owner, you are responsible for your own hardware, software, insurance, and taxes.",
          "Our suite helps you find your 'True Rate' by accounting for your billable utilization—the hours you actually get paid for versus the time spent on marketing and admin."
        ]
      },
      {
        h2: "Core Tools for Every Business Phase",
        body: ["Pick the calculator that matches your current project need:"],
        bullets: [
          "Hourly Rate Calculator: Determine your baseline for survival and growth.",
          "Project Quote Builder: Convert hours into professional tiered packages.",
          "Retainer Designer: Stabilize your monthly income with clear service level agreements.",
          "Fee Estimator: See your real net take-home after platform and payment fees."
        ]
      }
    ],
    faqs: [
      { q: "Is the Freelance Calculator free?", a: "Yes, our core financial tools are 100% free for individual freelancers to use." },
      { q: "Do you store my financial data?", a: "No. Your inputs are processed entirely within your browser to protect your business privacy." },
      { q: "What is utilization rate?", a: "Utilization is the percentage of your working week that can be billed to clients. A healthy freelance target is 60-65%." }
    ],
    related: [...TOOL_LINKS, ...GUIDE_LINKS.slice(0, 3)],
    schemaHints: ["WebSite", "Organization", "FAQPage"],
    lastUpdated: "2025-01-03"
  },
  "/hourly-rate-calculator/": {
    path: "/hourly-rate-calculator/",
    title: "Freelance Hourly Rate Calculator | 2025 Utilization Model",
    description: "Don't guess your price. Use our utilization-based model to calculate your ideal hourly and day rates including expenses and tax reserves.",
    h1: "Hourly Rate Calculator",
    intro: [
      "The most common mistake in freelancing is setting an hourly rate based on a 40-hour billable week. In reality, you likely bill closer to 20-25 hours.",
      "This calculator helps you work backward from your lifestyle goals to find a sustainable rate that covers your downtime, taxes, and business profit."
    ],
    sections: [
      {
        h2: "Understanding the Math",
        body: [
          "We divide your total required annual revenue (Salary + Expenses + Tax) by your total billable hours. This ensures every hour you work for a client is actively funding your business operations.",
          "A 'Recommended Rate' includes a profit margin buffer, allowing you to invest back into your business or save for a rainy day."
        ]
      }
    ],
    faqs: [
      { q: "How much should I save for taxes?", a: "A safe rule of thumb is 25-30% of your gross income, depending on your local jurisdiction." }
    ],
    related: [{ href: "/project-quote-calculator/", label: "Project Quote Calculator" }, { href: "/guides/how-to-set-freelance-rates/", label: "Pricing Guide" }],
    schemaHints: ["SoftwareApplication", "FAQPage"],
    lastUpdated: "2025-01-03"
  },
  "/project-quote-calculator/": {
    path: "/project-quote-calculator/",
    title: "AI Project Quote Calculator | Professional Freelance Quotes",
    description: "Generate tiered project packages (Basic, Standard, Premium) and milestones using AI and proven freelance pricing models.",
    h1: "Project Quote Builder",
    intro: [
      "Fixed pricing is often more profitable than hourly work, but only if you manage scope creep. Our AI-powered builder helps you structure your work into clear packages.",
      "By offering tiers, you shift the conversation from 'cost' to 'value', allowing clients to choose the level of service that fits their budget while protecting your margins."
    ],
    sections: [
      {
        h2: "Why Tiered Pricing Wins",
        body: [
          "Offering a single price often leads to a 'yes/no' decision. Offering three tiers (Basic, Standard, Premium) anchors your value and helps clients self-select into the right scope.",
          "The 'Standard' tier should typically represent your ideal project delivery, while 'Premium' allows for faster timelines or additional strategic support."
        ]
      }
    ],
    faqs: [
      { q: "How are the AI quotes generated?", a: "We use Google Gemini to analyze your role, project type, and complexity to suggest industry-standard scope inclusions." }
    ],
    related: [{ href: "/hourly-rate-calculator/", label: "Hourly Rate Calculator" }, { href: "/retainer-calculator/", label: "Retainer Calculator" }],
    schemaHints: ["SoftwareApplication", "FAQPage"],
    lastUpdated: "2025-01-03"
  },
  "/retainer-calculator/": {
    path: "/retainer-calculator/",
    title: "Freelance Retainer Calculator | Recurring Revenue Planner",
    description: "Stabilize your income with monthly retainers. Calculate suggested fees based on commitment, discounts, and service levels.",
    h1: "Retainer Calculator",
    intro: [
      "Retainers are the holy grail of freelancing. They provide predictable monthly recurring revenue (MRR) and reduce the 'feast or famine' cycle.",
      "A good retainer agreement balances a small discount for guaranteed work with a strict service level agreement (SLA) to prevent unbounded work."
    ],
    sections: [
      {
        h2: "Building a Sustainable Retainer",
        body: [
          "Don't just sell hours; sell availability and priority. Clients pay for the peace of mind knowing that you are available to handle their requests within a specific timeframe.",
          "Ensure your retainer terms clearly state if hours roll over (we recommend they don't) and what the overage rate is."
        ]
      }
    ],
    faqs: [
      { q: "Should I offer a discount for retainers?", a: "Yes, 5-15% is standard because it saves you the time and cost of constantly finding new clients." }
    ],
    related: [{ href: "/hourly-rate-calculator/", label: "Hourly Rate Calculator" }, { href: "/platform-fee-calculator/", label: "Fee Calculator" }],
    schemaHints: ["SoftwareApplication", "FAQPage"],
    lastUpdated: "2025-01-03"
  },
  "/platform-fee-calculator/": {
    path: "/platform-fee-calculator/",
    title: "Platform Fee Calculator | Upwork & Fiverr Net Take-Home",
    description: "Calculate what you actually earn on freelance platforms after commissions. Forward and reverse pricing for Upwork, Fiverr, and more.",
    h1: "Platform Fee Calculator",
    intro: [
      "Platform commissions can eat up to 20% of your revenue. If you don't factor these fees into your initial quote, you're effectively paying to work.",
      "This tool helps you 'price up' so that your net take-home matches your required business profit."
    ],
    sections: [
      {
        h2: "Reverse Pricing Strategy",
        body: [
          "If you want to receive $1,000 in your bank account, you cannot quote $1,000 on a platform that takes a 10% fee. You must quote roughly $1,111.",
          "Always use the 'Price to Receive X Net' mode when bidding on jobs to ensure your business stays profitable."
        ]
      }
    ],
    faqs: [
      { q: "What is Upwork's current fee?", a: "As of 2024, Upwork has a flat 10% freelancer service fee on all new contracts." }
    ],
    related: [{ href: "/tax-take-home-estimator/", label: "Tax Estimator" }, { href: "/hourly-rate-calculator/", label: "Hourly Rate Calculator" }],
    schemaHints: ["SoftwareApplication", "FAQPage"],
    lastUpdated: "2025-01-03"
  },
  "/tax-take-home-estimator/": {
    path: "/tax-take-home-estimator/",
    title: "Freelance Tax & Take-Home Estimator | Financial Planning",
    description: "See your real take-home pay after taxes and savings. Simple planning tool for independent contractors and self-employed professionals.",
    h1: "Tax & Take-Home Estimator",
    intro: [
      "Gross revenue is a vanity metric; net take-home is sanity. This tool helps you visualize the flow of money from your business to your personal bank account.",
      "Setting aside a fixed percentage for taxes from day one is the single best way to avoid a financial crisis during tax season."
    ],
    sections: [
      {
        h2: "Financial Planning for Freelancers",
        body: [
          "We recommend the 'Profit First' approach: subtract your taxes and savings before you even look at what's left for your personal salary.",
          "Typical tax reserves range from 20% to 35% depending on your location and total income tier."
        ]
      }
    ],
    faqs: [
      { q: "Is this tax advice?", a: "No. This is a planning estimate. Always consult a certified public accountant for legal tax filing." }
    ],
    related: [{ href: "/hourly-rate-calculator/", label: "Hourly Rate Calculator" }, { href: "/about/", label: "About Us" }],
    schemaHints: ["SoftwareApplication", "FAQPage"],
    lastUpdated: "2025-01-03"
  }
};