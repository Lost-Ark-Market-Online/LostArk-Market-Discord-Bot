import { ICommand } from './ICommand';

export interface IDiscordInteractionData {
  id: string;
  name: string;
  options?: ICommand[];
  guild_id?: string;
}
