// src/config/emailAccounts.ts

import dotenv from "dotenv";
dotenv.config();

interface EmailAccount {
  email: string;
  password: string;
  host: string;
  port: number;
  userId: number;
}

export const emailAccounts: EmailAccount[] = [
  {
    email: process.env.IMAP_USER_1!,
    password: process.env.IMAP_PASS_1!,
    host: process.env.IMAP_HOST_1!,
    port: Number(process.env.IMAP_PORT_1),
    userId: 1,
  },
  {
    email: process.env.IMAP_USER_2!,
    password: process.env.IMAP_PASS_2!,
    host: process.env.IMAP_HOST_2!,
    port: Number(process.env.IMAP_PORT_2),
    userId: 2,
  },
];
