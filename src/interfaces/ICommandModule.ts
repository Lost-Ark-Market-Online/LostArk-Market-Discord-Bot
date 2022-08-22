import { ICommand } from './ICommand';
import { IDiscordInteraction } from './IDiscordInteraction';

export interface ICommandModule {
  command: ICommand;
  setup: (command: ICommand) => Promise<void>;
  interact: (interaction: IDiscordInteraction, interactionActionOverwrite?: any) => Promise<void>;
  autocomplete?: (interaction: IDiscordInteraction) => Promise<any>;
}
