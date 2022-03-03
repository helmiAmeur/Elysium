import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IThread, Thread } from 'app/shared/model/thread.model';
import { ThreadService } from './thread.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IBoard } from 'app/shared/model/board.model';
import { BoardService } from 'app/entities/board/board.service';

type SelectableEntity = IUser | IBoard;

@Component({
  selector: 'jhi-thread-update',
  templateUrl: './thread-update.component.html',
})
export class ThreadUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  boards: IBoard[] = [];
  creationDateDp: any;

  editForm = this.fb.group({
    id: [],
    title: [null, [Validators.required]],
    description: [null, [Validators.required]],
    creationDate: [null, [Validators.required]],
    user: [null, Validators.required],
    board: [null, Validators.required],
  });

  constructor(
    protected threadService: ThreadService,
    protected userService: UserService,
    protected boardService: BoardService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ thread }) => {
      this.updateForm(thread);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.boardService.query().subscribe((res: HttpResponse<IBoard[]>) => (this.boards = res.body || []));
    });
  }

  updateForm(thread: IThread): void {
    this.editForm.patchValue({
      id: thread.id,
      title: thread.title,
      description: thread.description,
      creationDate: thread.creationDate,
      user: thread.user,
      board: thread.board,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const thread = this.createFromForm();
    if (thread.id !== undefined) {
      this.subscribeToSaveResponse(this.threadService.update(thread));
    } else {
      this.subscribeToSaveResponse(this.threadService.create(thread));
    }
  }

  private createFromForm(): IThread {
    return {
      ...new Thread(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      description: this.editForm.get(['description'])!.value,
      creationDate: this.editForm.get(['creationDate'])!.value,
      user: this.editForm.get(['user'])!.value,
      board: this.editForm.get(['board'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IThread>>): void {
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
