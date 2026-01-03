
export interface SEOPageContent {
  title: string;
  description: string;
  h1: string;
  intro: string[];
  sections: { h2: string; p: string }[];
  howItWorks: string[];
  commonMistakes: string[];
  faqs: { q: string; a: string }[];
  type: 'SoftwareApplication' | 'Article';
}

const sharedFaqs = [
  { q: "Is the Freelance Calculator free to use?", a: "Yes, our suite of pricing and tax tools is 100% free for freelancers worldwide. We aim to help independent professionals build sustainable businesses." },
  { q: "How accurate are these financial estimates?", a: "While our math follows standard accounting principles for overhead, taxes, and utilization, these are estimates for planning. Always consult a tax professional in your specific jurisdiction." },
  { q: "Do you store my financial data?", a: "No. Your data is processed entirely in your browser. We don't save your inputs on our servers, ensuring your business privacy." }
];

export const seoContent: Record<string, SEOPageContent> = {
  "/": {
    title: "Freelance Calculator | Rate, Project & Tax Estimator (2025)",
    description: "The ultimate 2025 freelance pricing suite. Calculate hourly rates, build AI project quotes, and estimate take-home pay with 100% transparent math.",
    h1: "Professional Pricing Tools for the Modern Freelancer",
    intro: [
      "Running a successful freelance business requires more than just talent—it requires a deep understanding of your financial engine. Most freelancers fail within three years because they underprice their services.",
      "Our 2025 Freelance Calculator suite removes the guesswork. Whether you are a web developer, graphic designer, or virtual assistant, we help you factor in every hidden cost: from software subscriptions and health insurance to non-billable hours and self-employment taxes."
    ],
    sections: [
      { h2: "Why Accurate Pricing Matters", p: "When you work a 9-to-5, your employer pays for your desk, your laptop, and your coffee. As a freelancer, you are the employer. If you charge $50/hour but spend 20 hours a week on admin, your real take-home rate is much lower. Our tools help you find your 'True Hourly Rate'." }
    ],
    howItWorks: ["Choose your specific role", "Input your annual income goal", "Add your business expenses", "See your recommended rate instantly"],
    commonMistakes: ["Matching market averages without checking personal costs", "Ignoring the 'Utilization Gap' (non-billable hours)"],
    faqs: sharedFaqs,
    type: "SoftwareApplication"
  },
  "/hourly-rate-calculator/": {
    title: "Freelance Hourly Rate Calculator 2025 | Set Your Prices",
    description: "Calculate your ideal hourly rate based on target salary, expenses, and billable utilization. Don't leave money on the table.",
    h1: "The Defintive Freelance Hourly Rate Calculator",
    intro: [
      "Your hourly rate is the foundation of your business. Setting it too low attracts the wrong clients and leads to burnout. Setting it too high without a strategy makes it hard to close deals.",
      "This calculator is designed to help you work backwards from your lifestyle goals. Instead of asking 'What should I charge?', it asks 'What do I need to earn to live the life I want?'"
    ],
    sections: [
      { h2: "Factor in the 'Utilization Rate'", p: "Utilization is the percentage of your time you can actually bill to clients. For most freelancers, this is between 50% and 70%. The rest of your time is spent on marketing, sales, and administrative tasks. If you assume you'll work 40 billable hours every week, you will likely fall short of your income goals." },
      { h2: "Hidden Costs of Freelancing", p: "Don't forget to include hardware upgrades, software licenses (Figma, Adobe, Zoom), professional development, and sick leave. These overhead costs must be baked into your hourly rate so they don't eat into your personal profit." }
    ],
    howItWorks: ["Define target net salary", "List all business overhead", "Set your vacation time", "Determine your billable hours"],
    commonMistakes: ["Assuming a 40-hour billable week", "Forgetting to save for retirement", "Not adjusting for local taxes"],
    faqs: [
      ...sharedFaqs,
      { q: "What is a good billable utilization rate?", a: "A healthy target is 60-65%. This allows for about 25 billable hours a week, leaving 15 hours for business growth and admin." }
    ],
    type: "SoftwareApplication"
  },
  "/project-quote-calculator/": {
    title: "AI Project Quote Builder | Generate Professional Proposals",
    description: "Use Gemini AI to generate tiered project packages (Basic, Standard, Premium). Move to value-based pricing and increase your revenue.",
    h1: "AI-Powered Project Quote Builder",
    intro: [
      "Hourly billing has a ceiling. Once you run out of hours, you run out of income. Project-based pricing allows you to decouple your earnings from your time and charge for the value you provide.",
      "Our AI tool uses the latest Google Gemini models to generate professional, tiered packages that give your clients choices while protecting your profit margins."
    ],
    sections: [
      { h2: "The Power of Tiered Pricing", p: "By offering Basic, Standard, and Premium tiers, you shift the client's mindset from 'Yes/No' to 'Which one?'. This 'Choice of Evils' strategy is used by the world's most successful agencies to increase average contract value by 30% or more." },
      { h2: "Milestone-Based Payments", p: "Never start work without a deposit. Our builder suggests clear milestone splits to ensure your cash flow remains positive throughout the project lifecycle." }
    ],
    howItWorks: ["Enter project scope details", "Specify your baseline hours", "Generate AI packages", "Copy professional email template"],
    commonMistakes: ["Offering only one price point", "Starting work without a deposit", "Vague scope definitions"],
    faqs: [
      ...sharedFaqs,
      { q: "Should I ever work hourly?", a: "Hourly is great for maintenance or ill-defined tasks. For fixed deliverables like websites or brand identities, project-based pricing is usually better for both parties." }
    ],
    type: "SoftwareApplication"
  }
};

const ROLES = ["Web Designer", "Shopify Developer", "Copywriter", "SEO Specialist", "Virtual Assistant", "UI/UX Designer", "Frontend Developer", "Fullstack Developer", "Social Media Manager", "Video Editor"];

ROLES.forEach(role => {
  const slug = role.toLowerCase().replace(/ /g, '-');
  seoContent[`/hourly-rate-calculator/${slug}/`] = {
    ...seoContent["/hourly-rate-calculator/"],
    title: `Hourly Rate Calculator for ${role}s | 2025 Pricing Guide`,
    h1: `Hourly Rate Calculator for ${role}s`,
    description: `Specific 2025 pricing calculator for ${role}s. Factor in industry-standard expenses and utilization for your niche.`
  };
});
