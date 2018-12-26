import {Directive, ElementRef, Input, OnChanges} from '@angular/core';

@Directive({
    selector: '[focusOnMe]',
})
export class FocusDirective implements OnChanges {
    @Input() focusOnMe: boolean = false;
    @Input() focusDelay: number = 0;
    
    constructor(private elementRef: ElementRef) {}
    
    ngOnChanges() {
        this.checkFocus();
    }
    
    private checkFocus() {
        if (this.focusOnMe && document.activeElement !== this.elementRef.nativeElement) {
            let checkFocusTimeoutHandle: number;
            const focus = () => {
                this.elementRef.nativeElement.focus();
            };
            // Even without a delay, we wait for the next JavaScript tick
            // to avoid causing changes on parent components (e.g., the
            // TextInput component) that have already been checked on this
            // change detection cycle.
            checkFocusTimeoutHandle = setTimeout(focus, this.focusDelay) as any;
        }
    }
}
