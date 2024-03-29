import { Component } from '@angular/core';

import { WidgetComponent } from '../../widget-content/widget-content.component';

@Component({
  selector: 'app-news-template',
  templateUrl: './news-template.component.html',
  styleUrls: ['./news-template.component.scss'],
})
export class NewsTemplateComponent {
  constructor(public widget: WidgetComponent) {}
}
