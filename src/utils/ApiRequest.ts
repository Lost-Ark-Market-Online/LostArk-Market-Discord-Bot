import { HTTP_USER_AGENT, LAMO_API_URL } from '@app/config';
import { Region } from '@app/enums/Region';
import { log } from '@app/utils/Logger';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const apiClient = axios.create({
  baseURL: LAMO_API_URL,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    'User-Agent': HTTP_USER_AGENT,
  },
});

export enum ApiEndpoint {
  EXPORT_MARKET_LIVE = 'export-market-live',
  EXPORT_ITEM_HISTORY = 'export-item-history',
}

export async function ApiRequest<T>(
  endpoint: ApiEndpoint,
  region: Region,
  options: AxiosRequestConfig,
): Promise<AxiosResponse<T>> {
  return apiClient({
    url: [endpoint, region.toString()].join('/'),
    ...options,
  });
}
