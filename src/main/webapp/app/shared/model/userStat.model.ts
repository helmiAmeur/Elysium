
export interface IUserStat {
    id?: number;
    login?: string;
    number?: number;
}

export class UserStat implements IUserStat {
    constructor(
        public id?: number,
        public login?: string,
        public number?: number,
    ) {}
}
