import { ICommandModule } from '../interfaces/ICommandModule';
import { Command } from '../enums';
import * as prices from './prices';

export const commands: Map<Command, ICommandModule> = new Map([
  [Command.PRICES, prices],
]);
