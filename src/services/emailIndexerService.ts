// src/services/emailIndexerService.ts

import { esClient } from '../config/elasticsearch';

export const indexEmail = async (
  createdEmail: {
    id: number;
    subject: string;
    body: string;
    sender: string;
    to: string;
    date: Date;
  },
  folder: string,
  account: string
) => {
  try {
    const emailToIndex = {
      id: createdEmail.id.toString(), // Elasticsearch needs string ID
      subject: createdEmail.subject,
      body: createdEmail.body,
      from: createdEmail.sender,
      to: createdEmail.to,
      date: createdEmail.date.toISOString(),
      folder,
      account,
    };

    await esClient.index({
      index: 'emails',
      id: emailToIndex.id,
      document: emailToIndex,
    });

    //console.log(`Indexed email: ${emailToIndex.subject}`);
  } catch (error) {
    //console.error(`Error indexing email ${createdEmail.id}:`, error);
  }
};
