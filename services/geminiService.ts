import { GoogleGenAI, Type, Schema } from "@google/genai";
import { GeneratedResponse } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    emailSubject: {
      type: Type.STRING,
      description: "A professional and catchy email subject line.",
    },
    emailBody: {
      type: Type.STRING,
      description: "The full body of the email response. Polite, professional, and addressing the client's needs specifically.",
    },
    estimateLow: {
      type: Type.NUMBER,
      description: "The lower end of the estimated budget range.",
    },
    estimateHigh: {
      type: Type.NUMBER,
      description: "The higher end of the estimated budget range.",
    },
    currency: {
      type: Type.STRING,
      description: "Currency code (e.g., KRW, USD). Use KRW for Korean context.",
    },
    pricingRationale: {
      type: Type.STRING,
      description: "A brief explanation of how the estimate was calculated based on the inquiry details.",
    },
    suggestedAttachments: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING, description: "Name of the file to attach." },
          reason: { type: Type.STRING, description: "Why this attachment is relevant." },
          fileType: { type: Type.STRING, description: "File extension (e.g., PDF, PPTX)." },
        },
        required: ["name", "reason", "fileType"],
      },
    },
  },
  required: ["emailSubject", "emailBody", "estimateLow", "estimateHigh", "currency", "pricingRationale", "suggestedAttachments"],
};

export const generateClientReply = async (inquiryText: string): Promise<GeneratedResponse> => {
  try {
    const model = "gemini-2.5-flash";
    
    const systemInstruction = `
      You are an expert Senior Account Manager at a top-tier digital advertising agency. 
      Your task is to analyze an incoming client inquiry and prepare a comprehensive response plan.
      
      The user will provide a raw inquiry text. You must:
      1. Draft a polite, professional, and persuasive email reply in Korean.
      2. Estimate a rough budget range (in KRW) based on standard industry rates for the requested services (e.g., social media management, video production, SEO, influencers). If vague, provide a standard starting range.
      3. Suggest 3-5 specific portfolio or case study files that should be attached to the email to prove capability.
      
      Tone: Professional, helpful, enthusiastic, and reliable.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: inquiryText,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7, // Balance between creativity and professional structure
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response received from Gemini.");
    }

    return JSON.parse(text) as GeneratedResponse;

  } catch (error) {
    console.error("Error generating reply:", error);
    throw error;
  }
};
