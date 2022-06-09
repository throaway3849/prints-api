import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { toUpper } from 'lodash';

const DEFAULT_TIMEOUT_IN_MS = 3000;

export class ApiClient {
  protected axios: AxiosInstance;

  protected constructor(config: Partial<AxiosRequestConfig>) {
    this.axios = axios.create({
      timeout: DEFAULT_TIMEOUT_IN_MS,
      ...config,
    });
  }

  protected get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>({ method: 'get', url, ...config });
  }

  private async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const { data } = await this.axios.request<T>(config);

      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw ApiClient.handleAxiosError(error);
      }
      throw error;
    }
  }

  private static handleAxiosError(error: AxiosError): Error {
    const { method, url, baseURL } = error.config;
    const endpoint = `${toUpper(method)} ${baseURL}${url}`;

    if (error.response) {
      const { status, data } = error.response;

      return new Error(
        `Call to ${endpoint} failed (HTTP ${status}). Response body: ${JSON.stringify(
          data
        )}`
      );
    }
    if (error.request) {
      return new Error(
        `Request to ${endpoint} was made but no response was received. ${error}`
      );
    }

    return new Error(
      `Something happened in setting up the request that triggered an error: ${error}`
    );
  }
}
