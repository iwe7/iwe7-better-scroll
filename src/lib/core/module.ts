import { BetterScrollEventManagerPluginProvider } from './better-scroll.event';
import { BetterScrollDirective } from './better-scroll.component';

import { NgModule } from '@angular/core';


@NgModule({
    imports: [],
    exports: [
        BetterScrollDirective
    ],
    declarations: [
        BetterScrollDirective
    ],
    providers: [
        BetterScrollEventManagerPluginProvider
    ],
})
export class BetterCoreModule { }
