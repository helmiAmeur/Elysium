import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IThread, Thread } from 'app/shared/model/thread.model';
import { ThreadService } from './thread.service';
import { ThreadComponent } from './thread.component';
import { ThreadDetailComponent } from './thread-detail.component';
import { ThreadUpdateComponent } from './thread-update.component';

@Injectable({ providedIn: 'root' })
export class ThreadResolve implements Resolve<IThread> {
  constructor(private service: ThreadService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IThread> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((thread: HttpResponse<Thread>) => {
          if (thread.body) {
            return of(thread.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Thread());
  }
}

export const threadRoute: Routes = [
  {
    path: '',
    component: ThreadComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Threads',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ThreadDetailComponent,
    resolve: {
      thread: ThreadResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Threads',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ThreadUpdateComponent,
    resolve: {
      thread: ThreadResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Threads',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ThreadUpdateComponent,
    resolve: {
      thread: ThreadResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Threads',
    },
    canActivate: [UserRouteAccessService],
  },
];
