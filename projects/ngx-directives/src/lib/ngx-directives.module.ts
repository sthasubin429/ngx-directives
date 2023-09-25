import { NgModule } from '@angular/core';
import { UnlessDirective } from './unless/unless.directive';
import { HighlightDirective } from './highlight/highlight.directive';
import { TooltipDirective } from './tooltip/tooltip.directive';
import { DeviceDirective } from './device/device.directive';
import { ConfirmDialogDirective } from './confirm-dialog/confirm-dialog.directive';

@NgModule({
  declarations: [UnlessDirective, HighlightDirective, TooltipDirective, DeviceDirective, ConfirmDialogDirective],
  imports: [],
  exports: [UnlessDirective, HighlightDirective, TooltipDirective, DeviceDirective, ConfirmDialogDirective],
})
export class NgxDirectivesModule {}
