import { Moment } from 'moment';
import { IUser } from 'app/core/user/user.model';
import { IThread } from 'app/shared/model/thread.model';

export interface IMessage {
  id?: number;
  description?: string;
  creationDate?: Moment;
  level?: number;
  user?: IUser;
  thread?: IThread;
  messageParent?: IMessage;
}

export class Message implements IMessage {
  constructor(
    public id?: number,
    public description?: string,
    public creationDate?: Moment,
    public level?: number,
    public user?: IUser,
    public thread?: IThread,
    public messageParent?: IMessage
  ) {}
}
