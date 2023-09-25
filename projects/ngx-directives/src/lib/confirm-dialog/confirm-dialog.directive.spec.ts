import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { ConfirmDialogDirective } from './confirm-dialog.directive';
import { By } from '@angular/platform-browser';

@Component({
  template: ` <button ngxConfirmDialog (ngxConfirmClick)="onConfirmClick($event)">Click Me</button> `,
})
class TestComponent {
  onConfirmClick(event: Event) {
    // Handle the click event.
  }
}

describe('ConfirmDialogDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let buttonEl: DebugElement;
  let directive: ConfirmDialogDirective;
  let dialogElement: HTMLElement | null;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, ConfirmDialogDirective],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    buttonEl = fixture.debugElement.query(By.directive(ConfirmDialogDirective));
    directive = buttonEl.injector.get(ConfirmDialogDirective);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should display the confirmation dialog on button click', () => {
    spyOn(component, 'onConfirmClick');
    buttonEl.nativeElement.click();
    fixture.detectChanges();

    dialogElement = document.querySelector('.confirmation-dialog');
    expect(dialogElement).toBeTruthy();
  });

  it('should hide the confirmation dialog on "Cancel" button click', () => {
    buttonEl.nativeElement.click();
    fixture.detectChanges();

    dialogElement = document.querySelector('.confirmation-dialog');
    expect(dialogElement).toBeTruthy();

    const cancelButton: HTMLButtonElement | null | undefined = dialogElement?.querySelector('button:last-child');
    cancelButton?.click();
    fixture.detectChanges();

    expect(dialogElement?.style.display).toBe('none');
  });

  it('should emit ngxConfirmClick event on "OK" button click', () => {
    spyOn(component, 'onConfirmClick');
    buttonEl.nativeElement.click();
    fixture.detectChanges();

    dialogElement = document.querySelector('.confirmation-dialog');
    expect(dialogElement).toBeTruthy();

    const okButton: HTMLButtonElement | null | undefined = dialogElement?.querySelector('.ok-button');
    okButton?.click();
    fixture.detectChanges();

    expect(component.onConfirmClick).toHaveBeenCalled();

    // Check if ngxConfirmClick event was emitted
    directive.ngxConfirmClick.subscribe((event) => {
      expect(event).toBeTruthy();
    });
  });

  it('should not display the confirmation dialog initially', () => {
    dialogElement = document.querySelector('.confirmation-dialog');
    expect(dialogElement).toBeFalsy();
  });
});
