import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { TooltipDirective } from './tooltip.directive';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: '<div [ngxTooltip]="ngxTooltip" [tooltipPosition]="tooltipPosition"></div>',
})
class TestComponent {
  ngxTooltip = 'Test Tooltip';
  tooltipPosition = 'top';
}

describe('TooltipDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let tooltipDirective: TooltipDirective;
  let tooltipElement: HTMLElement;
  let hostElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, TooltipDirective],
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    hostElement = fixture.debugElement.query(By.directive(TooltipDirective));
    tooltipDirective = hostElement.injector.get(TooltipDirective);
    tooltipElement = tooltipDirective['tooltipElement']; // Access private property for testing
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(tooltipDirective).toBeTruthy();
  });

  it('should show tooltip on mouseenter', () => {
    hostElement.triggerEventHandler('mouseenter', null);
    fixture.detectChanges();
    expect(tooltipElement.style.display).toBe('block');
  });

  it('should hide tooltip on mouseleave', () => {
    hostElement.triggerEventHandler('mouseenter', null);
    fixture.detectChanges();
    hostElement.triggerEventHandler('mouseleave', null);
    fixture.detectChanges();
    expect(tooltipElement.style.display).toBe('none');
  });

  it('should position tooltip at the top', fakeAsync(() => {
    tooltipDirective.tooltipPosition = 'top';
    hostElement.triggerEventHandler('mouseenter', null);
    fixture.detectChanges();
    tick();
    const hostRect = hostElement.nativeElement.getBoundingClientRect();
    const tooltipRect = tooltipElement.getBoundingClientRect();
    expect(tooltipElement.style.top).toBe(`${hostRect.top - tooltipRect.height}px`);
    expect(tooltipElement.style.left).toBe(`${hostRect.left}px`);
  }));

  it('should position tooltip at the bottom', fakeAsync(() => {
    tooltipDirective.tooltipPosition = 'bottom';
    hostElement.triggerEventHandler('mouseenter', null);
    fixture.detectChanges();
    tick();
    const hostRect = hostElement.nativeElement.getBoundingClientRect();
    expect(tooltipElement.style.top).toBe(`${hostRect.bottom}px`);
    expect(tooltipElement.style.left).toBe(`${hostRect.left}px`);
  }));

  it('should position tooltip at the left', fakeAsync(() => {
    tooltipDirective.tooltipPosition = 'left';
    hostElement.triggerEventHandler('mouseenter', null);
    fixture.detectChanges();
    tick();
    const hostRect = hostElement.nativeElement.getBoundingClientRect();
    const tooltipRect = tooltipElement.getBoundingClientRect();
    expect(tooltipElement.style.top).toBe(`${hostRect.top}px`);
    expect(tooltipElement.style.left).toBe(`${(hostRect.left - tooltipRect.width).toFixed(4)}px`);
  }));

  it('should position tooltip at the right', fakeAsync(() => {
    tooltipDirective.tooltipPosition = 'right';
    hostElement.triggerEventHandler('mouseenter', null);
    fixture.detectChanges();
    tick();
    const hostRect = hostElement.nativeElement.getBoundingClientRect();
    const tooltipRect = tooltipElement.getBoundingClientRect();
    expect(tooltipElement.style.top).toBe(`${hostRect.top}px`);
    expect(tooltipElement.style.left).toBe(`${hostRect.right}px`);
  }));
});
