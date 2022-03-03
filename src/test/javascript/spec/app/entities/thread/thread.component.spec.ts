import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ElysiumTestModule } from '../../../test.module';
import { ThreadComponent } from 'app/entities/thread/thread.component';
import { ThreadService } from 'app/entities/thread/thread.service';
import { Thread } from 'app/shared/model/thread.model';

describe('Component Tests', () => {
  describe('Thread Management Component', () => {
    let comp: ThreadComponent;
    let fixture: ComponentFixture<ThreadComponent>;
    let service: ThreadService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ElysiumTestModule],
        declarations: [ThreadComponent],
      })
        .overrideTemplate(ThreadComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ThreadComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ThreadService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Thread(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.threads && comp.threads[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
