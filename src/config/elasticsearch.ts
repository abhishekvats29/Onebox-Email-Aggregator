import { Client } from '@elastic/elasticsearch';
import {
  Transport,
  TransportRequestParams,
  TransportRequestOptions,
} from '@elastic/transport';

class CustomTransport extends Transport {
  request(
    params: TransportRequestParams,
    options: TransportRequestOptions = {}
  ): any {
    options.headers = {
      Accept: 'application/vnd.elasticsearch+json;compatible-with=8',
      'Content-Type': 'application/vnd.elasticsearch+json;compatible-with=8', // Fixed
      ...(options.headers || {}),
    };

    return super.request(params, options);
  }
}

export const esClient = new Client({
  node: 'http://localhost:9200',
  Transport: CustomTransport,
});
