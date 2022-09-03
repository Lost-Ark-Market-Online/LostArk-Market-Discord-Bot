import { IDiscordInteraction } from '../interfaces/IDiscordInteraction';
import { IDiscordInteractionData } from '../interfaces/IDiscordInteractionData';

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

  getFocusedOption() {
    if (!this.data.options) return;
    return this.data.options.find((option) => option.focused);
  }
}
