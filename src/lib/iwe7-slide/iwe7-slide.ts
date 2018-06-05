import {
    HostBinding, ViewChildren, ViewChild, Input,
    QueryList, AfterViewInit, ViewEncapsulation,
    Injectable, Renderer2, AfterContentInit,
    ChangeDetectionStrategy
} from '@angular/core';
import { ElementRef, Injector } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { BScroll } from '../lib';
import * as _ from 'lodash';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Iwe7CoreComponent } from 'iwe7-core';
@Component({
    selector: 'iwe7-slide',
    templateUrl: 'iwe7-slide.html',
    styleUrls: ['./iwe7-slide.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.slide]': 'true'
    },
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Iwe7SlideComponent extends Iwe7CoreComponent {
    private slide: any;
    private timer: any;
    currentPageIndex: number = 0;
    _loop: boolean = true;
    @Input()
    set loop(val: any) {
        this._loop = coerceBooleanProperty(val);
    }
    get loop() {
        return this._loop;
    }
    _click: boolean = true;
    @Input()
    set click(val: any) {
        this._click = coerceBooleanProperty(val);
    }
    get click() {
        return this._click;
    }
    _autoPlay: boolean = true;
    @Input()
    set autoPlay(val: any) {
        this._autoPlay = coerceBooleanProperty(val);
    }
    get autoPlay() {
        return this._autoPlay;
    }
    @Input() threshold: number = 0.3;
    @Input() speed: number = 400;
    @Input() interval: number = 4000;
    @Input() height: string = 'auto';
    @ViewChild('group') group: ElementRef;
    @HostBinding('class.scroll-x')
    _scrollX: boolean = true;
    @HostBinding('class.scroll-y')
    _scrollY: boolean = false;
    @Input()
    set scrollX(val: any) {
        this._scrollX = coerceBooleanProperty(val);
        this._scrollY = !this._scrollX;
    }
    @Input()
    set scrollY(val: any) {
        this._scrollY = coerceBooleanProperty(val);
        this._scrollX = !this._scrollY;
    }
    count: number = 0;
    list: any[] = [];

    get children() {
        return this.group.nativeElement.children;
    }
    constructor(
        public ele: ElementRef,
        public render: Renderer2,
        injector: Injector
    ) {
        super(injector);
        this.runOutsideAngular(() => {
            this.getCyc('ngAfterContentInit').subscribe(res => {
                this.count = this.children.length;
                const items: any[] = [];
                for (let i = 0; i < this.count; i++) {
                    items.push(i);
                }
                this.list = items;
                this.currentPageIndex = 0;
            });
            this.getCyc('ngAfterViewInit').subscribe(res => {
                const opt: any = {
                    scrollX: this._scrollX,
                    scrollY: this._scrollY,
                    momentum: false,
                    snap: {
                        loop: this._loop,
                        threshold: this.threshold,
                        speed: this.speed
                    },
                    bounce: false,
                    stopPropagation: true,
                    click: this.click
                };
                this.slide = new BScroll(this.ele.nativeElement, opt);
                this.slide.on('scrollEnd', () => {
                    this.run(() => {
                        this._onScrollEnd();
                    });
                });
                this.slide.on('touchEnd', () => {
                    if (this.autoPlay) {
                        this._play();
                    }
                });
                this.slide.on('beforeScrollStart', () => {
                    if (this.autoPlay) {
                        clearTimeout(this.timer);
                    }
                });
                if (this.autoPlay) {
                    this._play();
                }
                this.updateStyle();
            });
        });

    }

    updateStyle() {
        if (this._scrollX) {
            this.update('clientWidth', 'width');
        } else {
            this.update('clientHeight', 'height');
        }
    }

    private update(name: string, val: string) {
        const slideWidth = this.ele.nativeElement[name];
        for (const key in this.children) {
            const item = this.children[key];
            if (item.classList) {
                this.render.addClass(item, 'slide-item');
            }
            _.set(item, 'style.' + val, slideWidth + 'px');
        }
        this.render.setStyle(this.group.nativeElement, val, slideWidth * this.children.length + 'px');
        this.render.setStyle(this.group.nativeElement, 'opacity', '1');
    }

    _onScrollEnd() {
        if (this._scrollX) {
            const pageIndex = this.slide.getCurrentPage().pageX;
            this.currentPageIndex = pageIndex;
        } else {
            const pageIndex = this.slide.getCurrentPage().pageY;
            this.currentPageIndex = pageIndex;
        }
        if (this.autoPlay) {
            this._play();
        }
        this._cd.markForCheck();
    }

    refresh() {
        this.updateStyle();
        this.slide.refresh();
    }

    prev() {
        this.slide.prev();
    }

    next() {
        this.slide.next();
    }

    _play() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.slide.next();
        }, this.interval);
    }
}
