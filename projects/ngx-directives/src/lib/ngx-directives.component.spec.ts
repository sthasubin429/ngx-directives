import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDirectivesComponent } from './ngx-directives.component';

describe('NgxDirectivesComponent', () => {
  let component: NgxDirectivesComponent;
  let fixture: ComponentFixture<NgxDirectivesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NgxDirectivesComponent]
    });
    fixture = TestBed.createComponent(NgxDirectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
