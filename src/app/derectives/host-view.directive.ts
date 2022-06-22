import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[hostRef]',
})
export class HostViewDirective {
  constructor(public viewRef: ViewContainerRef) {}
}
