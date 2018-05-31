import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
    selector: '[iwe7IndexAnchor]', host: {
        '[class.index-list-anchor]': 'true'
    }
})
export class Iwe7IndexAnchorDirective {
    @Input('iwe7IndexAnchor') title: string;
    constructor(
        public ele: ElementRef
    ) { }

    get inner() {
        return this.ele.nativeElement.innerHTML;
    }

    get height() {
        return this.ele.nativeElement.clientHeight;
    }

    get top() {
        return this.ele.nativeElement.offsetTop;
    }
}
