import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IMessage, Message } from 'app/shared/model/message.model';
import { MessageService } from './message.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';
import { IThread } from 'app/shared/model/thread.model';
import { ThreadService } from 'app/entities/thread/thread.service';

type SelectableEntity = IUser | IThread | IMessage;

@Component({
  selector: 'jhi-message-update',
  templateUrl: './message-update.component.html',
})
export class MessageUpdateComponent implements OnInit {
  isSaving = false;
  users: IUser[] = [];
  threads: IThread[] = [];
  messages: IMessage[] = [];
  creationDateDp: any;

  editForm = this.fb.group({
    id: [],
    description: [null, [Validators.required]],
    creationDate: [null, [Validators.required]],
    level: [],
    user: [null, Validators.required],
    thread: [null, Validators.required],
    messageParent: [],
  });

  constructor(
    protected messageService: MessageService,
    protected userService: UserService,
    protected threadService: ThreadService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ message }) => {
      this.updateForm(message);

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));

      this.threadService.query().subscribe((res: HttpResponse<IThread[]>) => (this.threads = res.body || []));

      this.messageService.query().subscribe((res: HttpResponse<IMessage[]>) => (this.messages = res.body || []));
    });
  }

  updateForm(message: IMessage): void {
    this.editForm.patchValue({
      id: message.id,
      description: message.description,
      creationDate: message.creationDate,
      level: message.level,
      user: message.user,
      thread: message.thread,
      messageParent: message.messageParent,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const message = this.createFromForm();
    if (message.id !== undefined) {
      this.subscribeToSaveResponse(this.messageService.update(message));
    } else {
      this.subscribeToSaveResponse(this.messageService.create(message));
    }
  }

  private createFromForm(): IMessage {
    return {
      ...new Message(),
      id: this.editForm.get(['id'])!.value,
      description: this.editForm.get(['description'])!.value,
      creationDate: this.editForm.get(['creationDate'])!.value,
      level: this.editForm.get(['level'])!.value,
      user: this.editForm.get(['user'])!.value,
      thread: this.editForm.get(['thread'])!.value,
      messageParent: this.editForm.get(['messageParent'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMessage>>): void {
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
