import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ElysiumSharedModule } from 'app/shared/shared.module';
import { BoardComponent } from './board.component';
import { BoardDetailComponent } from './board-detail.component';
import { BoardUpdateComponent } from './board-update.component';
import { BoardDeleteDialogComponent } from './board-delete-dialog.component';
import { boardRoute } from './board.route';

@NgModule({
  imports: [ElysiumSharedModule, RouterModule.forChild(boardRoute)],
  declarations: [BoardComponent, BoardDetailComponent, BoardUpdateComponent, BoardDeleteDialogComponent],
  entryComponents: [BoardDeleteDialogComponent],
})
export class ElysiumBoardModule {}
