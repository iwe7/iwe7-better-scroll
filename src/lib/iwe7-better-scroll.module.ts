import { Iwe7IndexListComponent } from './iwe7-index-list/iwe7-index-list';
import { Iwe7SlideFullComponent } from './iwe7-slide-full/iwe7-slide-full';
import { Iwe7SlideComponent } from './iwe7-slide/iwe7-slide';
import { BetterScrollDirective } from './better-scroll';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Iwe7IndexAnchorDirective } from './iwe7-index-list/iwe7-index-anchor';
import { Iwe7IndexItemDirective } from './iwe7-index-list/iwe7-index-item';

export const BetterScrollComponents = [
  Iwe7SlideComponent,
  Iwe7SlideFullComponent,
  Iwe7IndexListComponent,
];

export const BetterScrollDirectives = [
  BetterScrollDirective,
  Iwe7IndexAnchorDirective,
  Iwe7IndexItemDirective
];

@NgModule({
  imports: [CommonModule],
  declarations: [
    ...BetterScrollComponents,
    ...BetterScrollDirectives
  ],
  exports: [
    ...BetterScrollComponents,
    ...BetterScrollDirectives
  ]
})
export class Iwe7BetterScrollModule { }

export { Iwe7SlideFullComponent } from './iwe7-slide-full/iwe7-slide-full';
export { Iwe7SlideComponent } from './iwe7-slide/iwe7-slide';
export { Iwe7IndexListComponent } from './iwe7-index-list/iwe7-index-list';

export { BetterScrollDirective } from './better-scroll';
export { Iwe7IndexAnchorDirective } from './iwe7-index-list/iwe7-index-anchor';
export { Iwe7IndexItemDirective } from './iwe7-index-list/iwe7-index-item';
