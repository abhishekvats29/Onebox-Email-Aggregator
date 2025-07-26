import { ImapFlow } from 'imapflow';

/**
 * Verifies if the IMAP credentials are valid.
 * Connects to the server and logs out immediately.
 */
export async function verifyImapCredentials(email: string, password: string): Promise<boolean> {
  const client = new ImapFlow({
    host: 'imap.gmail.com',
    port: 993,
    secure: true,
    auth: {
      user: email,
      pass: password,
    },
  });

  try {
    await client.connect();
    await client.logout();
    return true;
  } catch (error) {
    // console.error('Error connecting IMAP:', error);
    return false;
  }
}

/**
 * Returns a configured IMAP client instance
 * Used for email fetching and persistent IDLE connection
 */
export function getImapClient(user: string, pass: string, host: string, port: number): ImapFlow {
  return new ImapFlow({
    host,
    port,
    secure: true,
    auth: {
      user,
      pass,
    },
    logger: false, // Turn off internal logging
  });
}
