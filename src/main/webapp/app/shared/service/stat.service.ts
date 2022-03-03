import { Injectable } from '@angular/core';
import {SERVER_API_URL} from "../../app.constants";
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUserStat} from "../model/userStat.model";
import {createRequestOption} from "app/shared/util/request-util";
import {IdateStat} from "app/shared/model/DateStat.model";


export interface StatQuery  {
  limit: string;
}

@Injectable({
  providedIn: 'root'
})
export class StatService {
  public userResourceUrl = SERVER_API_URL + 'api/user-stats-limit';
  public dateResourceUrl = SERVER_API_URL + 'api/date-stats-limit';
  constructor(protected http: HttpClient) { }

  getUserStat(req: StatQuery): Observable<HttpResponse<IUserStat[]>> {
    const params: HttpParams = createRequestOption(req);

    const requestURL = this.userResourceUrl ;

    return this.http.get<IUserStat[]>(requestURL, {
      params,
      observe: 'response',
    });
  }

  getDateStat(req: StatQuery): Observable<HttpResponse<IdateStat[]>> {
    const params: HttpParams = createRequestOption(req);

    const requestURL = this.dateResourceUrl ;

    return this.http.get<IdateStat[]>(requestURL, {
      params,
      observe: 'response',
    });
  }

}
