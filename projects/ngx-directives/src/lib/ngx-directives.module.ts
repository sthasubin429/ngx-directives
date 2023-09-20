import { NgModule } from '@angular/core';
import { UnlessDirective } from './unless/unless.directive';
import { HighlightDirective } from './highlight/highlight.directive';
import { TooltipDirective } from './tooltip/tooltip.directive';

@NgModule({
  declarations: [UnlessDirective, HighlightDirective, TooltipDirective],
  imports: [],
  exports: [UnlessDirective, HighlightDirective, TooltipDirective],
})
export class NgxDirectivesModule {}
