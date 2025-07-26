// src/services/idleService.ts

import { getImapClient } from '../imap/imapClient';
import prisma from '../config/db';

export async function startIdleConnection(
  email: string,
  password: string,
  host: string,
  port: number,
  userId: number
) {
  const client = getImapClient(email, password, host, port);
  await client.connect();
  await client.mailboxOpen('INBOX');

  //console.log(` Listening for new emails (IDLE mode): ${email}`);

  client.on('exists', async () => {
    //console.log(` New email detected for ${email}, fetching...`);

    const message = await client.fetchOne('*', { source: true, envelope: true });

    if (message) {
      await prisma.email.create({
        data: {
          subject: message.envelope?.subject || '',
          sender: message.envelope?.from?.[0]?.address || '',
          to: message.envelope?.to?.[0]?.address || '',
          date: message.envelope?.date || new Date(),
          body: message.source?.toString() || '',
          userId: userId,
        },
      });

      // console.log(`New email saved for ${email}`);
    }
  });

  // Keep listening indefinitely
  await client.idle();
}
