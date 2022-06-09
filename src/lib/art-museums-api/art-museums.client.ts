import { merge } from 'lodash';
import { ApiClient } from './api-client';

interface ArtMuseumsClientConfig {
  apiKey: string;
  host: string;
}

interface GetObjectsParams {
  classification?: 'Prints' | string;
  hasimage?: number;
  page: number;
  q?: string;
  size: number;
  sort: string;
  sortorder: 'asc' | 'desc';
}

interface Print {
  century: string;
  department: string;
  primaryimageurl: string;
  technique: string;
  title: string;
  url: string;
}

interface ApiResponse<Resource> {
  info: {
    totalrecordsperquery: number;
    totalrecords: number;
    pages: number;
    page: number;
    next: string;
  };
  records: Resource[];
}

export class ArtMuseumsClient extends ApiClient {
  public constructor({ apiKey, host }: ArtMuseumsClientConfig) {
    super({ baseURL: host });

    this.setAuthorization(apiKey);
  }

  public async getObjects(
    params: GetObjectsParams
  ): Promise<ApiResponse<Print>> {
    return (await this.get('/object', { params })) as ApiResponse<Print>;
  }

  private setAuthorization(apiKey: string): void {
    this.axios.interceptors.request.use((config) =>
      merge(config, { params: { apikey: apiKey } })
    );
  }
}
