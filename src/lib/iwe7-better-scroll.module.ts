import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
export const BetterScrollComponents = [];
export const BetterScrollDirectives = [];
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

