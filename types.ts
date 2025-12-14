export interface GeneratedResponse {
  emailSubject: string;
  emailBody: string;
  estimateLow: number;
  estimateHigh: number;
  currency: string;
  pricingRationale: string;
  suggestedAttachments: AttachmentSuggestion[];
}

export interface AttachmentSuggestion {
  name: string;
  reason: string;
  fileType: string;
}

export interface AnalysisState {
  isLoading: boolean;
  data: GeneratedResponse | null;
  error: string | null;
}
