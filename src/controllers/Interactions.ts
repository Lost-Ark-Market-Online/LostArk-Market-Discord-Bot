import { commands } from '@app/commands';
import { Request, Response } from 'express';
import { ValidateRequest } from '@app/utils/ValidateRequest';
import { InteractionResponseType, InteractionType } from 'discord-interactions';
import { IDiscordInteraction } from '@app/interfaces/IDiscordInteraction';
import DiscordInteraction from '@app/classes/DiscordInteraction';
import { ICommandModule } from '@app/interfaces';
import { Command, HttpStatusCode } from '@app/enums';
import { log } from '@app/utils/Logger';

export default async function (
  req: Request<any, any, IDiscordInteraction>,
  res: Response,
  overwrites?: Record<Command, Partial<ICommandModule>>,
) {
  const isValidRequest = ValidateRequest(req);

  if (!isValidRequest) {
    return res.status(HttpStatusCode.UNPROCESSABLE_ENTITY).send({
      code: HttpStatusCode.UNPROCESSABLE_ENTITY,
      message: 'Signature validation failed.',
      timestamp: Date.now(),
    });
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
        return res.status(HttpStatusCode.NOT_FOUND).send({
          code: HttpStatusCode.NOT_FOUND,
          message: `Command "${name}" not found.`,
          timestamp: Date.now(),
        });
      }

      const command = commands.get(name);
      if (overwrites[name]) {
        Object.assign(command, overwrites[name]);
      }

      const { interact } = command;
      const interactionResponse = await interact(interaction);
      return res.send(interactionResponse);
    }
    case InteractionType.APPLICATION_COMMAND_AUTOCOMPLETE: {
      const { name } = data;
      if (!commands.has(name)) {
        return res.status(HttpStatusCode.NOT_FOUND).send({
          code: HttpStatusCode.NOT_FOUND,
          message: `Command "${name}" not found.`,
          timestamp: Date.now(),
        });
      }
      const { autocomplete } = commands.get(name);
      const interactionResponse = await autocomplete(interaction);
      return res.send(interactionResponse);
    }
    default:
      log.error('Unhandled Discord interaction', body);
      return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).send({
        code: HttpStatusCode.INTERNAL_SERVER_ERROR,
        message: 'Unhandled Discord interaction',
        timestamp: Date.now(),
      });
  }
}
