import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { WidgetModule } from './spa-components/widget/modules/widget.module';
import { WidgetsDashboardComponent } from './spa-components/widgets-dashboard/widgets-dashboard.component';
import { HostViewDirective } from './derectives/host-view.directive';
import { WidgetComponent } from './spa-components/widget/widget-content/widget-content.component';

@NgModule({
  imports: [BrowserModule, HttpClientModule, WidgetModule, CommonModule],

  declarations: [AppComponent, WidgetsDashboardComponent, HostViewDirective],

  bootstrap: [AppComponent],

  entryComponents: [WidgetComponent, WidgetsDashboardComponent],

  providers: [],
})
export class AppModule {}
