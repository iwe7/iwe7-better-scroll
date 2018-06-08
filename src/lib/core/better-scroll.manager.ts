import { BetterScrollCore } from './core';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class BetterManagerService {
    map: Map<HTMLElement, BetterScrollCore> = new Map();
    constructor() { }

    register(element: HTMLElement, scroll: BetterScrollCore) {
        this.map.set(element, scroll);
    }

    has(element: HTMLElement): boolean {
        return this.map.has(element);
    }

    get(element: HTMLElement): BetterScrollCore {
        return this.map.get(element);
    }

    deRegister(element: HTMLElement) {
        this.map.delete(element);
    }

    createBetterScrollCore(element: HTMLElement, opts: any) {
        const betterScroll = new BetterScrollCore();
        betterScroll.init(element, opts);
        this.register(element, betterScroll);
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
