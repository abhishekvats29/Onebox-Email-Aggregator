// src/categorizer/index.ts

export type EmailCategory =
  | "Interested"
  | "Meeting Booked"
  | "Not Interested"
  | "Spam"
  | "Out of Office"
  | "Uncategorized";

export function categorizeEmail(subject: string, body: string): EmailCategory {
  const content = `${subject} ${body}`.toLowerCase();

  if (content.includes("meeting") || content.includes("calendar")) {
    return "Meeting Booked";
  }
  if (content.includes("interested") || content.includes("let's talk")) {
    return "Interested";
  }
  if (content.includes("not interested") || content.includes("no thanks")) {
    return "Not Interested";
  }
  if (content.includes("unsubscribe") || content.includes("spam")) {
    return "Spam";
  }
  if (content.includes("out of office") || content.includes("vacation")) {
    return "Out of Office";
  }

  return "Uncategorized";
}
