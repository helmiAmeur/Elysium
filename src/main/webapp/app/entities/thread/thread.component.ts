import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IThread } from 'app/shared/model/thread.model';
import { ThreadService } from './thread.service';
import { ThreadDeleteDialogComponent } from './thread-delete-dialog.component';

@Component({
  selector: 'jhi-thread',
  templateUrl: './thread.component.html',
})
export class ThreadComponent implements OnInit, OnDestroy {
  threads?: IThread[];
  eventSubscriber?: Subscription;

  constructor(protected threadService: ThreadService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.threadService.query().subscribe((res: HttpResponse<IThread[]>) => (this.threads = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInThreads();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IThread): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInThreads(): void {
    this.eventSubscriber = this.eventManager.subscribe('threadListModification', () => this.loadAll());
  }

  delete(thread: IThread): void {
    const modalRef = this.modalService.open(ThreadDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.thread = thread;
  }
}
