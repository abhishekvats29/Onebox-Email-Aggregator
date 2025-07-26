// testImap.ts
import { ImapFlow } from 'imapflow';

const client = new ImapFlow({
  host: 'imap.gmail.com',
  port: 993,
  secure: true,
  auth: {
    user: 'abhishekvats4567@gmail.com',       // Gmail
    pass: 'eejouxcmezqggtxx',                  // App Password
  },
});

async function run() {
  try {
    await client.connect();
    //console.log('App password is correct. IMAP connected.');
    await client.logout();
  } catch (error) {
    //console.error(' Invalid App password or IMAP error:\n', error);
  }
}

run();
