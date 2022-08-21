import { Logger } from 'tslog';
import { name } from '../../package.json';

export const log: Logger = new Logger({ name });
