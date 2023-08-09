import { TestBed } from '@angular/core/testing';

import { NgxDirectivesService } from './ngx-directives.service';

describe('NgxDirectivesService', () => {
  let service: NgxDirectivesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxDirectivesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
