import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'topic',
        loadChildren: () => import('./topic/topic.module').then(m => m.ElysiumTopicModule),
      },
      {
        path: 'board',
        loadChildren: () => import('./board/board.module').then(m => m.ElysiumBoardModule),
      },
      {
        path: 'thread',
        loadChildren: () => import('./thread/thread.module').then(m => m.ElysiumThreadModule),
      },
      {
        path: 'message',
        loadChildren: () => import('./message/message.module').then(m => m.ElysiumMessageModule),
      },
    ]),
  ],
})
export class ElysiumEntityModule {}
