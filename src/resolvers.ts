import { ArtMuseumsClient } from './lib/art-museums-api/art-museums.client';
import { readFromEnv } from './lib/utils/env';

const artMuseums = new ArtMuseumsClient({
  apiKey: readFromEnv('HARVARD_MUSEUMS_API_KEY'),
  host: readFromEnv('HARVARD_MUSEUMS_API_HOST'),
});

interface ResolvePrintsArguments {
  page: number;
  size: number;
}

export const resolvers = {
  Query: {
    prints: async (parent: any, { page, size }: ResolvePrintsArguments) => {
      const { records } = await artMuseums.getObjects({
        classification: 'Prints',
        hasimage: 1,
        page,
        size,
        sort: 'rank',
        sortorder: 'desc',
        q: 'verificationlevel:4',
      });

      return records;
    },
  },
};
