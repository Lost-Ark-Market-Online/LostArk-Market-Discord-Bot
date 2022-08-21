import { commands } from '@app/commands';

commands.forEach(({ setup, command }) => setup(command));
