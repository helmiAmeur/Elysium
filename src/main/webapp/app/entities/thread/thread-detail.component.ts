import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IThread } from 'app/shared/model/thread.model';

@Component({
  selector: 'jhi-thread-detail',
  templateUrl: './thread-detail.component.html',
})
export class ThreadDetailComponent implements OnInit {
  thread: IThread | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ thread }) => (this.thread = thread));
  }

  previousState(): void {
    window.history.back();
  }
}
