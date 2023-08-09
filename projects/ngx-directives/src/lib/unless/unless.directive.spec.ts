import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { UnlessDirective } from './unless.directive';

@Component({
  template: `
    <ng-container *ngxUnless="condition">
      <div>UnlessDirective</div>
    </ng-container>
  `,
})
class TestComponent {
  condition = false;
}
describe('UnlessDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, UnlessDirective],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the template when condition is false', () => {
    expect(fixture.nativeElement.innerHTML).toContain('UnlessDirective');
  });

  it('should not display the template when condition is true', () => {
    component.condition = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.innerHTML).not.toContain('UnlessDirective');
  });
});
