// src/controllers/emailController.ts

import { Request, Response } from "express";
import { fetchAndStoreEmails } from "../services/emailService";
import prisma from "../config/db"; // Correct default import

export const fetchEmails = async (req: Request, res: Response) => {
  try {
    const email = process.env.IMAP_USER_1!;
    const password = process.env.IMAP_PASS_1!;
    const host = process.env.IMAP_HOST_1 || "imap.gmail.com";
    const port = Number(process.env.IMAP_PORT_1 || 993);
    const userId = 1;

    await fetchAndStoreEmails(email, password, host, port, userId);

    res.status(200).json({ message: "Emails fetched and stored successfully" });
  } catch (error: any) {
    // console.error(" Error fetching emails:", error);
    res.status(500).json({ message: "Failed to fetch emails", error: error.message });
  }
};
