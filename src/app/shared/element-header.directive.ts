import { Directive, ElementRef, Input, Renderer2, OnChanges } from '@angular/core';

@Directive({
  selector: '[appElementHeader]',
  standalone: true,
})
export class ElementHeaderDirective implements OnChanges {
  @Input('appElementHeader') isActive = false;

  constructor(private element: ElementRef, private renderer: Renderer2) {}

  ngOnChanges() {
    if (this.isActive) {
      this.renderer.addClass(this.element.nativeElement, 'element-header');
      this.renderer.removeClass(this.element.nativeElement, 'question-header');
    } else {
      this.renderer.addClass(this.element.nativeElement, 'question-header');
      this.renderer.removeClass(this.element.nativeElement, 'element-header');
    }
  }
}
