
import { HourlyRateState } from '../types';

/**
 * Calculates hourly and day rates based on income targets and business constraints.
 * Example: targetIncome: 80k, expenses: 5k, weeksOff: 4, hoursPerWeek: 40, util: 60%
 * Result: ~ $82/hr base, $90/hr with profit margin.
 */
export const calculateHourlyRates = (state: HourlyRateState) => {
  const { 
    targetIncome, 
    expenses, 
    weeksOff, 
    hoursPerWeek, 
    utilization, 
    profitMargin, 
    taxReserve,
    platformFee
  } = state;

  const weeksWorked = 52 - weeksOff;
  const totalWorkingHoursYear = weeksWorked * hoursPerWeek;
  const billableHoursYear = totalWorkingHoursYear * (utilization / 100);

  // We need to earn enough to cover target, expenses, AND the tax reserve we'll put away
  const requiredRevenueBeforeTax = (targetIncome + expenses) / (1 - (taxReserve / 100));
  
  // Also account for platform fees if applicable (if they take 10%, we need to charge more to net our required revenue)
  const grossRequiredRevenue = requiredRevenueBeforeTax / (1 - (platformFee / 100));

  const hourlyBaseRate = billableHoursYear > 0 ? grossRequiredRevenue / billableHoursYear : 0;
  const recommendedHourlyRate = hourlyBaseRate * (1 + (profitMargin / 100));

  return {
    totalWorkingHoursYear,
    billableHoursYear,
    requiredRevenueBeforeTax,
    grossRequiredRevenue,
    hourlyBaseRate,
    recommendedHourlyRate,
    dayRate8: recommendedHourlyRate * 8,
    dayRate7: recommendedHourlyRate * 7,
    dayRate6: recommendedHourlyRate * 6
  };
};

export const formatCurrency = (amount: number, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const calculateNetFromGross = (gross: number, platformFeePercent: number, paymentFee: number) => {
  const fee = gross * (platformFeePercent / 100);
  const net = gross - fee - paymentFee;
  return { fee, net };
};

export const calculateGrossFromNet = (net: number, platformFeePercent: number, paymentFee: number) => {
  // net = gross - (gross * p/100) - pf
  // net + pf = gross * (1 - p/100)
  // gross = (net + pf) / (1 - p/100)
  const gross = (net + paymentFee) / (1 - (platformFeePercent / 100));
  return gross;
};
