import { IDiscordInteraction } from '@app/interfaces/IDiscordInteraction';
import { IDiscordInteractionData } from '@app/interfaces/IDiscordInteractionData';

export default class DiscordInteraction implements IDiscordInteraction {
  constructor(
    public id: string,
    public type: number,
    public data: IDiscordInteractionData,
  ) {}

  getOptionValue<T = string>(name: string): T | undefined {
    if (!this.data.options) return;
    const option = this.data.options.find((option) => option.name === name)
      ?.value as unknown;
    return option ? (option as T) : undefined;
  }
}
