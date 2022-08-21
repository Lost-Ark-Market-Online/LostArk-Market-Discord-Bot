import { ICommandModule } from '@app/interfaces/ICommandModule';
import { Command } from '@app/enums';
import * as prices from './prices';

export const commands: Map<Command, ICommandModule> = new Map([
  [Command.PRICES, prices],
]);
