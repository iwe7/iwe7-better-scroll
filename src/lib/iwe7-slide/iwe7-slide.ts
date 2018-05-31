import { HostBinding, ViewChildren, ViewChild, Input, QueryList, AfterViewInit, ViewEncapsulation, Injectable, Renderer2 } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { BScroll } from '../lib';
import * as _ from 'lodash';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
@Component({
    selector: 'iwe7-slide',
    templateUrl: 'iwe7-slide.html',
    styleUrls: ['./iwe7-slide.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.slide]': 'true'
    }
})
export class Iwe7SlideComponent implements OnInit, AfterViewInit {
    private slide: any;
    private timer: any;
    currentPageIndex: number;

    @Input() loop: boolean = true;
    @Input() threshold: number = 0.3;
    @Input() speed: number = 400;
    @Input() click: boolean = true;
    @Input() autoPlay: boolean = true;
    @Input() interval: number = 4000;

    @HostBinding('style.height')
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

    get list() {
        const items: any[] = [];
        for (let i = 0; i < this.count; i++) {
            items.push(i);
        }
        return items;
    }
    constructor(
        public ele: ElementRef,
        public render: Renderer2
    ) { }

    get children() {
        return this.group.nativeElement.children;
    }

    ngOnInit() {
        this.count = this.children.length;
        clearTimeout(this.timer);
        this.currentPageIndex = 0;
    }

    ngAfterViewInit() {
        const opt: any = {
            scrollX: this._scrollX,
            scrollY: this._scrollY,
            momentum: false,
            snap: {
                loop: this.loop,
                threshold: this.threshold,
                speed: this.speed
            },
            bounce: false,
            stopPropagation: true,
            click: this.click
        };
        this.slide = new BScroll(this.ele.nativeElement, opt);
        this.slide.on('scrollEnd', () => {
            this._onScrollEnd();
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
        setTimeout(() => {
            this.updateStyle();
        }, 20);
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
        this.updateDots();
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

    updateDots() { }
}
