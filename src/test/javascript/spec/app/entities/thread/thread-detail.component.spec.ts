import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ElysiumTestModule } from '../../../test.module';
import { ThreadDetailComponent } from 'app/entities/thread/thread-detail.component';
import { Thread } from 'app/shared/model/thread.model';

describe('Component Tests', () => {
  describe('Thread Management Detail Component', () => {
    let comp: ThreadDetailComponent;
    let fixture: ComponentFixture<ThreadDetailComponent>;
    const route = ({ data: of({ thread: new Thread(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ElysiumTestModule],
        declarations: [ThreadDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(ThreadDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ThreadDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load thread on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.thread).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
