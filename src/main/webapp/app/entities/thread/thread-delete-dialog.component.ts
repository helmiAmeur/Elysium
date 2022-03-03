import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IThread } from 'app/shared/model/thread.model';
import { ThreadService } from './thread.service';

@Component({
  templateUrl: './thread-delete-dialog.component.html',
})
export class ThreadDeleteDialogComponent {
  thread?: IThread;

  constructor(protected threadService: ThreadService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.threadService.delete(id).subscribe(() => {
      this.eventManager.broadcast('threadListModification');
      this.activeModal.close();
    });
  }
}
