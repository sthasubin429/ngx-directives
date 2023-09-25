import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

interface IBreakPoints {
  xs: number;
  sm: number;
  md: number;
  lg: number;
}

/***
 * This class represents an Angular directive called `DeviceDirective`
 * that allows for conditional rendering of content based on the screen size.
 * It listens for window resize events and checks the current screen size against predefined breakpoints
 * to determine whether to show or hide the content.
 *
 * Example Usage:
 * ```html
 * <div *ngxDevice="'md'">
 *   This content will only be shown on screens with a width of 992px or larger.
 * </div>
 * ```
 */
@Directive({
  selector: '[ngxDevice]',
})
export class DeviceDirective implements OnInit {
  private screenSize: keyof IBreakPoints = 'xs';
  private hasView: boolean = false;

  constructor(private templateRef: TemplateRef<unknown>, private viewContainer: ViewContainerRef) {}

  /**
   * Sets the screen size based on the input value and updates the visibility of the content.
   * @param screenSize The screen size to set.
   */
  @Input() set ngxDevice(screenSize: string) {
    this.screenSize = screenSize as keyof IBreakPoints;
    this.checkScreenSize();
  }

  /**
   * Initializes the directive by checking the screen size and attaching a resize event listener.
   */
  ngOnInit(): void {
    this.checkScreenSize();
    window.addEventListener('resize', () => {
      this.checkScreenSize();
    });
  }

  /**
   * Compares the current screen size with the specified breakpoint and updates the visibility of the content.
   */
  private checkScreenSize(): void {
    const breakpoints: IBreakPoints = {
      xs: 576,
      sm: 768,
      md: 992,
      lg: 1200,
    };

    const screenWidth: number = window.innerWidth;
    const breakpoint: number = breakpoints[this.screenSize];
    if (this.screenSize in breakpoints) {
      if (screenWidth >= breakpoint && !this.hasView) {
        this.showView();
      } else if (screenWidth < breakpoint && this.hasView) {
        this.viewContainer.clear();
        this.hasView = false;
      }
    } else {
      console.error(`Invalid screen size: ${this.screenSize}`);
      this.showView();
    }
  }

  /**
   * Renders the content if it is not already visible.
   */
  private showView(): void {
    if (!this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    }
  }
}
