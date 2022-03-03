import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IBoard, Board } from 'app/shared/model/board.model';
import { BoardService } from './board.service';
import { ITopic } from 'app/shared/model/topic.model';
import { TopicService } from 'app/entities/topic/topic.service';

@Component({
  selector: 'jhi-board-update',
  templateUrl: './board-update.component.html',
})
export class BoardUpdateComponent implements OnInit {
  isSaving = false;
  topics: ITopic[] = [];
  creationDateDp: any;

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    description: [],
    creationDate: [null, [Validators.required]],
    topic: [null, Validators.required],
  });

  constructor(
    protected boardService: BoardService,
    protected topicService: TopicService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ board }) => {
      this.updateForm(board);

      this.topicService
        .query({ filter: 'board-is-null' })
        .pipe(
          map((res: HttpResponse<ITopic[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: ITopic[]) => {
          if (!board.topic || !board.topic.id) {
            this.topics = resBody;
          } else {
            this.topicService
              .find(board.topic.id)
              .pipe(
                map((subRes: HttpResponse<ITopic>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: ITopic[]) => (this.topics = concatRes));
          }
        });
    });
  }

  updateForm(board: IBoard): void {
    this.editForm.patchValue({
      id: board.id,
      title: board.title,
      description: board.description,
      creationDate: board.creationDate,
      topic: board.topic,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const board = this.createFromForm();
    if (board.id !== undefined) {
      this.subscribeToSaveResponse(this.boardService.update(board));
    } else {
      this.subscribeToSaveResponse(this.boardService.create(board));
    }
  }

  private createFromForm(): IBoard {
    return {
      ...new Board(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      description: this.editForm.get(['description'])!.value,
      creationDate: this.editForm.get(['creationDate'])!.value,
      topic: this.editForm.get(['topic'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBoard>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ITopic): any {
    return item.id;
  }
}
