import { getImapClient } from '../imap/imapClient';
import prisma from '../config/db';
import { indexEmail } from './emailIndexerService';
import { categorizeEmail } from '../categorizer';
import { sendSlackNotification } from './slackService';
import { triggerWebhook } from './webhookService';

export async function fetchAndStoreEmails(
  email: string,
  password: string,
  host: string,
  port: number,
  userId?: number
) {
  let user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        password,
        host,
        port,
      },
    });
  }

  const client = getImapClient(email, password, host, port);

  await client.connect();
  await client.mailboxOpen('INBOX');

  const sinceDate = new Date();
  sinceDate.setDate(sinceDate.getDate() - 30);

  const uids = await client.search({ since: sinceDate });

  if (!uids || uids.length === 0) {
    console.log(`📭 No emails found for ${email} since ${sinceDate.toDateString()}`);
    await client.logout();
    return;
  }

  const messages = client.fetch(uids, { source: true, envelope: true });

  for await (const msg of messages) {
    const subject = msg.envelope?.subject || '';
    const body = msg.source?.toString() || '';

    const category = categorizeEmail(subject, body);
    // console.log(`Categorized Email: "${subject}" as → ${category}`);

    const createdEmail = await prisma.email.create({
      data: {
        subject,
        sender: msg.envelope?.from?.[0]?.address || '',
        to: msg.envelope?.to?.[0]?.address || '',
        date: msg.envelope?.date || new Date(),
        body,
        folder: 'INBOX',
        userId: user.id,
        category,
      },
    });

    await indexEmail(createdEmail, 'INBOX', user.email);

    // Trigger Slack + Webhook if "Interested"
    if (category === 'Interested') {
      const sender = msg.envelope?.from?.[0]?.address || 'unknown@sender.com';
      await sendSlackNotification(subject, body);
      await triggerWebhook({
        subject,
        sender,
        to: msg.envelope?.to?.[0]?.address || '',
        date: msg.envelope?.date || new Date(),
        body,
        category,
      });
    }
  }

  await client.logout();
  // console.log(` Successfully fetched and stored ${uids.length} emails for ${email}`);
}
