import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ElysiumSharedModule } from 'app/shared/shared.module';
import { ThreadComponent } from './thread.component';
import { ThreadDetailComponent } from './thread-detail.component';
import { ThreadUpdateComponent } from './thread-update.component';
import { ThreadDeleteDialogComponent } from './thread-delete-dialog.component';
import { threadRoute } from './thread.route';

@NgModule({
  imports: [ElysiumSharedModule, RouterModule.forChild(threadRoute)],
  declarations: [ThreadComponent, ThreadDetailComponent, ThreadUpdateComponent, ThreadDeleteDialogComponent],
  entryComponents: [ThreadDeleteDialogComponent],
})
export class ElysiumThreadModule {}
