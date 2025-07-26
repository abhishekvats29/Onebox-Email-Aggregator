// src/routes/searchRoutes.ts

import { Router } from 'express';
import { searchEmails } from '../services/searchService';

const router = Router();

router.get('/search', async (req, res) => {
  const { q, folder, account } = req.query;

  if (!q) {
    return res.status(400).json({ error: 'Query parameter "q" is required' });
  }

  try {
    const results = await searchEmails(q.toString(), folder?.toString(), account?.toString());
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
