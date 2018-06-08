import { BetterScrollCore } from './core';
import { BetterManagerService } from './better-scroll.manager';
import { Provider, Inject, NgZone } from '@angular/core';
import { EVENT_MANAGER_PLUGINS, ɵDomEventsPlugin as DomEventsPlugin } from "@angular/platform-browser";
import { DOCUMENT } from '@angular/common';
export const BetterScrollEvents = [
    'beforeScrollStart',
    'scrollStart',
    'scroll',
    'scrollX',
    'scrollY',
    'scrollCancel',
    'beforeScrollStart',
    'scrollEnd',
    'touchEnd',
    'flick',
    'refresh',
    'destroy',
    'pullingDown',
    'pullingUp',
];
export class BetterScrollEventManager extends DomEventsPlugin {
    opts: any = {
        click: true,
        scrollY: true,
        scrollX: false,
        pullDownRefresh: {
            threshold: 50,
            stop: 50
        },
        pullUpLoad: {
            threshold: 50
        },
        probeType: 2,
        preventDefaultException: {
            tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/,
            className: /(^|\s)better-scroll-container(\s|$)/
        }
    };
    constructor(
        @Inject(DOCUMENT) public doc: Document,
        public _ngZone: NgZone,
        public betterScrollManager: BetterManagerService,
    ) {
        super(doc, _ngZone);
    }
    supports(eventName: string): boolean {
        return BetterScrollEvents.indexOf(eventName) > -1;
    }
    addEventListener(element: HTMLElement, eventName: string, handler: Function): Function {
        try {
            let scroll: BetterScrollCore;
            const newElement = element.parentElement;
            if (this.betterScrollManager.has(newElement)) {
                scroll = this.betterScrollManager.get(newElement);
            } else {
                newElement.classList.add('better-scroll-container');
                if (eventName === 'scrollX') {
                    // 简单的scrollX
                    setTimeout(() => {
                        let width = 0;
                        for (let i = 0; i < element.childNodes.length; i++) {
                            width += element.childNodes[i]['clientWidth'];
                        }
                        element.style.width = width + 'px';
                        scroll.refresh();
                    }, 0);
                    this.opts.scrollX = true;
                    this.opts.scrollY = false;
                    element.classList.add('scrollX');
                }
                if (eventName === 'scrollY') {
                    this.opts.scrollX = false;
                    this.opts.scrollY = true;
                    element.classList.add('scrollY');
                }
                eventName = 'scroll';
                this.betterScrollManager.createBetterScrollCore(newElement, this.opts);
                scroll = this.betterScrollManager.get(newElement);
            }
            const scrollFn = (res: any) => {
                handler({ data: res, scroll: scroll });
            };
            scroll.on(eventName, scrollFn);
            return () => {
                scroll.off(eventName, scrollFn);
            };
        } catch (err) { }
    }
}

export const BetterScrollEventManagerPluginProvider: Provider = {
    provide: EVENT_MANAGER_PLUGINS,
    useClass: BetterScrollEventManager,
    multi: true
};
