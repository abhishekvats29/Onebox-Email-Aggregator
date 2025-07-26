import axios from 'axios';

const SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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';

export const sendSlackNotification = async (subject: string, from: string) => {
  try {
    const text = ` *Interested Email Detected!*\n*Subject:* ${subject}\n*From:* ${from}`;
    
    await axios.post(SLACK_WEBHOOK_URL, { text });

    //console.log('Slack notification sent!');
  } catch (error) {
    //console.error('Failed to send Slack notification:', error);
  }
};
