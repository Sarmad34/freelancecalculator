
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
      { q: "Can I use these tools for agency pricing?", a: "Yes, our models allow for profit margins and overhead tracking, which are essential for scaling from a solo freelancer to a boutique agency." },
      { q: "How often should I recalculate my rates?", a: "At minimum, every 6 months. High inflation or shifting software costs in 2026 require frequent audits of your business burn rate." },
      { q: "Does AI affect these calculations?", a: "AI increases your efficiency. If a task takes 50% less time due to AI, your hourly rate should technically double to maintain the same value-based income." }
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
    faqs: [
      { q: "Should I charge for discovery calls?", a: "In 2026, top-tier freelancers treat discovery as a paid consultation. If the call involves strategic advice rather than just logistics, charge a flat fee." },
      { q: "How often should I raise my rates?", a: "Review your rates every 6 months. If your billable utilization stays above 80% for more than two months, it's a clear signal to increase your rate by 15-20%." },
      { q: "What if a client asks for a discount?", a: "Never discount your rate without reducing the scope. If they have a lower budget, offer a 'Lite' version of the service instead of lowering your hourly worth." },
      { q: "How do I include my equipment costs?", a: "Add the annual cost of your hardware (divided by 3 for a 3-year refresh cycle) to your business expenses field in the calculator." },
      { q: "Is it better to bill by the hour or by the project?", a: "Hourly is safest for undefined scopes. However, fixed-project pricing allows you to capture the profit of your own efficiency as you get faster." },
      { q: "What is a healthy profit margin for a freelancer?", a: "Aim for 10-20% on top of your 'survival' rate. This margin covers professional development and periods of low work volume." }
    ],
    related: TOOL_LINKS,
    schemaHints: ["FinancialService", "FAQPage"],
    lastUpdated: "2026-01-01"
  },
  "/day-rate-architect": {
    path: "/day-rate-architect",
    title: "Day Rate & Weekly Architect | Freelance Value Pricing",
    description: "Architect your transition from hourly billing to high-value day rates and weekly blocks.",
    h1: "Day Rate & Weekly Architect",
    intro: ["Stop selling minutes and start selling results. Use this tool to model how day-rates and weekly 'Sprints' can double your effective hourly rate."],
    sections: [
      { h2: "The Psychology of Day Rates", body: ["Day rates signal seniority. They inform the client that they are buying your peak performance and focused attention, not just blocks of labor."] }
    ],
    faqs: [
      { q: "Is a day rate just 8x my hourly rate?", a: "No. A day rate should include a 'Focus Premium' of 10-20% because you are forgoing other clients to dedicate a full block to one project." },
      { q: "Do you offer half-day rates?", a: "Generally, no. Half-days involve the same amount of 'context switching' as full days. Most experts charge a minimum of 1 full day to protect their schedule." },
      { q: "What happens if a project takes 1.5 days?", a: "Standard practice is to bill for 2 days or define 'additional hours' at a premium 1.5x hourly rate if the focus block is exceeded." },
      { q: "Should travel time be included?", a: "Yes. For day rates involving on-site work, travel time is usually billed at 50% of the day rate or a flat 'travel fee'." },
      { q: "How do I handle revisions on a day rate?", a: "Revisions should be built into the following day's block or billed as a separate 'Revision Sprint'." },
      { q: "Can I switch back to hourly for existing clients?", a: "Yes, but we recommend only doing so for small maintenance tasks. For new strategic work, keep them on the day rate model." }
    ],
    related: TOOL_LINKS,
    schemaHints: ["FinancialService", "FAQPage"],
    lastUpdated: "2026-01-01"
  },
  "/retainer-calculator": {
    path: "/retainer-calculator",
    title: "Freelance Retainer Calculator | Recurring Revenue Planner",
    description: "Calculate recurring revenue packages and monthly service fees to stabilize your freelance income.",
    h1: "Retainer Architect",
    intro: ["Kill the freelance rollercoaster. Transition your clients to monthly recurring revenue (MRR) with predictable service level agreements."],
    sections: [],
    faqs: [
      { q: "Do retainer hours roll over?", a: "Standard 2026 practice is 'Use it or Lose it'. Rolling hours over complicates your future capacity planning and punishes your availability." },
      { q: "What is the best way to track retainer hours?", a: "Use a transparent tool like Harvest or Toggl. Send a monthly report to the client even if they don't ask for it to show continuous value." },
      { q: "How much of a discount should I give for a retainer?", a: "Usually 5-15% is the sweet spot. You are trading a small margin for the massive benefit of guaranteed, predictable income." },
      { q: "What is a typical retainer contract length?", a: "Start with a 3-month trial, then move to rolling monthly with a 30-day notice period for termination." },
      { q: "Can I have 'Unlimited' retainers?", a: "Avoid 'unlimited' unless it's a very narrow task. Better to define a 'Response Time' (e.g., 24-hour turnaround) rather than unlimited volume." },
      { q: "Should I include software costs in a retainer?", a: "Yes. If the retainer requires specific premium tools, those should be billed back to the client or baked into the monthly fee." }
    ],
    related: TOOL_LINKS,
    schemaHints: ["FinancialService", "FAQPage"],
    lastUpdated: "2026-01-01"
  },
  "/guides/how-to-set-freelance-rates": {
    path: "/guides/how-to-set-freelance-rates",
    title: "How to Set Freelance Rates in 2026 | Strategic Guide",
    description: "A comprehensive guide on pricing psychology, market benchmarks, and survival math for independent professionals.",
    h1: "Pricing for the 2026 Economy",
    intro: ["Setting rates is the most stressful part of freelancing. This guide breaks down the math of survival and the psychology of profit."],
    sections: [],
    faqs: [
      { q: "Is it okay to charge based on my location?", a: "No. Charge based on the value delivered to the client's market. If a US company gets $10k in value, your location is irrelevant to the price." },
      { q: "How do I know if I'm undercharging?", a: "If every single lead says 'yes' immediately without questioning the price, you are likely at least 30% under market value." },
      { q: "Should I have my rates public?", a: "Public rates filter out low-budget clients but can cap your upside with high-budget enterprise clients. A 'Starting At' price is often the best middle ground." },
      { q: "How do I justify a rate hike to an old client?", a: "Frame it around value and increased overhead. 'To maintain the quality of service and reflect my increased expertise, my rates are moving to $X starting next month.'" },
      { q: "Should I charge different rates for different services?", a: "Yes. Strategic consulting should be billed higher than execution-based tasks. Use our suite to model different service-level rates." },
      { q: "What if my market is saturated?", a: "Saturation is usually at the bottom. Specialize in a niche (e.g., 'Web Design for FinTech') to move into a blue ocean where pricing power is higher." }
    ],
    related: GUIDE_LINKS,
    schemaHints: ["Guide", "FAQPage"],
    lastUpdated: "2026-01-01"
  },
  "/guides/billable-hours-utilization": {
    path: "/guides/billable-hours-utilization",
    title: "Utilization Secrets: Billable vs. Non-Billable Time",
    description: "Learn how to manage your time as a micro-business. Why 40 hours of work rarely means 40 hours of pay.",
    h1: "Mastering Utilization",
    intro: ["Freelancers are not employees. You are a business owner. This guide explains why 'Billable Utilization' is your most important metric."],
    sections: [],
    faqs: [
      { q: "What is a 'safe' utilization rate?", a: "60-70% is healthy. Trying to bill more than 30 hours a week consistently leads to burnout and neglecting your own business growth." },
      { q: "What counts as non-billable time?", a: "Invoicing, sales calls, marketing your own brand, learning new skills, and troubleshooting your own equipment." },
      { q: "How do I reduce non-billable time?", a: "Automate your invoicing, use templates for proposals, and set strict boundaries on 'free' consultation time." },
      { q: "Can I bill for research?", a: "Yes, if the research is specific to a client's project outcome. General learning should be covered by your profit margin." },
      { q: "Does admin time decrease as I get more senior?", a: "No, it often increases because you spend more time on strategy and sales. This is why senior rates must be significantly higher." },
      { q: "Should I track time for fixed-price projects?", a: "Absolutely. You need to know your 'Effective Hourly Rate' to ensure the fixed price was actually profitable." }
    ],
    related: GUIDE_LINKS,
    schemaHints: ["Guide", "FAQPage"],
    lastUpdated: "2026-01-01"
  },
  "/guides/fixed-price-vs-hourly": {
    path: "/guides/fixed-price-vs-hourly",
    title: "Fixed Price vs Hourly: Choosing Your Billing Strategy",
    description: "The pros and cons of the two most popular billing models in the freelance economy.",
    h1: "Billing Strategy Guide",
    intro: ["Should you sell your minutes or your results? We compare the two primary models for independent income."],
    sections: [],
    faqs: [
      { q: "Is hourly billing dead?", a: "No. It is still the best model for maintenance work or projects where the client cannot define a clear scope." },
      { q: "When is fixed-price most profitable?", a: "When you have a repeatable process (productized service) where you can deliver high-value results faster than a generalist." },
      { q: "How do I handle scope creep on fixed-price?", a: "Strictly define 'Out of Scope' items in your proposal and have an hourly 'Add-on' rate ready for any extra requests." },
      { q: "Do clients prefer fixed-price?", a: "Usually yes. Clients value budget certainty over everything else. They would rather pay $5k flat than 'somewhere between $3k and $7k'." },
      { q: "Can I mix both on one project?", a: "Yes. Charge a fixed fee for the initial build and move to hourly for ongoing minor support and tweaks." },
      { q: "What is a 'Project Minimum'?", a: "The smallest dollar amount you are willing to accept to open a project. Setting this (e.g., $1,500) prevents low-value work from cluttering your schedule." }
    ],
    related: GUIDE_LINKS,
    schemaHints: ["Guide", "FAQPage"],
    lastUpdated: "2026-01-01"
  },
  "/guides/pricing-packages": {
    path: "/guides/pricing-packages",
    title: "The Art of Tiered Pricing Packages",
    description: "Learn how to use the 'Rule of Three' to increase your project conversion and average deal size.",
    h1: "Tiered Pricing Architect",
    intro: ["Stop sending single-price quotes. Learn how 'Good, Better, Best' packages change the client's question from 'Yes/No' to 'Which one?'."],
    sections: [],
    faqs: [
      { q: "What should be in my 'Premium' tier?", a: "Fast-track delivery, direct Slack access, source files, or a post-launch strategy audit. Items that have high perceived value but low marginal cost to you." },
      { q: "Is the 'Basic' tier just a teaser?", a: "It should be functional but minimal. It exists to anchor the value of your 'Standard' tier, which is your real target." },
      { q: "Should I name my packages?", a: "Yes. Names like 'Startup,' 'Growth,' and 'Enterprise' help clients self-identify which bucket they belong in." },
      { q: "How much more should Premium cost?", a: "Standard is usually 2x Basic. Premium is usually 2x-3x Standard. This creates a wide value spread." },
      { q: "Can I have four tiers?", a: "Avoid this. Four options cause 'Analysis Paralysis.' Three is the cognitive limit for quick, confident decision-making." },
      { q: "What if they want to mix items between tiers?", a: "Offer to create a 'Custom Hybrid' quote based on the Standard tier rate, but remind them that pre-built packages offer the best value." }
    ],
    related: GUIDE_LINKS,
    schemaHints: ["Guide", "FAQPage"],
    lastUpdated: "2026-01-01"
  },
  "/guides/retainers-for-freelancers": {
    path: "/guides/retainers-for-freelancers",
    title: "Retainer Strategy for Steady Freelance Income",
    description: "How to move from one-off projects to predictable monthly recurring revenue (MRR).",
    h1: "Recurring Revenue Blueprint",
    intro: ["Stability is the holy grail of freelancing. This guide shows you how to pitch and price monthly service level agreements."],
    sections: [],
    faqs: [
      { q: "What service is best for retainers?", a: "Ongoing maintenance, content creation, social media management, or strategic consulting where the client needs consistent input." },
      { q: "Should I get paid upfront?", a: "Yes. Retainers should always be 'Pre-paid' on the 1st of the month to ensure your availability is reserved." },
      { q: "How do I fire a retainer client?", a: "Ensure your contract has a clear 30-day exit clause. Professionalism is key to maintaining your reputation." },
      { q: "Can I increase my retainer rates?", a: "Yes, typically an annual 5-10% 'Cost of Living' adjustment is standard and expected by professional clients." },
      { q: "What if they don't use their hours?", a: "Send a monthly 'Impact Report' showing what was done. Remind them that they are paying for your 'Availability' and capacity reservation." },
      { q: "Should I limit the number of retainer clients?", a: "Yes. A safe limit is 3-5 high-value retainers. This ensures you still have space for new projects and professional growth." }
    ],
    related: GUIDE_LINKS,
    schemaHints: ["Guide", "FAQPage"],
    lastUpdated: "2026-01-01"
  },
  "/guides/international-invoicing-tax": {
    path: "/guides/international-invoicing-tax",
    title: "International Invoicing & Multi-Currency Strategy for 2026",
    description: "Master cross-border freelance finance. Managing foreign exchange risk and international tax requirements.",
    h1: "International Finance Masterclass",
    intro: ["In the 2026 borderless economy, your client might be in London while you are in Karachi. Mastering multi-currency flows is no longer optional."],
    sections: [
      { h2: "FX Risk Mitigation", body: ["Always quote in the currency most stable for your local economy, or add a 3% 'Currency Buffer' to protect against weekly market fluctuations."] }
    ],
    faqs: [
      { q: "What is the best way to receive USD abroad?", a: "Tools like Wise, Payoneer, or Revolut Business provide local US bank details, significantly reducing wire transfer fees." },
      { q: "How do I handle VAT for international clients?", a: "Usually, for cross-border B2B services, 'Reverse Charge' rules apply where the client is responsible for local taxes, but always check local laws." },
      { q: "Should I invoice in my currency or theirs?", a: "Invoice in the currency of the contract. If the contract is in USD, send a USD invoice. Let your payment processor handle the conversion." },
      { q: "How do I protect against sudden currency drops?", a: "Add a 'Currency Fluctuation' clause to contracts over $5k that allows for price adjustments if the rate moves more than 5%." },
      { q: "Do I need a local tax ID for every country?", a: "Usually no. Your local tax ID from your home country is sufficient for most international invoicing, supplemented by a W-8BEN for US clients." },
      { q: "Are international wires expensive?", a: "Yes, traditional SWIFT wires can cost $20-$50 per transaction plus hidden FX spreads. Digital-first banks are 90% cheaper." }
    ],
    related: GUIDE_LINKS,
    schemaHints: ["Guide", "FAQPage"],
    lastUpdated: "2026-01-01"
  },
  "/overhead-expense-calculator": {
    path: "/overhead-expense-calculator",
    title: "Freelance Overhead Auditor | Burn Rate Calculator",
    description: "Audit your business expenses and identify SaaS sprawl.",
    h1: "Overhead Auditor",
    intro: ["Hidden expenses are the silent killer of freelance profit. Our auditor identifies exactly how much your toolset costs you per hour worked."],
    sections: [],
    faqs: [
      { q: "What is 'SaaS Sprawl'?", a: "The accumulation of monthly software subscriptions that you no longer use or that overlap in functionality." },
      { q: "Should I count my home office rent?", a: "Yes. Even if you own, calculate the 'Market Rent' of the space used exclusively for business to understand your true overhead." },
      { q: "How do I lower my hardware burn rate?", a: "Consider a 4-year refresh cycle instead of 2-year, and always check if 'Open Box' professional gear meets your specs." },
      { q: "Are professional association fees overhead?", a: "Absolutely. Any recurring cost required to maintain your professional status or network is a business expense." },
      { q: "Should I buy or lease my equipment?", a: "In 2026, buying is usually better for long-term margins, while leasing is better for initial cash flow at the start of your journey." },
      { q: "Does professional insurance count as overhead?", a: "Yes. Professional Indemnity and General Liability are non-negotiable costs of doing high-level business." }
    ],
    related: TOOL_LINKS,
    schemaHints: ["FinancialService", "FAQPage"],
    lastUpdated: "2026-01-01"
  },
  "/platform-fee-calculator": {
    path: "/platform-fee-calculator",
    title: "Platform Fee Calculator | Upwork & Fiverr Margin Control",
    description: "Calculate net pay after platform commissions.",
    h1: "Platform Fee Auditor",
    intro: ["Platform commissions can eat 10-20% of your revenue instantly. This tool helps you quote higher to protect your bottom line."],
    sections: [],
    faqs: [
      { q: "Why do platforms charge so much?", a: "They provide lead generation, payment protection, and contract mediation. You are paying for their marketing and infrastructure." },
      { q: "Is it ever okay to take a client off-platform?", a: "Only after the platform's 'Disintermediation' period (usually 2 years) or by paying their buyout fee. Violating terms can lead to a permanent ban." },
      { q: "How do I offset platform fees?", a: "The best strategy is to quote 10-20% higher on-platform to ensure your net take-home matches your direct-client rates." },
      { q: "Do payment processing fees stack?", a: "Yes. Often a platform takes 10%, AND there is a 2.9% credit card fee, plus a withdrawal fee. Always calculate the 'Total Friction'." },
      { q: "What if a platform changes its fee mid-project?", a: "Usually, project fees are locked at the time of the contract. However, rolling hourly contracts may be subject to global fee updates." },
      { q: "Are there zero-fee platforms?", a: "Some niche marketplaces charge the client instead of the freelancer, or use a flat monthly subscription model instead of a percentage." }
    ],
    related: TOOL_LINKS,
    schemaHints: ["FinancialService", "FAQPage"],
    lastUpdated: "2026-01-01"
  },
  "/tax-take-home-estimator": {
    path: "/tax-take-home-estimator",
    title: "Freelance Tax & Take-Home Estimator",
    description: "Estimate your real take-home pay after tax reserves and wealth savings.",
    h1: "Net Worth Architect",
    intro: ["Revenue is a vanity metric; take-home pay is sanity. Architect your savings and tax reserves with precision."],
    sections: [],
    faqs: [
      { q: "How much should I save for taxes?", a: "A safe rule of thumb in 2026 is 25-30% of your net profit. It is better to have an overfunded tax account than an IRS bill." },
      { q: "What is 'Self-Employment Tax'?", a: "In many regions (like the US), it's the combined employer and employee share of social security and medicare." },
      { q: "Should I pay myself a fixed salary?", a: "Yes. It creates discipline. Transfer a fixed amount to your personal account twice a month and leave the rest in your business 'War Chest'." },
      { q: "Can I deduct my morning coffee?", a: "Usually no, unless it's a legitimate business meeting with a client or prospect. Personal meals are rarely deductible." },
      { q: "What is a 'War Chest'?", a: "A business savings account with 3-6 months of operating expenses. This is your insurance policy against slow months." },
      { q: "Should I use automated tax software?", a: "Yes. Tools like QuickBooks or Xero automate the tracking of deductions, which can save you thousands in 'Tax Leakage' every year." }
    ],
    related: TOOL_LINKS,
    schemaHints: ["FinancialService", "FAQPage"],
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
