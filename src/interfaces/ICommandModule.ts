import { ICommand } from './ICommand';
import { IDiscordInteraction } from './IDiscordInteraction';

export interface ICommandModule {
  command: ICommand;
  setup: (command: ICommand) => Promise<void>;
  interact: (data: IDiscordInteraction) => Promise<void>;
}
