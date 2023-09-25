import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[ngxTooltip]',
})
export class TooltipDirective {
  @Input() ngxTooltip: string = '';
  @Input() tooltipPosition: 'top' | 'bottom' | 'left' | 'right' = 'bottom';

  private tooltipElement: HTMLElement = document.createElement('div');
  private pseudoElement: HTMLElement = document.createElement('div');

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.createTooltipElement();
    this.renderer.appendChild(this.el.nativeElement, this.tooltipElement);
    this.showTooltip();
    this.positionTooltip();
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.hideTooltip();
  }

  private showTooltip(): void {
    this.renderer.setStyle(this.tooltipElement, 'display', 'block');
  }

  private hideTooltip(): void {
    this.renderer.setStyle(this.tooltipElement, 'display', 'none');
  }

  private createTooltipElement(): void {
    this.tooltipElement.textContent = this.ngxTooltip;
    this.tooltipElement.style.position = 'fixed';
    this.tooltipElement.style.backgroundColor = 'black';
    this.tooltipElement.style.borderRadius = '4px';
    this.tooltipElement.style.color = '#ffffff';
    this.tooltipElement.style.fontFamily = 'Arial';
    this.tooltipElement.style.padding = '3px 6px';
    this.tooltipElement.style.fontSize = '13px';
    this.tooltipElement.style.marginTop = '5px';
    this.tooltipElement.style.zIndex = '9999';
    this.tooltipElement.classList.add('tooltip');

    this.pseudoElement.style.content = "''";
    this.pseudoElement.style.width = '0';
    this.pseudoElement.style.height = '0';
    this.pseudoElement.style.borderLeft = '5px solid transparent';
    this.pseudoElement.style.borderRight = '5px solid transparent';
    this.pseudoElement.style.borderBottom = '5px solid black';
    this.pseudoElement.style.position = 'absolute';

    this.tooltipElement.appendChild(this.pseudoElement);
  }

  private positionTooltip(): void {
    const hostRect: DOMRect = this.el.nativeElement.getBoundingClientRect();
    const tooltipRect: DOMRect = this.tooltipElement.getBoundingClientRect();
    switch (this.tooltipPosition) {
      case 'top':
        this.renderer.setStyle(this.tooltipElement, 'top', `${hostRect.top - tooltipRect.height}px`);
        this.renderer.setStyle(this.tooltipElement, 'left', `${hostRect.left}px`);
        this.pseudoElement.style.left = 'calc(50% - 5px)';
        this.pseudoElement.style.bottom = '-5px';
        this.pseudoElement.style.transform = 'rotate(180deg)';
        break;
      case 'bottom':
        this.renderer.setStyle(this.tooltipElement, 'top', `${hostRect.bottom}px`);
        this.renderer.setStyle(this.tooltipElement, 'left', `${hostRect.left}px`);
        this.pseudoElement.style.left = 'calc(50% - 5px)';
        this.pseudoElement.style.top = '-5px';
        break;
      case 'left':
        this.renderer.setStyle(this.tooltipElement, 'top', `${hostRect.top}px`);
        this.renderer.setStyle(this.tooltipElement, 'left', `${hostRect.left - tooltipRect.width}px`);
        this.pseudoElement.style.left = 'calc(50% - 5px)';
        this.pseudoElement.style.top = '-5px';
        break;
      case 'right':
        this.renderer.setStyle(this.tooltipElement, 'top', `${hostRect.top}px`);
        this.renderer.setStyle(this.tooltipElement, 'left', `${hostRect.right}px`);
        this.pseudoElement.style.left = 'calc(50% - 5px)';
        this.pseudoElement.style.top = '-5px';
        break;
    }
  }
}
