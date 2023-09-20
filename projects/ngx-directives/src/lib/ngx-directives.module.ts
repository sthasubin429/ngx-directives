import { NgModule } from '@angular/core';
import { UnlessDirective } from './unless/unless.directive';
import { HighlightDirective } from './highlight/highlight.directive';

@NgModule({
  declarations: [UnlessDirective, HighlightDirective],
  imports: [],
  exports: [UnlessDirective, HighlightDirective],
})
export class NgxDirectivesModule {}
