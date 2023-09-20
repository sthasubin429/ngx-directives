import { NgModule } from '@angular/core';
import { UnlessDirective } from './unless/unless.directive';
import { HighlightDirective } from './highlight/highlight.directive';
import { TooltipDirective } from './tooltip/tooltip.directive';
import { DeviceDirective } from './device/device.directive';

@NgModule({
  declarations: [UnlessDirective, HighlightDirective, TooltipDirective, DeviceDirective],
  imports: [],
  exports: [UnlessDirective, HighlightDirective, TooltipDirective, DeviceDirective],
})
export class NgxDirectivesModule {}
