import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WidgetComponent } from '../widget-content/widget-content.component';
import { WidgetActionComponent } from '../widget-action/widget-action.component';
import { NewsTemplateComponent } from '../widget-templates/news-template/news-template.component';
import { NewsInterceptor } from '../interceptors/news-api.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AsyncDataDirective } from '../directives/async-data.directive';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],

  declarations: [
    WidgetComponent,
    WidgetActionComponent,
    NewsTemplateComponent,
    AsyncDataDirective,
  ],
  entryComponents: [NewsTemplateComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NewsInterceptor,
      multi: true,
    },
  ],

  exports: [WidgetComponent],
})
export class WidgetModule {}
