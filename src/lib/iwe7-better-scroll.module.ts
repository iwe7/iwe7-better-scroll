import { Iwe7IndexListComponent } from './iwe7-index-list/iwe7-index-list';
import { Iwe7SlideFullComponent } from './iwe7-slide-full/iwe7-slide-full';
import { Iwe7SlideComponent } from './iwe7-slide/iwe7-slide';
import { BetterScrollDirective } from './better-scroll';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Iwe7IndexAnchorDirective } from './iwe7-index-list/iwe7-index-anchor';
import { Iwe7IndexItemDirective } from './iwe7-index-list/iwe7-index-item';


@NgModule({
  imports: [CommonModule],
  declarations: [BetterScrollDirective, Iwe7SlideComponent, Iwe7SlideFullComponent, Iwe7IndexListComponent, Iwe7IndexAnchorDirective, Iwe7IndexItemDirective],
  exports: [BetterScrollDirective, Iwe7SlideComponent, Iwe7SlideFullComponent, Iwe7IndexListComponent, Iwe7IndexAnchorDirective, Iwe7IndexItemDirective]
})
export class Iwe7BetterScrollModule { }

export { Iwe7SlideFullComponent } from './iwe7-slide-full/iwe7-slide-full';
export { Iwe7SlideComponent } from './iwe7-slide/iwe7-slide';
export { BetterScrollDirective } from './better-scroll';
export { Iwe7IndexListComponent } from './iwe7-index-list/iwe7-index-list';
export { Iwe7IndexAnchorDirective } from './iwe7-index-list/iwe7-index-anchor';
export { Iwe7IndexItemDirective } from './iwe7-index-list/iwe7-index-item';
