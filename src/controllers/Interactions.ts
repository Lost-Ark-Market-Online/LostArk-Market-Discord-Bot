import { commands } from '@app/commands';
import { Request, Response } from 'express';
import { ValidateRequest } from '@app/utils/ValidateRequest';
import { log } from '@app/utils/Logger';
import { InteractionResponseType, InteractionType } from 'discord-interactions';
import { IDiscordInteraction } from '@app/interfaces/IDiscordInteraction';
import DiscordInteraction from '@app/classes/DiscordInteraction';
import { CommandOptionType } from '@app/enums/CommandOptionType';

export default async function (
  req: Request<any, any, IDiscordInteraction>,
  res: Response,
) {
  const isValidRequest = ValidateRequest(req);

  if (!isValidRequest) {
    return res.status(422).send();
  }

  // If the request originates from Discord, then we try to find the command
  const body = req.body;
  const interaction = new DiscordInteraction(body.id, body.type, body.data);
  const { type, data } = interaction;

  switch (type) {
    case InteractionType.PING:
      return res.send({ type: InteractionResponseType.PONG });
    case InteractionType.APPLICATION_COMMAND: {
      const { name } = data;
      if (!commands.has(name)) {
        return res.status(500).send('Command not found');
      }

      const { interact } = commands.get(name);
      const interactionResponse = await interact(interaction);
      return res.send(interactionResponse);
    }
    case InteractionType.APPLICATION_COMMAND_AUTOCOMPLETE: {
      const { name } = data;
      if (!commands.has(name)) {
        return res.status(500).send('Command not found');
      }
      const { autocomplete } = commands.get(name);
      const interactionResponse = await autocomplete(interaction);
      return res.send(interactionResponse);
    }
    default:
      console.log('Unknown interaction', type, data);
      return res.status(400).send('Unknown action');
  }
}
