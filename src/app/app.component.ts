import {
  Component,
  ComponentRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';

import { HostViewDirective } from './derectives/host-view.directive';
import { CreateComponentService } from './services/create-component.service';
import { LocalStorageService } from './services/local-storage.service';
import { MuuriGridService } from './services/muuri-grid.service';
import { CurrentUserService } from './spa-components/users-manager/current-user.service';
import {
  CURRENT_USER_DASHBOARD_STATE,
  USER_PROVIDERS,
} from './spa-components/users-manager/users.providers';
import { WidgetComponent } from './spa-components/widget/widget-content/widget-content.component';
import { DYNAMIC_COMPONENT } from './tokens/dynamic-component.token';

export type myTemplateDynamicComponent<T, Keys extends keyof T> = {
  [Key in Keys]: T[Key];
};

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    USER_PROVIDERS,
    {
      provide: DYNAMIC_COMPONENT,
      useValue: WidgetComponent || null,
    },
  ],
})
export class AppComponent implements OnInit {
  @ViewChild(HostViewDirective)
  readonly viewHost: HostViewDirective | undefined;

  constructor(
    @Inject(CURRENT_USER_DASHBOARD_STATE) readonly currentUser: Observable<any>,
    private userState: LocalStorageService,
    private currentUsers: CurrentUserService,
    @Inject(DYNAMIC_COMPONENT) readonly dynamicComponent: ComponentRef<any>,
    @Inject(CreateComponentService)
    readonly componentFactory: CreateComponentService,
    @Inject(MuuriGridService) readonly gridService: MuuriGridService
  ) {}

  ngOnInit() {
    this.gridService.initMuuriGrid('.grid', { dragEnabled: true });
    this.viewCurrentUser();
  }

  saveToStorage() {
    this.userState.setItem(
      'user5',
      JSON.stringify({
        widgetList: [{ widget: 'cz', setting: { cuntry: 'cz' } }],
      })
    );
  }

  setUser(user: string) {
    this.currentUsers.setCurrentUser(user);
  }

  getFromStorage() {
    console.log(this.userState.getItem('user5'));
  }

  viewCurrentUser() {
    // console.log(this.currentUser)
    setTimeout(
      () => this.currentUser.subscribe((val) => console.log(val)),
      3000
    );
  }
  // сделать createWidget сервисом
  public createWidget(context: string, queryData?: {} ): void {
    if (this.viewHost) {
      const componentInstance = this.componentFactory.createComponent(
        this.viewHost,
        this.dynamicComponent
      );
      
      if (queryData ) {
        //то записать в local user state
        componentInstance.instance.cashedQueryData = queryData;
       
      }
      
      componentInstance.instance.widgetContext = context;

      this.gridService.addItemToGrid(
        componentInstance.instance.hostRef.nativeElement
      );

      
    }
  }
}
