import { Observable } from 'rxjs';
import { BetterManagerService } from './better-scroll.manager';
import { BetterScrollCore } from './core';
import { ElementRef, EventEmitter, Output, Injector, Input, Optional, SkipSelf } from '@angular/core';
import { Directive } from '@angular/core';
import { Iwe7CoreComponent } from 'iwe7-core';
@Directive({
    selector: '[betterScroll]',
    exportAs: 'betterScroll',
    providers: [BetterScrollCore]
})
export class BetterScrollDirective extends Iwe7CoreComponent {
    @Output() betterScroll: EventEmitter<any> = new EventEmitter();
    @Input() options: any = {
        click: true,
        pullDownRefresh: {
            threshold: 50,
            stop: 60
        },
        pullUpLoad: {
            threshold: 50
        }
    };

    get scrollInstance(): Observable<any> {
        return this.getCyc('betterScrollInited');
    }
    constructor(
        public ele: ElementRef,
        injector: Injector,
        @Optional()
        public _scroll: BetterScrollCore,
        @SkipSelf()
        @Optional()
        public parent: BetterScrollCore,
        public betterManagerService: BetterManagerService
    ) {
        super(injector, 'better-scroll');
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
