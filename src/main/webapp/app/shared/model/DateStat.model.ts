import {Moment} from "moment";

export interface IdateStat {
    id?: number;
    creationDate?: Moment;
    number?: number;
}

export class DateStat implements IdateStat {
    constructor(
        public id?: number,
        public creationDate?: Moment,
        public number?: number,
    ) {}
}
