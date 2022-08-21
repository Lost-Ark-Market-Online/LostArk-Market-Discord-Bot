import { DISCORD_API_URL, DISCORD_TOKEN } from '@app/config';
import fetch, { Response } from 'node-fetch';
import { log } from '@app/utils/Logger';

const BOT_USER_AGENT = process.env.BOT_USER_AGENT || 'DiscordBot';

export async function DiscordRequest(
  endpoint: string,
  options: any,
): Promise<Response> {
  const url = [DISCORD_API_URL, endpoint].join('/');

  if (options.body) options.body = JSON.stringify(options.body);
  const res = await fetch(url, {
    headers: {
      Authorization: ['Bot', DISCORD_TOKEN].join(' '),
      'Content-Type': 'application/json; charset=UTF-8',
      'User-Agent': BOT_USER_AGENT,
    },
    ...options,
  });

  if (!res.ok) {
    const data = await res.json();
    console.log(res.status);
    throw new Error(JSON.stringify(data));
  }

  return res;
}
