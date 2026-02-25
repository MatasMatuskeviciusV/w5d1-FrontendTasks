import { Directive, HostBinding, HostListener, Input } from "@angular/core";

@Directive({
    selector: '[appHighlightOnHover]',
    standalone: true,
})

export class HighlightOnHover {
    @Input() appHighlightOnHover = '#fff3cd';

    @HostBinding('style.backgroundColor') bg = '';
    @HostBinding('style.cursor') cursor = 'default';

    @HostListener('mouseenter')
    onEnter(): void {
        this.bg = this.appHighlightOnHover;
        this.cursor = 'pointer';
    }

    @HostListener('mouseleave')
    onLeave(): void {
        this.bg = '';
        this.cursor = 'default';
    }
}