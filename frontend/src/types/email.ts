// src/types/email.ts

export interface Email {
  id: string;
  from: string;
  to: string;
  subject: string;
  body: string; // previously: snippet
  date: string;
  folder: string;
  account: string;
  snippet: string;
  category: string; // AI classification: "Interested", "Not Interested", "Follow Up"
}
