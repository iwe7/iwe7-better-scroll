import { BaseWithIcss } from 'iwe7-base';
import { Observable } from 'rxjs';
import { BetterManagerService } from './better-scroll.manager';
import { BetterScrollCore } from './core';
import { ElementRef, EventEmitter, Output, Injector, Input } from '@angular/core';
import { Directive } from '@angular/core';
import { SlideOption, ScrollBarOption, PullUpOption, WheelOption, BsOption } from 'better-scroll';
import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import * as _ from 'lodash';
@Directive({
    selector: '[betterScroll]',
    exportAs: 'betterScroll'
})
export class BetterScrollDirective extends BaseWithIcss {
    @Output() betterScroll: EventEmitter<any> = new EventEmitter();
    @Input() name: string;
    @Input() options: BsOption = {
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
    } as any;

    get parent() {
        const element: HTMLElement = this.ele.nativeElement;
        return element.parentElement;
    }

    @Input() set startY(val: any) {
        this.options.startY = coerceNumberProperty(val);
    }
    @Input() set startX(val: any) {
        this.options.startX = coerceNumberProperty(val);
    }

    @Input() set scrollX(val: any) {
        this.options.scrollX = coerceBooleanProperty(val);
    }
    get scrollX() {
        return this.options.scrollX;
    }

    @Input() set scrollY(val: any) {
        this.options.scrollY = coerceBooleanProperty(val);
    }
    get scrollY() {
        return this.options.scrollY;
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

    @Input() set tap(val: any) {
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
            ...{
                selectedIndex: 0,
                rotate: 25,
                adjustTime: 400,
                wheelWrapperClass: 'wheel-scroll',
                wheelItemClass: 'wheel-item'
            },
            ...val
        };
    }

    @Input() set snap(val: SlideOption) {
        const snap = {
            ...{
                loop: true,
                threshold: 0.3,
                speed: 400
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
                this.initBetterScroll();
                if (this.scrollX) {
                    this.parent.classList.add('scroll-x');
                }
                if (this.scrollY) {
                    this.parent.classList.add('scroll-y');
                }
                this.betterScroll.emit(this);
                this.setCyc('betterScrollInited', this._scroll);
            });
        });
    }

    initBetterScroll() {
        if (this.betterManagerService.has(this.parent)) {
            setTimeout(() => {
                this._scroll.refresh();
            }, 0);
        } else {
            this.betterManagerService.createBetterScrollCore(this.parent, this.options, this.name);
        }
        this._scroll = this.betterManagerService.get(this.name || this.parent);
    }

    ngOnDestroy() {
        this.betterManagerService.deRegister(this.ele.nativeElement);
        super.ngOnDestroy();
    }

    get children() {
        const ele: HTMLElement = this.ele.nativeElement;
        return ele.children;
    }

    // 更新
    updateStyle(ele: HTMLElement) {
        if (this.options.scrollX) {
            const slideWidth = ele['clientWidth'];
            this.updateChildrenStyle(slideWidth + 'px', 'width');
            this.updateContainerStyle('clientWidth', 'width');
        } else {
            const clientHeight = ele['clientHeight'];
            this.updateChildrenStyle(clientHeight + 'px', 'height');
            this.updateContainerStyle('clientHeight', 'height');
        }
    }

    updateContainerStyle(name: string, val: string) {
        const ele = this.ele.nativeElement;
        const children = ele.children;
        let total = 0;
        for (const key in children) {
            const item: HTMLElement = children[key] as HTMLElement;
            const size = item[name];
            total += size;
        }
        _.set(this.ele.nativeElement, 'style.' + val, total + 'px');
    }

    updateChildrenStyle(width: string, val: string) {
        const ele = this.ele.nativeElement;
        const children = ele.children;
        for (const key in children) {
            const item: HTMLElement = children[key] as HTMLElement;
            if (item.classList) {
                this.render.addClass(item, 'slide-item');
            }
            _.set(item, 'style.' + val, width);
        }
    }
}

