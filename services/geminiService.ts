
import { GoogleGenAI, Type } from "@google/genai";
import { ProjectQuoteResult, Currency, CopyBlocks } from "../types";

export const generateProjectQuote = async (params: {
  role: string;
  projectType: string;
  estimatedHours: number;
  hourlyRate: number;
  complexity: string;
  currency: Currency;
}): Promise<{ quote: ProjectQuoteResult; copy: CopyBlocks }> => {
  if (!process.env.API_KEY) {
    throw new Error("AI services are currently unavailable (Missing API Key). Please ensure the environment is correctly configured.");
  }

  // Always use the process.env.API_KEY directly in the client constructor as per guidelines.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = "gemini-3-flash-preview";

  const prompt = `Generate a freelance project quote for a ${params.role} doing a ${params.projectType} project.
  Estimated baseline hours: ${params.estimatedHours}. Hourly rate: ${params.hourlyRate}. Complexity: ${params.complexity}.
  Currency: ${params.currency}.
  
  Provide three tiers of packages: Basic, Standard, and Premium.
  The Standard package should be roughly based on the baseline hours and rate.
  Include milestones with percentage splits (e.g. 50/50 or 40/30/30).
  Include clear scope inclusions and exclusions.
  Also provide a proposal summary and a professional client email.`;

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          quote: {
            type: Type.OBJECT,
            properties: {
              currency: { type: Type.STRING },
              role: { type: Type.STRING },
              projectTitle: { type: Type.STRING },
              packages: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    price: { type: Type.NUMBER },
                    timelineWeeks: { type: Type.NUMBER },
                    revisionsIncluded: { type: Type.NUMBER },
                    included: { type: Type.ARRAY, items: { type: Type.STRING } },
                    excluded: { type: Type.ARRAY, items: { type: Type.STRING } },
                    bestFor: { type: Type.STRING }
                  },
                  required: ["name", "price", "timelineWeeks", "revisionsIncluded", "included", "excluded", "bestFor"]
                }
              },
              milestones: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    percent: { type: Type.NUMBER },
                    amount: { type: Type.NUMBER },
                    due: { type: Type.STRING }
                  },
                  required: ["name", "percent", "amount", "due"]
                }
              },
              assumptions: { type: Type.ARRAY, items: { type: Type.STRING } },
              changeRequestPolicy: { type: Type.STRING }
            },
            required: ["currency", "role", "projectTitle", "packages", "milestones", "assumptions", "changeRequestPolicy"]
          },
          copy: {
            type: Type.OBJECT,
            properties: {
              proposalSummary: { type: Type.STRING },
              clientEmail: { type: Type.STRING },
              scopeChecklist: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["proposalSummary", "clientEmail", "scopeChecklist"]
          }
        },
        required: ["quote", "copy"]
      }
    }
  });

  // Accessing text directly as a property from GenerateContentResponse
  const text = response.text;
  if (!text) {
    throw new Error("No response from AI");
  }

  return JSON.parse(text);
};
