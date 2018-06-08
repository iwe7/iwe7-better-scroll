import { BetterScrollCore } from './core';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BetterManagerService {
    map: Map<HTMLElement | string, BetterScrollCore> = new Map();
    constructor() { }

    register(element: HTMLElement | string, scroll: BetterScrollCore) {
        this.map.set(element, scroll);
    }

    has(element: HTMLElement | string): boolean {
        return this.map.has(element);
    }

    get(element: HTMLElement | string): BetterScrollCore {
        return this.map.get(element);
    }

    deRegister(element: HTMLElement | string) {
        this.map.delete(element);
    }

    createBetterScrollCore(element: HTMLElement, opts: any, name?: string) {
        const betterScroll = new BetterScrollCore();
        betterScroll.init(element, opts);
        if (name) {
            this.register(name, betterScroll);
        } else {
            this.register(element, betterScroll);
        }
        betterScroll.on('pullingDown', () => {
            setTimeout(() => {
                betterScroll.finishPullDown();
            }, 1000);
        });
        betterScroll.on('pullingUp', () => {
            setTimeout(() => {
                betterScroll.finishPullUp();
            }, 1000);
        });
    }
}
