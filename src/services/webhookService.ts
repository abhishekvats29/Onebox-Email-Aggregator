// src/services/webhookService.ts
import axios from 'axios';

const WEBHOOK_URL =
  'https://hooks.slack.com/services/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'; 

type WebhookPayload = {
  subject: string;
  sender: string;
  to: string;
  date: Date;
  body: string;
  category: string;
};

export async function triggerWebhook({
  subject,
  sender,
  to,
  date,
  body,
  category,
}: WebhookPayload) {
  try {
    await axios.post(WEBHOOK_URL, {
      text: `🔔 *Interested Email Received*\n*Subject:* ${subject}\n*Sender:* ${sender}\n*To:* ${to}\n*Date:* ${date}\n*Category:* ${category}\n\n*Body Preview:*\n${body.slice(
        0,
        300
      )}...`, // Limit body preview for readability
    });

    //console.log(`Webhook triggered for interested email: "${subject}"`);
  } catch (err: any) {
    //console.error('Failed to trigger webhook:', err?.message || err);
  }
}
