export const WEBSITE_LEADS_KEY = "tts_website_leads";

export interface WebsiteLeadSubmission {
  id: string;
  submittedAt: string;
  sourcePage: string;
  mode: "quick" | "guided";
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  propertyType: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  timeline?: string;
  currentSystem?: string;
  notes?: string;
  agreeToContact: boolean;
  subscribeNewsletter: boolean;
  guidedAnswers?: Record<string, string>;
  areaName?: string;
  areaSlug?: string;
  areaZip?: string;
  formContext?: string;
  formTitle?: string;
}

export const loadWebsiteLeads = (): WebsiteLeadSubmission[] => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(WEBSITE_LEADS_KEY) || "[]");
  } catch {
    return [];
  }
};

export const saveWebsiteLead = (lead: Omit<WebsiteLeadSubmission, "id" | "submittedAt">) => {
  if (typeof window === "undefined") return null;
  const submission: WebsiteLeadSubmission = {
    ...lead,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    submittedAt: new Date().toISOString(),
  };
  const existing = loadWebsiteLeads();
  localStorage.setItem(WEBSITE_LEADS_KEY, JSON.stringify([submission, ...existing]));
  return submission;
};

export const deleteWebsiteLead = (id: string) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(WEBSITE_LEADS_KEY, JSON.stringify(loadWebsiteLeads().filter(lead => lead.id !== id)));
};

export const clearWebsiteLeads = () => {
  if (typeof window === "undefined") return;
  localStorage.removeItem(WEBSITE_LEADS_KEY);
};
