// src/imap/handlers/newEmailHandler.ts
import prisma from '../../config/db';
import { indexEmail } from '../../services/emailIndexerService';
import { categorizeEmail } from '../../categorizer';
import { sendSlackNotification } from '../../services/slackService';
import { triggerWebhook } from '../../services/webhookService';

export async function categorizeAndStoreEmail(
  subject: string,
  body: string,
  envelope: any,
  folder: string,
  userId: number,
  userEmail: string
) {
  const category = categorizeEmail(subject, body);
  // console.log(`Categorized Email: "${subject}" as → ${category}`);

  const sender = envelope?.from?.[0]?.address || '';
  const to = envelope?.to?.[0]?.address || '';
  const date = envelope?.date || new Date();

  const createdEmail = await prisma.email.create({
    data: {
      subject,
      sender,
      to,
      date,
      body,
      folder,
      userId,
      category,
    },
  });

  await indexEmail(createdEmail, folder, userEmail);

  // Trigger Slack and Webhook only if category is Interested
  if (category === 'Interested') {
    await sendSlackNotification(subject, body);
    await triggerWebhook({
      subject,
      sender,
      to,
      date,
      body,
      category,
    });
  }

  return createdEmail;
}
