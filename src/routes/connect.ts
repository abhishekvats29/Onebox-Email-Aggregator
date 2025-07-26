// src/routes/connect.ts
import { Router, Request, Response } from 'express';
import { verifyImapCredentials } from '../imap/imapClient';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  const isValid = await verifyImapCredentials(email, password);

  if (isValid) {
    res.status(200).json({ message: 'IMAP credentials are valid.' });
  } else {
    res.status(401).json({ message: 'Invalid IMAP credentials.' });
  }
});

export default router;
