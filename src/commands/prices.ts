import { CommandOptionType } from '../enums/CommandOptionType';
import { ICommand } from '../interfaces/ICommand';
import { Region } from '../enums/Region';
import { log } from '../utils/Logger';
import { DiscordRequest } from '../utils/DiscordRequest';
import { APP_ID } from '../config';
import { ApiEndpoint, ApiRequest } from '../utils/ApiRequest';
import DiscordInteraction from '../classes/DiscordInteraction';
import { InteractionResponseType } from 'discord-interactions';
import { LiveMarketItem } from '../types/API/LiveMarketItem';
import moment from 'moment';
import items from '../data/items';
import { ICommandChoice } from '../interfaces/ICommandChoice';

const AutocompleteFieldMap: Record<string, ICommandChoice[]> = {
  item: Object.entries(items).map(([value, name]) => ({
    name,
    value,
  })),
};

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
      autocomplete: true,
    },
  ],
};

export const autocomplete = async (
  interaction: DiscordInteraction,
): Promise<any> => {
  const focused = interaction.getFocusedOption();
  const choices = [];

  if (focused) {
    const { name, value } = focused;
    const autocompleteObject = AutocompleteFieldMap[name];
    if (autocompleteObject) {
      choices.push(
        ...autocompleteObject
          .filter(
            (option) =>
              option.name.indexOf(value) > -1 ||
              option.value.indexOf(value) > -1,
          )
          .slice(0, 25),
      );
    }
  }

  return {
    type: InteractionResponseType.APPLICATION_COMMAND_AUTOCOMPLETE_RESULT,
    data: {
      choices,
    },
  };
};

export const interact = async (
  interaction: DiscordInteraction,
  interactionActionOverwrite?: any
): Promise<any> => {
  log.debug('Interact called', interaction);
  const region = interaction.getOptionValue('region');
  const itemId = interaction.getOptionValue('item');
  try {
    let interactionAction = interactionActionOverwrite;
    if(!interactionAction){
      console.log("No Overwrite found");
      interactionAction = async () => ApiRequest<LiveMarketItem[]>(
        ApiEndpoint.EXPORT_MARKET_LIVE,
        Region[region],
        {
          params: {
            items: itemId,
          },
        },
      );
    }
    console.log("Interact: itemId", itemId);
    const {
      data: [item],
    } = await interactionAction({
      params:{region},
      query:{
        items: itemId
      }
    });

    return {
      type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
      data: {
        embeds: [
          {
            description: `**${item.name}**`,
            color: 12691833,
            fields: [
              {
                name: 'Recent Price',
                value: `${item.recentPrice} <:gold:976615153485352960>`,
                inline: true,
              },
              {
                name: 'Lowest Price',
                value: `${item.lowPrice} <:gold:976615153485352960>`,
                inline: true,
              },
              {
                name: 'Cheapest Rem.',
                value: item.cheapestRemaining,
                inline: true,
              },
              {
                name: 'Region',
                value: Region[region],
                inline: true,
              },
              {
                name: 'Last update',
                value: moment
                  .duration(moment(item.updatedAt).diff(moment()))
                  .humanize(true),
                inline: true,
              },
            ],
            author: {
              name: 'LostarkMarket.Online',
              icon_url:
                'https://www.lostarkmarket.online/assets/icons/favicon.png',
            },
            thumbnail: {
              url: item.image,
            },
          },
        ],
      },
    };
  } catch (e) {
    console.error('Exception occured', e);
  }
};

export const setup = async (command: ICommand): Promise<void> => {
  log.debug('Installing command', command);
  /**
   * @TODO: Refactor the command registration to a sole responsibility helper
   */
  const endpoint = ['applications', APP_ID, 'commands'].join('/');
  const response = await DiscordRequest(endpoint, {
    method: 'POST',
    data: command,
  });
  log.debug('Discord commands API response', response.data);
};
