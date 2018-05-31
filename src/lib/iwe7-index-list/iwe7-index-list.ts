import { BetterScrollDirective } from './../better-scroll';
import { Component, OnInit, ViewEncapsulation, ContentChildren, QueryList, AfterContentInit, ViewChild } from '@angular/core';
import { Iwe7IndexAnchorDirective } from './iwe7-index-anchor';
const TITLE_HEIGHT = 50;
import { Subject } from 'rxjs';
import { map, tap, debounceTime, throttleTime } from 'rxjs/operators';

@Component({
    selector: 'iwe7-index-list',
    templateUrl: 'iwe7-index-list.html',
    styleUrls: ['./iwe7-index-list.scss'],
    encapsulation: ViewEncapsulation.None
})

export class Iwe7IndexListComponent implements OnInit {
    @ContentChildren(Iwe7IndexAnchorDirective) _anchors: QueryList<Iwe7IndexAnchorDirective>;
    @ViewChild(BetterScrollDirective) better: BetterScrollDirective;
    activeAnchor: Iwe7IndexAnchorDirective;

    _currentIndex: number = 0;
    set currentIndex(val: number) {
        this._currentIndex = val;
        const item = this._anchors.find((item, _index) => {
            return _index === val;
        });
        this.activeAnchor = item;
    }

    get currentIndex() {
        return this._currentIndex;
    }

    scroll: any;
    heightList: any[] = [];
    diff: number;
    set scrollY(newY: number) {
        const listHeight = this._anchors;
        // 当滚动到顶部，newY>0
        if (newY > -TITLE_HEIGHT) {
            this.currentIndex = 0;
            return;
        }
        // 在中间部分滚动
        for (let i = 0; i < this._anchors.length - 1; i++) {
            const item1 = this._anchors.find((item, index) => {
                return index === i;
            });
            const item2 = this._anchors.find((item, index) => {
                return index === i + 1;
            });
            if (-newY >= item1.top && -newY < item2.top) {
                this.currentIndex = i;
                this.diff = item1.top + newY;
                return;
            }
        }
        // 当滚动到底部，且-newY大于最后一个元素的上限
        this.currentIndex = listHeight.length - 2;
    }
    constructor(
    ) { }

    ngOnInit() {

    }

    ngAfterContentInit() { }

    onAnchor(item: Iwe7IndexAnchorDirective, index: number) {
        this.activeAnchor = item;
        this._currentIndex = index;
        this.scroll.scrollToElement(item.ele.nativeElement, 300);
    }

    _scrollTo(index) {
        if (!index && index !== 0) {
            return;
        }
        if (index < 0) {
            index = 0;
        } else if (index > this._anchors.length - 2) {
            index = this._anchors.length - 2;
        }
        const item = this._anchors.find((item, _index) => {
            return _index === index;
        });
        this.scroll.scrollToElement(item.ele.nativeElement, 300);
    }

    scrollY$: Subject<number> = new Subject();
    createBetterScroll(e: any) {
        if (e) {
            this.scroll = e;
            this.scroll.on('scroll', () => {
                this.scrollY = this.scroll.y;
            });
            this.scroll.on('scrollEnd', () => {
                this.scrollY = this.scroll.y;
            });
        }
    }
}
