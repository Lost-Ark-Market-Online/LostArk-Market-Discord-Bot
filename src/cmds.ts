import { commands } from './commands';

commands.forEach(({ setup, command }) => setup(command));
