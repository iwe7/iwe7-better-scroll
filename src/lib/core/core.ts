import { OnDestroy, Injectable } from "@angular/core";
import { BScroll, BsOption } from './lib';
@Injectable()
export class BetterScrollCore implements OnDestroy {
    scroll: BScroll;
    timer: any;
    options: any = {
        interval: 4000,
        autoPlay: false
    };
    init(ele: HTMLElement, options: BsOption) {
        this.scroll = new BScroll(ele, options);
    }
    // 强制刷新
    refresh(): void {
        this.scroll.refresh();
    }
    enable(): void {
        this.scroll.enable();
    }
    disable(): void {
        this.scroll.disable();
    }
    scrollBy(x: number, y: number, time?: number, easing?: object): void {
        this.scroll.scrollBy(x, y, time, easing);
    }
    scrollTo(x: number, y: number, time?: number, easing?: object): void {
        this.scroll.scrollTo(x, y, time, easing);
    }
    scrollToElement(el: HTMLElement | string, time?: number, offsetX?: number | boolean, offsetY?: number | boolean, easing?: object): void {
        this.scroll.scrollToElement(el, time, offsetX, offsetY, easing);
    }
    stop(): void {
        this.scroll.stop();
    }
    destroy(): void {
        this.scroll.destroy();
    }
    goToPage(x: number, y: number, time?: number, easing?: object): void {
        this.scroll.goToPage(x, y, time, easing);
    }
    next(time?: number, easing?: object): void {
        this.scroll.next(time, easing);
    }
    prev(time?: number, easing?: object): void {
        this.scroll.prev(time, easing);
    }
    getCurrentPage(): {
        x: number;
        y: number;
        pageX: number;
        pageY: number;
    } {
        return this.scroll.getCurrentPage();
    }
    wheelTo(index: number): void {
        this.scroll.wheelTo(index);
    }
    getSelectedIndex(): number {
        return this.scroll.getSelectedIndex();
    }
    finishPullDown(): void {
        return this.scroll.finishPullDown();
    }
    finishPullUp(): void {
        return this.scroll.finishPullUp();
    }
    on(type: any, fn: any) {
        this.scroll.on(type, fn);
    }
    off(type: any, fn: any) {
        this.scroll.off(type, fn);
    }
    trigger(type: string) {
        this.scroll.trigger(type);
    }
    ngOnDestroy() {
        this.destroy();
        this.scroll = null;
    }

    autoPlay(options: any) {
        this.options = {
            ...this.options,
            ...options
        };
        if (this.options.autoPlay) { }

        this.on('scrollEnd', () => {
            this.onScrollEnd();
        });
        this.on('touchEnd', () => {
            if (this.options.autoPlay) {
                this.play();
            }
        });
        this.on('beforeScrollStart', () => {
            if (this.options.autoPlay) {
                clearTimeout(this.timer);
            }
        });
    }

    play() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
            this.scroll.next();
        }, this.options.interval || 4000);
    }

    currentPageIndex: number = 0;

    onScrollEnd() {
        if (this.options.scrollX) {
            const pageIndex = this.getCurrentPage().pageX;
            this.currentPageIndex = pageIndex;
        } else {
            const pageIndex = this.getCurrentPage().pageY;
            this.currentPageIndex = pageIndex;
        }
        if (this.options.autoPlay) {
            this.play();
        }
    }

    updateStyle(ele: HTMLElement) {
        if (this.options.scrollX) {
            this.update(ele, 'clientWidth', 'width');
        } else {
            this.update(ele, 'clientHeight', 'height');
        }
        if (this.options.autoPlay) {
            this.play();
        }
    }

    update(ele: HTMLElement, name: string, val: string) {
        const children = ele.children;
        const slideWidth = ele[name];
        for (const key in children) {
            const item: HTMLElement = children[key] as HTMLElement;
            if (item.classList) {
                item.classList.add('slide-item');
            }
            item.style[val] = slideWidth + 'px';
        }
    }

    getChildren(ele: HTMLElement) {
        return ele.children;
    }
}

