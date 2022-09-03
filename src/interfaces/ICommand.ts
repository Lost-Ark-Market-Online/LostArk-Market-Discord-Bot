import { CommandOptionType } from '../enums/CommandOptionType';
import { ICommandChoice } from '../interfaces/ICommandChoice';

export interface ICommand {
  name: string;
  description?: string;
  required?: boolean;
  autocomplete?: boolean;
  focused?: boolean;
  value?: string;
  type?: CommandOptionType;
  options?: ICommand[];
  choices?: ICommandChoice[];
}
