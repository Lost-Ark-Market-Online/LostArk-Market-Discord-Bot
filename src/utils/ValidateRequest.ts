import { verifyKey } from 'discord-interactions';
import { Request } from 'express';
import { PUBLIC_KEY } from '../config';

export function ValidateRequest(req: Request): boolean {
  const { body } = req;
  const signature = req.get('X-Signature-Ed25519');
  const timestamp = req.get('X-Signature-Timestamp');

  return verifyKey(JSON.stringify(body), signature, timestamp, PUBLIC_KEY);
}
