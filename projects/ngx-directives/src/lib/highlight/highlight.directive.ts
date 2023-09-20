import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

/**
 * Directive to highlight an element by changing its background color.
 */
@Directive({
  selector: '[ngxHighlight]',
})
export class HighlightDirective {
  /**
   * Constructor of the HighlightDirective class.
   * @param el - The element on which the directive is applied.
   * @param renderer - The renderer used to manipulate elements.
   */
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  /**
   * Setter for the ngxHighlight input property.
   * Sets the background color of the element to the specified color.
   * @param color - The color to be used for highlighting.
   */
  @Input() set ngxHighlight(color: string) {
    this.renderer.setStyle(this.el.nativeElement, 'background-color', color);
  }
}
