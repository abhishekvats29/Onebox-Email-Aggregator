import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import emailRoutes from './routes/emailRoutes';
import searchRoutes from './routes/searchRoutes';
import { fetchAndStoreEmails } from './services/emailService';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend server is running!');
});

app.post('/fetch-emails', async (req, res) => {
  try {
    const {
      email = process.env.IMAP_USER_1,
      password = process.env.IMAP_PASS_1,
      host = process.env.IMAP_HOST_1,
      port = Number(process.env.IMAP_PORT_1),
      userId = 1,
    } = req.body;

    if (!email || !password || !host || !port || !userId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    await fetchAndStoreEmails(email, password, host, port, userId);
    res.status(200).json({ message: 'Emails fetched and stored successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch emails', error });
  }
});


app.use('/api/emails', emailRoutes);
app.use('/api/emails', searchRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
