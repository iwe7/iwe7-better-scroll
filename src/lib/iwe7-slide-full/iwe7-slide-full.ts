import { ElementRef, ViewEncapsulation, Input } from '@angular/core';

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'iwe7-slide-full',
    templateUrl: 'iwe7-slide-full.html',
    styleUrls: ['iwe7-slide-full.scss'],
    encapsulation: ViewEncapsulation.None
})
export class Iwe7SlideFullComponent implements OnInit {
    @Input() data: any[] = [];
    constructor(
        public ele: ElementRef
    ) { }

    ngOnInit() {

    }
}
