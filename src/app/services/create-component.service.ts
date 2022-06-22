import {
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
} from '@angular/core';
import { HostViewDirective } from '../derectives/host-view.directive';

@Injectable({
  providedIn: 'root',
})
export class CreateComponentService {
  constructor(private readonly resolver: ComponentFactoryResolver) {}

  createComponent(
    viewHost: HostViewDirective,
    dynamicComponent: any
  ): ComponentRef<any> {
    const componentFactory =
      this.resolver.resolveComponentFactory(dynamicComponent);
    const componentInstance =
      viewHost.viewRef.createComponent(componentFactory);
    return componentInstance;
  }
}
