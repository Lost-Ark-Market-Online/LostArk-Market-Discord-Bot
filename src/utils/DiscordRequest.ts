import { DISCORD_API_URL, DISCORD_TOKEN, HTTP_USER_AGENT } from '../config';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const apiClient = axios.create({
  baseURL: DISCORD_API_URL,
  headers: {
    Authorization: ['Bot', DISCORD_TOKEN].join(' '),
    'Content-Type': 'application/json; charset=UTF-8',
    'User-Agent': HTTP_USER_AGENT,
  },
});

export async function DiscordRequest<T>(
  endpoint: string,
  options: AxiosRequestConfig,
): Promise<AxiosResponse<T>> {
  return apiClient({
    url: endpoint,
    ...options,
  });
}
