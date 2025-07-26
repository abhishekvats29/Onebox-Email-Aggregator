// src/index.ts

import express from 'express';
import cors from 'cors';
import { emailAccounts } from './config/emailAccounts';
import { fetchAndStoreEmails } from './services/emailService';
import { startIdleConnection } from './services/idleService';
import emailRoutes from './routes/emailRoutes';
import searchRoutes from './routes/searchRoutes';
import suggestReplyRouter from "./routes/suggestReply";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/api/emails', emailRoutes);
app.use('/api/emails', searchRoutes); 
app.use("/suggest-reply", suggestReplyRouter);


app.listen(PORT, async () => {
  console.log(` Server running on http://localhost:${PORT}`);

  for (const account of emailAccounts) {
    try {
      await fetchAndStoreEmails(
        account.email,
        account.password,
        account.host,
        account.port,
        account.userId
      );
      //console.log(` Initial sync done for ${account.email}`);

      //  Start IDLE listener
      startIdleConnection(
        account.email,
        account.password,
        account.host,
        account.port,
        account.userId
      );
    } catch (error) {
      console.error(` Error for ${account.email}:`, error);
    }
  }
});

app.get('/', (req, res) => {
  res.send(' Backend is up and running!');
});
