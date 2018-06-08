import { BaseWithIcss } from 'iwe7-base';
import { Observable } from 'rxjs';
import { BetterManagerService } from './better-scroll.manager';
import { BetterScrollCore } from './core';
import { ElementRef, EventEmitter, Output, Injector, Input, Optional, SkipSelf } from '@angular/core';
import { Directive } from '@angular/core';
import { SlideOption, ScrollBarOption, PullUpOption, WheelOption } from 'better-scroll';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
@Directive({
    selector: '[betterScroll]',
    exportAs: 'betterScroll'
})
export class BetterScrollDirective extends BaseWithIcss {
    @Output() betterScroll: EventEmitter<any> = new EventEmitter();
    @Input() options: any = {
        click: false,
        pullDownRefresh: false,
        pullUpLoad: false,
        snap: false,
        scrollbar: false,
        wheel: false,
        bindToWrapper: true,
        preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ },
        preventDefault: true,
        probeType: 0,
        momentum: true,
        bounce: true,
        tap: false,
        eventPassthrough: '',
        freeScroll: false,
        scrollX: false,
        scrollY: true,
        startX: 0,
        startY: 0
    };
    @Input() set startY(val: any) {
        this.options.startY = coerceNumberProperty(val);
    }
    @Input() set startX(val: any) {
        this.options.startX = coerceNumberProperty(val);
    }

    @Input() set scrollX(val: any) {
        this.options.scrollX = coerceBooleanProperty(val);
    }

    @Input() set scrollY(val: any) {
        this.options.scrollY = coerceBooleanProperty(val);
    }

    @Input() set freeScroll(val: any) {
        this.options.freeScroll = coerceBooleanProperty(val);
    }

    @Input() set eventPassthrough(val: 'vertical' | 'horizontal') {
        this.options.eventPassthrough = val;
    }

    @Input() set click(val: any) {
        this.options.click = coerceBooleanProperty(val);
    }

    @Input() set tap(val: string) {
        this.options.tap = val;
    }

    @Input() set bounce(val: any) {
        this.options.bounce = coerceBooleanProperty(val);
    }

    @Input() set momentum(val: any) {
        this.options.momentum = coerceBooleanProperty(val);
    }

    @Input() set probeType(val: number) {
        this.options.probeType = coerceNumberProperty(val);
    }

    @Input() set preventDefault(val: any) {
        this.options.preventDefault = coerceBooleanProperty(val);
    }

    @Input() set preventDefaultException(val: any) {
        this.options.preventDefaultException = {
            ...{ tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ },
            ...val
        };
    }

    @Input() set bindToWrapper(val: any) {
        this.options.bindToWrapper = coerceBooleanProperty(val);
    }

    @Input() set wheel(val: WheelOption) {
        this.options.wheel = {
            ...{ selectedIndex: 0, rotate: 25, adjustTime: 400 },
            ...val
        };
    }

    @Input() set snap(val: SlideOption) {
        const snap = {
            ...{
                loop: true,
                threshold: 0.3,
                speed: 400,
                stepX: 100,
                stepY: 100
            },
            ...val
        };
        this.options.snap = snap;
    }

    @Input() set scrollbar(val: ScrollBarOption) {
        this.options.scrollbar = {
            ...{ fade: true },
            ...val
        };
    }

    @Input() set pullDownRefresh(val: PullUpOption) {
        this.options.pullDownRefresh = {
            ...{
                threshold: 50,
                stop: 50
            },
            ...val
        };
    }

    @Input() set pullUpLoad(val: any) {
        this.options.pullUpLoad = {
            ...{ threshold: 50 },
            ...val
        };
    }

    get scrollInstance(): Observable<any> {
        return this.getCyc('betterScrollInited');
    }

    _scroll: BetterScrollCore;
    constructor(
        public ele: ElementRef,
        injector: Injector,
        public betterManagerService: BetterManagerService
    ) {
        super(injector);
        this.runOutsideAngular(() => {
            this.getCyc('ngAfterViewInit').subscribe(res => {
                if (this.betterManagerService.has(this.ele.nativeElement)) {
                    this._scroll = this.betterManagerService.get(this.ele.nativeElement);
                    this._scroll.refresh();
                } else {
                    this._scroll.init(this.ele.nativeElement, this.options);
                    this.betterManagerService.register(this.ele.nativeElement, this._scroll);
                }
                this.betterScroll.emit(this);
                this.setCyc('betterScrollInited', this._scroll);
            });
        });
    }

    ngOnDestroy() {
        this.betterManagerService.deRegister(this.ele.nativeElement);
        super.ngOnDestroy();
    }
}
