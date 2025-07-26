// src/routes/searchRoutes.ts

import { Router, Request, Response } from 'express';
import { searchEmails } from '../services/searchService';

const router = Router();

/**
 * @route GET /api/search?q=example&folder=Inbox&account=user@example.com
 * @desc Search emails with optional folder and account filters
 */
router.get('/', async (req: Request, res: Response) => {
  try {
    const { q, folder, account } = req.query;

    if (!q || typeof q !== 'string') {
      return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    const results = await searchEmails(q, folder?.toString(), account?.toString());
    res.json(results);
  } catch (error) {
    // Error logging can be re-enabled if needed
    // console.error('Error searching emails:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
