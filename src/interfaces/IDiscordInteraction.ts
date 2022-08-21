import { IDiscordInteractionData } from './IDiscordInteractionData';

export interface IDiscordInteraction {
  id: string;
  type: number;
  data: IDiscordInteractionData;
}
