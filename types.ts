
export type Currency = 'USD' | 'GBP' | 'EUR' | 'PKR' | 'INR' | 'AUD' | 'CAD' | 'JPY' | 'AED';

export interface Package {
  name: 'Basic' | 'Standard' | 'Premium';
  price: number;
  timelineWeeks: number;
  revisionsIncluded: number;
  included: string[];
  excluded: string[];
  bestFor: string;
}

export interface Milestone {
  name: string;
  percent: number;
  amount: number;
  due: string;
}

export interface ProjectQuoteResult {
  currency: Currency;
  role: string;
  projectTitle: string;
  packages: Package[];
  milestones: Milestone[];
  assumptions: string[];
  changeRequestPolicy: string;
}

export interface CopyBlocks {
  proposalSummary: string;
  clientEmail: string;
  scopeChecklist: string[];
}

export interface HourlyRateState {
  targetIncome: number;
  expenses: number;
  weeksOff: number;
  hoursPerWeek: number;
  utilization: number;
  profitMargin: number;
  taxReserve: number;
  platformFee: number;
}

export interface OverheadState {
  softwareSaaS: number;
  hardwareGear: number;
  marketingAds: number;
  insuranceLegal: number;
  educationTraining: number;
  officeUtilities: number;
}
