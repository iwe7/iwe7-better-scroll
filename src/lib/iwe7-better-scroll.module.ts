import { Iwe7SlideFullComponent } from './iwe7-slide-full/iwe7-slide-full';
import { CommonModule } from '@angular/common';
import { Iwe7SlideComponent } from './iwe7-slide/iwe7-slide';
import { BetterScrollDirective } from './better-scroll';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [CommonModule],
  declarations: [BetterScrollDirective, Iwe7SlideComponent, Iwe7SlideFullComponent],
  exports: [BetterScrollDirective, Iwe7SlideComponent, Iwe7SlideFullComponent]
})
export class Iwe7BetterScrollModule { }
