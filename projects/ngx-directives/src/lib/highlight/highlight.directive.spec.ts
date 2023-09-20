import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HighlightDirective } from './highlight.directive';

@Component({
  template: ` <p [ngxHighlight]="highlightColor">Highlight me!</p> `,
})
class TestComponent {
  highlightColor: string | undefined;
}

describe('HighlightDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let directiveElement: DebugElement;

  const rgb2hex = (rgb: any): string =>
    `#${rgb
      .match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/)
      .slice(1)
      .map((n: string) => parseInt(n, 10).toString(16).padStart(2, '0'))
      .join('')}`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HighlightDirective, TestComponent],
    });
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    directiveElement = fixture.debugElement.query(By.directive(HighlightDirective));
  });

  it('should create an instance', () => {
    expect(directiveElement).toBeTruthy();
  });

  it('should apply the specified background color', () => {
    const highlightColor = '#ff0000'; // Red color
    component.highlightColor = highlightColor;
    fixture.detectChanges();

    const pElement = directiveElement.nativeElement;
    const backgroundColor = rgb2hex(getComputedStyle(pElement).getPropertyValue('background-color'));

    expect(backgroundColor).toBe(highlightColor);
  });

  it('should not apply background color if color is not provided', () => {
    component.highlightColor = undefined;
    fixture.detectChanges();

    const pElement = directiveElement.nativeElement;
    const backgroundColor = rgb2hex(getComputedStyle(pElement).getPropertyValue('background-color'));

    expect(backgroundColor).toBe('#ffff00');
  });
});
