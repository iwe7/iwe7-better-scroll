import { HostBinding, ViewChildren, ViewChild, Input, QueryList, AfterViewInit, ViewEncapsulation, Injectable, Renderer2 } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { BScroll } from '../lib';
import * as _ from 'lodash';

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

    @ViewChild('group') group: ElementRef;

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

    updateWidth() {
        const slideWidth = this.group.nativeElement.clientWidth;
        for (const key in this.children) {
            const item = this.children[key];
            if (item.classList) {
                this.render.addClass(item, 'slide-item');
            }
            _.set(item, 'style.width', slideWidth + 'px');
        }
        this.render.setStyle(this.group.nativeElement, 'width', slideWidth * this.children.length + 'px');
        this.render.setStyle(this.group.nativeElement, 'opacity', '1');
        this.updateDots();
    }

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
            scrollX: true,
            scrollY: false,
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
            this.updateWidth();
        }, 20);
    }

    _onScrollEnd() {
        const pageIndex = this.slide.getCurrentPage().pageX;
        this.currentPageIndex = pageIndex;
        if (this.autoPlay) {
            this._play();
        }
    }

    refresh() {
        this.updateWidth();
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
