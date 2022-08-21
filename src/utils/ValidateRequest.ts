import { verifyKey } from 'discord-interactions';
import { Request } from 'express';
import { log } from '@app/utils/Logger';
import { PUBLIC_KEY } from '@app/config';

export function ValidateRequest(req: Request): boolean {
  const { body } = req;
  const signature = req.get('X-Signature-Ed25519');
  const timestamp = req.get('X-Signature-Timestamp');

  return verifyKey(JSON.stringify(body), signature, timestamp, PUBLIC_KEY);
}
