
export const getSuggestedReply = (emailBody?: string): string | null => {
  if (!emailBody || typeof emailBody !== "string") {
    return null;
  }

  const lc = emailBody.toLowerCase();

  // Assignment-specific logic
  if (lc.includes("shortlisted") && lc.includes("interview")) {
    return `Thank you for shortlisting my profile! I'm available for a technical interview. You can book a slot here: https://cal.com/example`;
  }

  if (lc.includes("interested") && lc.includes("position")) {
    return `I’m glad to hear you're interested! You can book a meeting with me using this link: https://cal.com/example`;
  }

  // Friendly local replies
  if (lc.includes("hello") || lc.includes("hi") || lc.includes("hey")) {
    return "Hi there! How can I assist you today?";
  }

  if (lc.includes("how are you")) {
    return "I'm just a bot, but I'm doing great — how about you?";
  }

  if (lc.includes("thank you") || lc.includes("thanks")) {
    return "You're welcome! Happy to help 😊";
  }

  // No match found
  return null;
};
