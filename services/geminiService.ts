
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
  // Rely exclusively on the environment variable as per platform standards
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = "gemini-3-pro-preview";

  const prompt = `Act as a senior freelance business strategist. Generate a high-fidelity project proposal for a ${params.role} conducting a ${params.projectType} project.
  
  CONTEXT:
  - Estimated baseline labor: ${params.estimatedHours} hours
  - Baseline billable rate: ${params.hourlyRate} ${params.currency}/hr
  - Technical Complexity: ${params.complexity}
  - Currency: ${params.currency}
  - Year: 2026

  REQUIREMENTS:
  1. Return exactly 3 packages: 'Basic', 'Standard', and 'Premium'.
  2. The Standard package price should be roughly hours * rate, plus a 15% value-pricing buffer. 
  3. Format the output strictly as JSON. Ensure prices are integers.
  4. Provide a professional client email. Use [Package Name] and [Price] as placeholders.`;

  try {
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

    const text = response.text;
    if (!text) throw new Error("The AI returned an empty response.");
    return JSON.parse(text);
  } catch (e: any) {
    console.error("Gemini API Error:", e);
    throw new Error(e.message || "Failed to communicate with the pricing engine.");
  }
};
