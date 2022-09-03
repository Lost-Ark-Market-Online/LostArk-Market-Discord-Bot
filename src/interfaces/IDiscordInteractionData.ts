import { Command } from '../enums';
import { ICommand } from './ICommand';

export interface IDiscordInteractionData {
  id: string;
  name: Command;
  options?: ICommand[];
  guild_id?: string;
}
