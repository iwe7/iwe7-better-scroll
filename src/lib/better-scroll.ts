import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { ElementRef, AfterViewInit, EventEmitter, Input, Output } from '@angular/core';
import { Directive } from '@angular/core';
import { BScroll } from './lib';

@Directive({ selector: '[betterScroll]', exportAs: 'betterScroll' })
export class BetterScrollDirective implements AfterViewInit {
    @Output() betterScroll: EventEmitter<any> = new EventEmitter();
    @Input() options: any = {};

    private _scroll: any;
    constructor(public ele: ElementRef) { }

    ngAfterViewInit() {
        setTimeout(() => {
            this._scroll = new BScroll(this.ele.nativeElement, this.options);
            this.betterScroll.emit(this._scroll);
        }, 0);
    }

    pullingDown(): Observable<Function> {
        return Observable.create((observer) => {
            this._scroll.on('pullingDown', () => {
                observer.next(this._scroll.finishPullDown);
            });
        });
    }

    pullUpLoad(): Observable<Function> {
        return Observable.create((observer) => {
            this._scroll.on('pullingUp', () => {
                observer.next(this._scroll.finishPullUp);
            });
        });
    }

    scrollEnd(): Observable<any> {
        return Observable.create((observer) => {
            this._scroll.on('pullingUp', () => {
                observer.next(this._scroll);
            });
        });
    }

    scroll(): Observable<any> {
        return Observable.create((observer) => {
            this._scroll.on('scroll', () => {
                observer.next(this._scroll);
            });
        });
    }
}
