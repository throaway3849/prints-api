import axios from 'axios';
import { ArtMuseumsClient } from './art-museums.client';

import {
  mockUserRequestInterceptor,
  mockAxiosRequest,
} from '../../../test/__mocks__/axios';

describe('ArtMuseumsClient', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('#constructor()', () => {
    it('creates an axios instance and setup auth interceptors', () => {
      const client = new ArtMuseumsClient({
        apiKey: 'test-api-key',
        host: 'test-host',
      });

      expect(axios.create).toHaveBeenCalledTimes(1);
      expect(axios.create).toHaveBeenCalledWith({
        baseURL: 'test-host',
        timeout: 3000,
      });
      expect(mockUserRequestInterceptor).toHaveBeenCalledTimes(1);
      expect(client).toBeInstanceOf(ArtMuseumsClient);
    });
  });

  describe('#getObjects', () => {
    it('makes a http call with the right params', async () => {
      mockAxiosRequest.mockResolvedValue({});

      const client = new ArtMuseumsClient({
        apiKey: 'test-api-key',
        host: 'test-host',
      });

      await client.getObjects({
        classification: 'Prints',
        hasimage: 1,
        page: 1,
        size: 10,
        sort: 'rank',
        sortorder: 'desc',
        q: 'verificationlevel:4',
      });

      expect(mockAxiosRequest).toHaveBeenCalledTimes(1);
      expect(mockAxiosRequest).toHaveBeenCalledWith({
        params: {
          classification: 'Prints',
          hasimage: 1,
          page: 1,
          size: 10,
          sort: 'rank',
          sortorder: 'desc',
          q: 'verificationlevel:4',
        },
      });
    });
  });
});
