import { CommonModule } from '@angular/common';
import { Iwe7SlideComponent } from './iwe7-slide/iwe7-slide';


import { BetterScrollDirective } from './better-scroll';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule],
  declarations: [BetterScrollDirective, Iwe7SlideComponent],
  exports: [BetterScrollDirective, Iwe7SlideComponent]
})
export class Iwe7BetterScrollModule { }
