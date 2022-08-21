import { CommandOptionType } from '@app/enums/CommandOptionType';
import { ICommand } from '@app/interfaces/ICommand';
import { Region } from '@app/enums/Region';
import { log } from '@app/utils/Logger';
import { DiscordRequest } from '@app/utils/DiscordRequest';
import { APP_ID, GUILD_ID } from '@app/config';
import items from '@app/data/items';
import { ApiEndpoint, ApiRequest } from '@app/utils/ApiRequest';
import DiscordInteraction from '@app/classes/DiscordInteraction';

export const command: ICommand = {
  name: 'prices',
  description: 'Get the current prices of Lost Ark Market Online',
  type: CommandOptionType.SUB_COMMAND,
  options: [
    {
      name: 'region',
      description: 'The region to get prices from',
      type: CommandOptionType.STRING,
      required: true,
      choices: Object.entries(Region).map(([value, name]) => ({
        name,
        value: value as string,
      })),
    },
    {
      name: 'item',
      description: 'The item to get prices from',
      type: CommandOptionType.STRING,
      required: true,
    },
  ],
};

export const interact = async (
  interaction: DiscordInteraction,
): Promise<void> => {
  log.debug('Interact called', interaction);
  const region = interaction.getOptionValue('region');
  const itemId = interaction.getOptionValue('item');
  try {
    const {
      data: [item],
    } = await ApiRequest(ApiEndpoint.EXPORT_MARKET_LIVE, Region[region], {
      params: {
        items: itemId,
      },
    });

    console.log({ item });
  } catch (e) {
    console.error('Exception occured', e);
  }
};

export const setup = async (command: ICommand): Promise<void> => {
  log.debug('Installing command', command);
  /**
   * @TODO: Refactor the command registration to a sole responsibility helper
   */
  const endpoint = [
    'applications',
    APP_ID,
    'guilds',
    GUILD_ID,
    'commands',
  ].join('/');
  const response = await DiscordRequest(endpoint, {
    method: 'POST',
    body: command,
  });
  log.debug('Discord commands API response', await response.json());
};
