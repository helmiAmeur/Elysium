import { Moment } from 'moment';
import { ITopic } from 'app/shared/model/topic.model';
import { IThread } from 'app/shared/model/thread.model';

export interface IBoard {
  id?: number;
  title?: string;
  description?: string;
  creationDate?: Moment;
  topic?: ITopic;
  threads?: IThread[];
}

export class Board implements IBoard {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string,
    public creationDate?: Moment,
    public topic?: ITopic,
    public threads?: IThread[]
  ) {}
}
