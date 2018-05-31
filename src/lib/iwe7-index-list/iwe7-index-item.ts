import { Directive } from '@angular/core';

@Directive({
    selector: '[iwe7IndexItem]', host: {
        '[class.index-list-item]': 'true'
    }
})
export class Iwe7IndexItemDirective {
    constructor() { }
}
