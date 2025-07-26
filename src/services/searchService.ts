// src/services/searchService.ts

import { esClient } from '../config/elasticsearch';

export const searchEmails = async (
  query: string,
  folder?: string,
  account?: string
) => {
  const must: any[] = [
    {
      multi_match: {
        query,
        fields: ['subject', 'body', 'from', 'to'],
        fuzziness: 'AUTO',
      },
    },
  ];

  if (folder) {
    must.push({ match: { folder } });
  }

  if (account) {
    must.push({ match: { account } });
  }

  const result = await esClient.search({
    index: 'emails',
    query: {
      bool: {
        must,
      },
    },
  });

  return result.hits.hits.map((hit: any) => hit._source);
};
