import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { IMessage } from 'app/shared/model/message.model';
import { IBoard } from 'app/shared/model/board.model';

export interface IThread {
  id?: number;
  title?: string;
  description?: string;
  creationDate?: Moment;
  user?: IUser;
  messages?: IMessage[];
  board?: IBoard;
}

export class Thread implements IThread {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string,
    public creationDate?: Moment,
    public user?: IUser,
    public messages?: IMessage[],
    public board?: IBoard
  ) {}
}
