// src/routes/suggestReply.ts

import express from "express";
import { getSuggestedReply } from "../services/suggestReplyService";

const router = express.Router();

// POST /suggest-reply
router.post("/", (req, res) => {
  const { body } = req.body;

  if (!body) {
    return res.status(400).json({ error: "Missing email body" });
  }

  const reply = getSuggestedReply(body);

  if (reply) {
    return res.json({ suggestedReply: reply });
  } else {
    return res.json({ suggestedReply: null });
  }
});

export default router;
