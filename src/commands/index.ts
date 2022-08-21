import { ICommandModule } from '@app/interfaces/ICommandModule';
import * as prices from './prices';

export const commands: Map<string, ICommandModule> = new Map([
  ['prices', prices],
]);
