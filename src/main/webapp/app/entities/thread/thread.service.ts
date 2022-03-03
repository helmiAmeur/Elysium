import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IThread } from 'app/shared/model/thread.model';

type EntityResponseType = HttpResponse<IThread>;
type EntityArrayResponseType = HttpResponse<IThread[]>;

@Injectable({ providedIn: 'root' })
export class ThreadService {
  public resourceUrl = SERVER_API_URL + 'api/threads';

  constructor(protected http: HttpClient) {}

  create(thread: IThread): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(thread);
    return this.http
      .post<IThread>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(thread: IThread): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(thread);
    return this.http
      .put<IThread>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IThread>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IThread[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(thread: IThread): IThread {
    const copy: IThread = Object.assign({}, thread, {
      creationDate: thread.creationDate && thread.creationDate.isValid() ? thread.creationDate.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.creationDate = res.body.creationDate ? moment(res.body.creationDate) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((thread: IThread) => {
        thread.creationDate = thread.creationDate ? moment(thread.creationDate) : undefined;
      });
    }
    return res;
  }
}
