import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IBoard } from 'app/shared/model/board.model';

type EntityResponseType = HttpResponse<IBoard>;
type EntityArrayResponseType = HttpResponse<IBoard[]>;

@Injectable({ providedIn: 'root' })
export class BoardService {
  public resourceUrl = SERVER_API_URL + 'api/boards';

  constructor(protected http: HttpClient) {}

  create(board: IBoard): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(board);
    return this.http
      .post<IBoard>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(board: IBoard): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(board);
    return this.http
      .put<IBoard>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IBoard>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IBoard[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(board: IBoard): IBoard {
    const copy: IBoard = Object.assign({}, board, {
      creationDate: board.creationDate && board.creationDate.isValid() ? board.creationDate.format(DATE_FORMAT) : undefined,
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
      res.body.forEach((board: IBoard) => {
        board.creationDate = board.creationDate ? moment(board.creationDate) : undefined;
      });
    }
    return res;
  }
}
