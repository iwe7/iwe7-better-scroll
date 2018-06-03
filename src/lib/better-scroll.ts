import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { ElementRef, AfterViewInit, EventEmitter, Input, Output } from '@angular/core';
import { Directive } from '@angular/core';
import { BScroll } from './lib';
import { Iwe7CoreComponent } from 'iwe7-core';
@Directive({ selector: '[betterScroll]', exportAs: 'betterScroll' })
export class BetterScrollDirective extends Iwe7CoreComponent {
    @Output() betterScroll: EventEmitter<any> = new EventEmitter();
    options: any = {
        probeType: 2,
        click: true,
        preventDefault: true
    };
    _scroll: any;

    get scrollInstance() {
        return this.getCyc('betterScrollInited');
    }

    constructor(public ele: ElementRef) {
        super();
        this.getCyc('ngAfterViewInit').subscribe(res => {
            this._scroll = new BScroll(this.ele.nativeElement, this.options);
            this.betterScroll.emit(this._scroll);
            this.setCyc('betterScrollInited', this._scroll);
        });
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
